import { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Grid,
  Container,
  Typography,
  Snackbar,
  CircularProgress,
} from "@mui/material";
import AdminLayout from "../../src/components/layout/AdminLayout";
import AuthGuard from "../../src/components/auth/AuthGuard";
import axiosInstance from "../../src/utils/axios";
import { useDispatch, useSelector } from "react-redux";
import {
  selectOwnerData,
  fetchPortfolioData,
} from "../../src/redux/reducers/portfolioSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const ownerData = useSelector(selectOwnerData);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    footerDescription: "",
    title: "",
    location: "",
    locationLink: "",
    instagram: "",
    linkedin: "",
    github: "",
    about: "",
  });

  useEffect(() => {
    if (!ownerData) {
      dispatch(fetchPortfolioData());
    } else {
      setFormData({
        name: ownerData.name || "",
        description: ownerData.description || "",
        footerDescription: ownerData.footerDescription || "",
        title: ownerData.title || "",
        location: ownerData.location || "",
        locationLink: ownerData.locationLink || "",
        instagram: ownerData.instagram || "",
        linkedin: ownerData.linkedin || "",
        github: ownerData.github || "",
        about: ownerData.about || "",
      });
      setLoading(false);
    }
  }, [dispatch, ownerData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await axiosInstance.put("/portfolio/owner/update", formData);
      dispatch(fetchPortfolioData()); // Refresh Redux store
      setMessage("Profile updated successfully");
    } catch (error) {
      setMessage(error.response?.data?.message || "Error updating profile");
    }
    setSaving(false);
  };

  return (
    <AuthGuard>
      <AdminLayout>
        <Box>
          <Typography variant="h4" gutterBottom>
            Edit Profile
          </Typography>
          {loading ? (
            <Box display="flex" justifyContent="center" my={4}>
              <CircularProgress />
            </Box>
          ) : (
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                  <TextField
                    fullWidth
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                  <TextField
                    fullWidth
                    label="Title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                  <TextField
                    fullWidth
                    label="Location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                  <TextField
                    fullWidth
                    label="Location Link"
                    name="locationLink"
                    value={formData.locationLink}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                  <TextField
                    fullWidth
                    label="LinkedIn"
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                  <TextField
                    fullWidth
                    label="Instagram"
                    name="instagram"
                    value={formData.instagram}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                  <TextField
                    fullWidth
                    label="GitHub"
                    name="github"
                    value={formData.github}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="Short Description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    multiline
                    rows={2}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="Footer Description"
                    name="footerDescription"
                    value={formData.footerDescription}
                    onChange={handleChange}
                    multiline
                    rows={2}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    label="About"
                    name="about"
                    value={formData.about}
                    onChange={handleChange}
                    multiline
                    rows={6}
                    required
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={saving}
                    sx={{ mr: 2 }}
                  >
                    {saving ? (
                      <>
                        <CircularProgress size={20} sx={{ mr: 1 }} />
                        Saving...
                      </>
                    ) : (
                      "Save Changes"
                    )}
                  </Button>
                </Grid>
              </Grid>
            </Box>
          )}
          <Snackbar
            open={!!message}
            autoHideDuration={6000}
            onClose={() => setMessage("")}
            message={message}
          />
        </Box>
      </AdminLayout>
    </AuthGuard>
  );
};

export default Profile;
