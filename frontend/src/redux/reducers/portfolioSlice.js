// Update in portfolioSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import dotenv from "dotenv";
import axiosInstance from "../../utils/axios";
dotenv.config();

// API base URL from environment variables
const API_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api/v1";

// Async thunk for fetching all projects
export const fetchProjects = createAsyncThunk(
  "portfolio/fetchProjects",
  async (category = "all", { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/project/getall?category=${category}`
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for fetching project categories
export const fetchCategories = createAsyncThunk(
  "portfolio/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/project/categories/getall`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for fetching portfolio data (skills, social links, etc.)
export const fetchPortfolioData = createAsyncThunk(
  "portfolio/fetchPortfolioData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/portfolio/getdata`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for submitting contact form
export const submitContactForm = createAsyncThunk(
  "portfolio/submitContact",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/contact/submit`, formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for fetching timeline events
export const fetchTimelineEvents = createAsyncThunk(
  "portfolio/fetchTimelineEvents",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/portfolio/timeline`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for fetching messages
export const fetchMessages = createAsyncThunk(
  "portfolio/fetchMessages",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };

      // Get all messages for total count
      const allResponse = await axiosInstance.get("/contact/getall", config);
      // Get unread messages count
      const unreadResponse = await axiosInstance.get(
        "/contact/getall?read=false",
        config
      );

      return {
        messages: allResponse.data.data || [],
        total: allResponse.data.data?.length || 0,
        unread: unreadResponse.data.data?.length || 0,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

// Default social links as fallback
const defaultSocialLinks = [
  {
    icon: "Github",
    href: "https://github.com/Debojit-mitra",
    label: "GitHub",
    target: "_blank",
    rel: "noopener noreferrer",
  },
  {
    icon: "Linkedin",
    href: "https://www.linkedin.com/in/debojitmitra-one6",
    label: "LinkedIn",
    target: "_blank",
    rel: "noopener noreferrer",
  },
  {
    icon: "Instagram",
    href: "https://www.instagram.com/its_me_debojit",
    label: "Instagram",
    target: "_blank",
    rel: "noopener noreferrer",
  },
  { icon: "Mail", href: "mailto:debojit16mitra@gmail.com", label: "Email" },
];

export const portfolioSlice = createSlice({
  name: "portfolio",
  initialState: {
    projects: [],
    filteredProjects: [],
    categories: ["all"],
    selectedCategory: "all",
    skills: [],
    timelineEvents: [],
    socialLinks: defaultSocialLinks,
    ownerData: null,
    contactFormStatus: "idle",
    contactFormError: null,
    loading: false,
    error: null,
    messages: {
      messages: null,
      total: 0,
      unread: 0,
      loading: false,
      error: null,
    },
  },
  reducers: {
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
      if (action.payload === "all") {
        state.filteredProjects = state.projects;
      } else {
        state.filteredProjects = state.projects.filter((project) =>
          project.categories.includes(action.payload)
        );
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchProjects
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload;
        if (state.selectedCategory === "all") {
          state.filteredProjects = action.payload;
        } else {
          state.filteredProjects = action.payload.filter((project) =>
            project.categories.includes(state.selectedCategory)
          );
        }
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch projects";
      })

      // Handle fetchCategories
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch categories";
      })

      // Handle fetchPortfolioData
      .addCase(fetchPortfolioData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPortfolioData.fulfilled, (state, action) => {
        state.loading = false;
        state.skills = action.payload.skills || [];
        state.ownerData = action.payload.ownerData || null;
        state.timelineEvents = action.payload.timelineEvents || [];
        state.projects = action.payload.projects || [];

        // Set filtered projects based on selected category
        if (state.selectedCategory === "all") {
          state.filteredProjects = state.projects;
        } else {
          state.filteredProjects = state.projects.filter((project) =>
            project.categories.includes(state.selectedCategory)
          );
        }

        // Extract unique categories from projects
        const categories = new Set(["all"]);
        state.projects.forEach((project) => {
          project.categories.forEach((category) => categories.add(category));
        });
        state.categories = Array.from(categories);

        // Create social links from ownerData
        if (state.ownerData) {
          const socialLinks = [];

          if (state.ownerData.linkedin) {
            socialLinks.push({
              icon: "Linkedin",
              href: state.ownerData.linkedin,
              label: "LinkedIn",
              target: "_blank",
              rel: "noopener noreferrer",
            });
          }

          if (state.ownerData.instagram) {
            socialLinks.push({
              icon: "Instagram",
              href: state.ownerData.instagram,
              label: "Instagram",
              target: "_blank",
              rel: "noopener noreferrer",
            });
          }

          if (state.ownerData.email) {
            socialLinks.push({
              icon: "Mail",
              href: `mailto:${state.ownerData.email}`,
              label: "Email",
            });
          }

          if (state.ownerData.github) {
            socialLinks.push({
              icon: "Github",
              href: state.ownerData.github,
              label: "GitHub",
              target: "_blank",
              rel: "noopener noreferrer",
            });
          }

          if (socialLinks.length > 0) {
            state.socialLinks = socialLinks;
          }
        }
      })
      .addCase(fetchPortfolioData.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || "Failed to fetch portfolio data";
      })

      // Handle fetchTimelineEvents
      .addCase(fetchTimelineEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTimelineEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.timelineEvents = action.payload;
      })
      .addCase(fetchTimelineEvents.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || "Failed to fetch timeline events";
      })

      // Handle submitContactForm
      .addCase(submitContactForm.pending, (state) => {
        state.contactFormStatus = "loading";
        state.contactFormError = null;
      })
      .addCase(submitContactForm.fulfilled, (state) => {
        state.contactFormStatus = "succeeded";
      })
      .addCase(submitContactForm.rejected, (state, action) => {
        state.contactFormStatus = "failed";
        state.contactFormError =
          action.payload?.message || "Failed to submit form";
      })

      // Handle fetchMessages
      .addCase(fetchMessages.pending, (state) => {
        state.messages.loading = true;
        state.messages.error = null;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.messages.loading = false;
        state.messages.messages = action.payload.messages;
        state.messages.total = action.payload.total;
        state.messages.unread = action.payload.unread;
        state.messages.error = null;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.messages.loading = false;
        state.messages.error =
          action.payload?.message || "Failed to fetch messages";
      });
  },
});

export const { setSelectedCategory } = portfolioSlice.actions;
export const selectProjects = (state) => state.portfolio.filteredProjects;
export const selectCategories = (state) => state.portfolio.categories;
export const selectSelectedCategory = (state) =>
  state.portfolio.selectedCategory;
export const selectSkills = (state) => state.portfolio.skills;
export const selectTimelineEvents = (state) => state.portfolio.timelineEvents;
export const selectSocialLinks = (state) => state.portfolio.socialLinks;
export const selectOwnerData = (state) => state.portfolio.ownerData;
export const selectContactFormStatus = (state) =>
  state.portfolio.contactFormStatus;
export const selectLoading = (state) => state.portfolio.loading;
export const selectError = (state) => state.portfolio.error;
export const selectMessages = (state) => state.portfolio.messages;

export default portfolioSlice.reducer;
