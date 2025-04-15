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
  CircularProgress,
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
  selectTimelineEvents,
  fetchPortfolioData,
} from "../../src/redux/reducers/portfolioSlice";

export default function Timeline() {
  const dispatch = useDispatch();
  const events = useSelector(selectTimelineEvents);
  const [open, setOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    year: "",
  });

  useEffect(() => {
    if (!events.length) {
      dispatch(fetchPortfolioData());
    }
  }, [dispatch, events.length]);

  const handleOpen = (event = null) => {
    if (event) {
      setEditingEvent(event);
      setFormData({
        title: event.title,
        description: event.description,
        year: event.year,
      });
    } else {
      setEditingEvent(null);
      setFormData({
        title: "",
        description: "",
        year: "",
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingEvent(null);
  };

  // Helper function to sort by year
  const getYearFromString = (yearStr) => {
    if (!yearStr) return 0;
    try {
      const year = yearStr.split("-")[0].trim();
      const parsed = parseInt(year, 10);
      return isNaN(parsed) ? 0 : parsed;
    } catch (err) {
      console.error("Error parsing year:", err);
      return 0;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (editingEvent) {
        await axiosInstance.put(
          `/portfolio/timeline/${editingEvent._id}/update`,
          formData
        );
      } else {
        await axiosInstance.post("/portfolio/timeline/create", formData);
      }
      dispatch(fetchPortfolioData()); // Refresh Redux store
      handleClose();
    } catch (error) {
      console.error("Error saving timeline event:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (
      window.confirm("Are you sure you want to delete this timeline event?")
    ) {
      setLoading(true);
      try {
        await axiosInstance.delete(`/portfolio/timeline/${id}/delete`);
        dispatch(fetchPortfolioData()); // Refresh Redux store
      } catch (error) {
        console.error("Error deleting timeline event:", error);
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
          <Typography variant="h4">Timeline</Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpen()}
          >
            Add Event
          </Button>
        </Box>

        {loading ? (
          <Box display="flex" justifyContent="center" my={4}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={3}>
            {[...events]
              .sort(
                (a, b) => getYearFromString(b.year) - getYearFromString(a.year)
              )
              .map((event) => (
                <Grid size={{ xs: 12, md: 6, lg: 4 }} key={event._id}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <CardContent sx={{ flex: 1 }}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          height: "100%",
                        }}
                      >
                        <Box sx={{ flex: 1, pr: 2 }}>
                          <Typography variant="h6" gutterBottom>
                            {event.title}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            paragraph
                          >
                            {event.description}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {event.year}
                          </Typography>
                        </Box>
                        <Box>
                          <IconButton
                            onClick={() => handleOpen(event)}
                            size="small"
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            onClick={() => handleDelete(event._id)}
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
            {editingEvent ? "Edit Event" : "Add New Event"}
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
                label="Year"
                margin="normal"
                value={formData.year}
                onChange={(e) =>
                  setFormData({ ...formData, year: e.target.value })
                }
                required
                helperText="Enter year (e.g., '2023') or year range (e.g., '2019 - 2020')"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit" variant="contained" disabled={submitting}>
                {submitting ? (
                  <>
                    <CircularProgress size={20} sx={{ mr: 1 }} />
                    {editingEvent ? "Updating..." : "Creating..."}
                  </>
                ) : editingEvent ? (
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
