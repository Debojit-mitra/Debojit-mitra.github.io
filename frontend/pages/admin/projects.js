import { useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  MenuItem,
  CircularProgress,
  Chip,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import AdminLayout from "../../src/components/layout/AdminLayout";
import AuthGuard from "../../src/components/auth/AuthGuard";
import axiosInstance from "../../src/utils/axios";
import { useDispatch, useSelector } from "react-redux";
import {
  selectProjects,
  fetchPortfolioData,
} from "../../src/redux/reducers/portfolioSlice";

export default function Projects() {
  const dispatch = useDispatch();
  const projects = useSelector(selectProjects);
  const [open, setOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageUrl: "",
    liveUrl: "",
    githubUrl: "",
    tags: "",
    categories: ["all"],
  });

  useEffect(() => {
    if (!projects.length) {
      dispatch(fetchPortfolioData());
    }
  }, [dispatch, projects.length]);

  const handleOpen = (project = null) => {
    if (project) {
      setEditingProject(project);
      setFormData({
        title: project.title,
        description: project.description,
        imageUrl: project.image || "",
        liveUrl: project.demo || "",
        githubUrl: project.github || "",
        tags: project.tags ? project.tags.join(", ") : "",
        categories: project.categories || ["all"],
      });
    } else {
      setEditingProject(null);
      setFormData({
        title: "",
        description: "",
        imageUrl: "",
        liveUrl: "",
        githubUrl: "",
        tags: "",
        categories: ["all"],
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingProject(null);
  };

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const data = {
        title: formData.title,
        description: formData.description,
        image: formData.imageUrl,
        demo: formData.liveUrl || undefined,
        github: formData.githubUrl || undefined,
        tags: formData.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
        categories: formData.categories,
      };

      if (!data.title || data.title.length < 3 || data.title.length > 100) {
        alert("Title must be between 3 and 100 characters");
        return;
      }
      if (
        !data.description ||
        data.description.length < 10 ||
        data.description.length > 500
      ) {
        alert("Description must be between 10 and 500 characters");
        return;
      }
      if (data.image && !isValidUrl(data.image)) {
        alert("Image URL must be a valid URL");
        return;
      }
      if (data.demo && !isValidUrl(data.demo)) {
        alert("Live URL must be a valid URL");
        return;
      }
      if (data.github && !isValidUrl(data.github)) {
        alert("GitHub URL must be a valid URL");
        return;
      }
      if (!data.tags.length) {
        alert("At least one tag is required");
        return;
      }
      if (!data.categories.length) {
        alert("At least one category is required");
        return;
      }

      if (editingProject) {
        await axiosInstance.put(`/project/${editingProject._id}/update`, data);
      } else {
        await axiosInstance.post("/project/create", data);
      }

      // Refresh data in Redux store
      dispatch(fetchPortfolioData());
      handleClose();
    } catch (error) {
      console.error("Error saving project:", error);
      if (error.response?.data?.errors) {
        const errorMessages = Object.values(error.response.data.errors).join(
          "\n"
        );
        alert(`Validation failed:\n${errorMessages}`);
      } else {
        alert("Error saving project. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      setLoading(true);
      try {
        await axiosInstance.delete(`/project/${id}/delete`);
        dispatch(fetchPortfolioData()); // Refresh Redux store
      } catch (error) {
        console.error("Error deleting project:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <AuthGuard>
      <AdminLayout>
        <Box
          sx={{
            mb: 4,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h4">Projects</Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpen()}
          >
            Add Project
          </Button>
        </Box>

        {loading ? (
          <Box display="flex" justifyContent="center" my={4}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={3}>
            {projects.map((project) => (
              <Grid size={{ xs: 12, md: 6, lg: 4 }} key={project._id}>
                <Card>
                  {project.image && (
                    <Box
                      sx={{
                        width: "100%",
                        height: 200,
                        position: "relative",
                        overflow: "hidden",
                      }}
                    >
                      <img
                        src={project.image}
                        alt={project.title}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                        onError={(e) => {
                          e.target.src =
                            "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png";
                          e.target.onerror = null;
                        }}
                      />
                    </Box>
                  )}
                  <CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                      }}
                    >
                      <Box>
                        <Typography variant="h6" gutterBottom>
                          {project.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          paragraph
                        >
                          {project.description}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Tags: {project.tags.join(", ")}
                        </Typography>
                        <Box sx={{ mt: 1 }}>
                          {project.categories.map((category) => (
                            <Chip
                              key={category}
                              label={category}
                              size="small"
                              sx={{ mr: 0.5, mb: 0.5 }}
                            />
                          ))}
                        </Box>
                      </Box>
                      <Box>
                        <IconButton
                          onClick={() => handleOpen(project)}
                          size="small"
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => handleDelete(project._id)}
                          size="small"
                          color="error"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
          <DialogTitle>
            {editingProject ? "Edit Project" : "Add New Project"}
          </DialogTitle>
          <form onSubmit={handleSubmit}>
            <DialogContent>
              <TextField
                fullWidth
                label="Title"
                margin="normal"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
              />
              <TextField
                fullWidth
                label="Description"
                margin="normal"
                multiline
                rows={4}
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                required
              />
              <TextField
                fullWidth
                label="Image URL"
                margin="normal"
                value={formData.imageUrl}
                onChange={(e) =>
                  setFormData({ ...formData, imageUrl: e.target.value })
                }
                required
              />
              {formData.imageUrl && (
                <Box
                  sx={{
                    width: "100%",
                    height: 200,
                    position: "relative",
                    overflow: "hidden",
                    marginBottom: 2,
                  }}
                >
                  <img
                    src={formData.imageUrl}
                    alt="Preview"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    onError={(e) => {
                      e.target.src =
                        "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png";
                      e.target.onerror = null;
                    }}
                  />
                </Box>
              )}
              <TextField
                fullWidth
                label="Live URL"
                margin="normal"
                value={formData.liveUrl}
                onChange={(e) =>
                  setFormData({ ...formData, liveUrl: e.target.value })
                }
                helperText="Optional: URL where the project is deployed"
              />
              <TextField
                fullWidth
                label="GitHub URL"
                margin="normal"
                value={formData.githubUrl}
                onChange={(e) =>
                  setFormData({ ...formData, githubUrl: e.target.value })
                }
                helperText="Optional: URL to the GitHub repository"
              />
              <TextField
                fullWidth
                label="Tags (comma-separated)"
                margin="normal"
                value={formData.tags}
                onChange={(e) =>
                  setFormData({ ...formData, tags: e.target.value })
                }
                required
                helperText="Enter tags separated by commas (e.g., React, Node.js, MongoDB)"
              />
              <TextField
                select
                fullWidth
                label="Categories"
                margin="normal"
                value={formData.categories}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    categories:
                      typeof e.target.value === "string"
                        ? e.target.value.split(",")
                        : e.target.value,
                  })
                }
                required
                SelectProps={{
                  multiple: true,
                }}
                helperText="Select one or more categories"
              >
                <MenuItem value="mobile">Mobile</MenuItem>
                <MenuItem value="web">Web</MenuItem>
                <MenuItem value="ai_ml">AI/ML</MenuItem>
                <MenuItem value="cli">CLI</MenuItem>
                <MenuItem value="all">All</MenuItem>
              </TextField>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit" variant="contained" disabled={submitting}>
                {submitting ? (
                  <>
                    <CircularProgress size={20} sx={{ mr: 1 }} />
                    {editingProject ? "Updating..." : "Creating..."}
                  </>
                ) : editingProject ? (
                  "Update"
                ) : (
                  "Create"
                )}
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </AdminLayout>
    </AuthGuard>
  );
}
