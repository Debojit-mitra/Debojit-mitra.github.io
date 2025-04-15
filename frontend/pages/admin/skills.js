import { useState, useEffect } from "react";
import React from "react";
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
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Code as CodeIcon,
  Web as WebIcon,
  Storage as StorageIcon,
  Cloud as CloudIcon,
  Casino as CasinoIcon,
  Build as BuildIcon,
  Language as LanguageIcon,
  School as SchoolIcon,
  Psychology as PsychologyIcon,
  Terminal as TerminalIcon,
  Architecture as ArchitectureIcon,
  Security as SecurityIcon,
  Dataset as DatasetIcon,
  Analytics as AnalyticsIcon,
  Hub as HubIcon,
  PhoneAndroid as PhoneAndroidIcon,
  DesignServices as DesignServicesIcon,
} from "@mui/icons-material";
import AdminLayout from "../../src/components/layout/AdminLayout";
import AuthGuard from "../../src/components/auth/AuthGuard";
import axiosInstance from "../../src/utils/axios";
import { useDispatch, useSelector } from "react-redux";
import {
  selectSkills,
  fetchPortfolioData,
} from "../../src/redux/reducers/portfolioSlice";

// Predefined icons mapping
const SKILL_ICONS = {
  Code: CodeIcon,
  Web: WebIcon,
  Database: StorageIcon,
  Cloud: CloudIcon,
  AI: CasinoIcon,
  Tools: BuildIcon,
  Language: LanguageIcon,
  Education: SchoolIcon,
  Logic: PsychologyIcon,
  Terminal: TerminalIcon,
  Architecture: ArchitectureIcon,
  Security: SecurityIcon,
  Data: DatasetIcon,
  Analytics: AnalyticsIcon,
  Network: HubIcon,
  Mobile: PhoneAndroidIcon,
  Design: DesignServicesIcon,
};

export default function Skills() {
  const dispatch = useDispatch();
  const skills = useSelector(selectSkills);
  const [open, setOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    icon: "",
    skills: [],
  });

  useEffect(() => {
    if (!skills.length) {
      dispatch(fetchPortfolioData());
    }
  }, [dispatch, skills.length]);

  const handleOpen = (skill = null) => {
    if (skill) {
      setEditingSkill(skill);
      setFormData({
        title: skill.title,
        icon: skill.icon,
        skills: skill.skills,
      });
    } else {
      setEditingSkill(null);
      setFormData({
        title: "",
        icon: "",
        skills: [],
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingSkill(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (editingSkill) {
        await axiosInstance.put(`/skill/${editingSkill._id}/update`, formData);
      } else {
        await axiosInstance.post("/skill/create", formData);
      }
      dispatch(fetchPortfolioData()); // Refresh Redux store
      handleClose();
    } catch (error) {
      console.error("Error saving skill:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this skill?")) {
      setLoading(true);
      try {
        await axiosInstance.delete(`/skill/${id}/delete`);
        dispatch(fetchPortfolioData()); // Refresh Redux store
      } catch (error) {
        console.error("Error deleting skill:", error);
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
          <Typography variant="h4">Skills</Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpen()}
          >
            Add Skill Category
          </Button>
        </Box>

        {loading ? (
          <Box display="flex" justifyContent="center" my={4}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={3}>
            {skills.map((skill) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={skill._id}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    p: 1,
                  }}
                >
                  <CardContent sx={{ flexGrow: 1, p: 2 }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        mb: 2,
                      }}
                    >
                      <Typography variant="h6" gutterBottom>
                        {skill.title}
                      </Typography>
                      <Box>
                        <IconButton
                          onClick={() => handleOpen(skill)}
                          size="small"
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => handleDelete(skill._id)}
                          size="small"
                          color="error"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      {SKILL_ICONS[skill.icon] &&
                        React.createElement(SKILL_ICONS[skill.icon])}
                      <Typography variant="h6" gutterBottom>
                        {skill.title}
                      </Typography>
                    </Box>
                    <Box sx={{ mt: 2 }}>
                      {skill.skills.map((item, index) => (
                        <Typography key={index} variant="body2">
                          • {item}
                        </Typography>
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
          <DialogTitle>
            {editingSkill ? "Edit Skill Category" : "Add New Skill Category"}
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
              <FormControl fullWidth margin="normal">
                <InputLabel>Icon</InputLabel>
                <Select
                  value={formData.icon}
                  onChange={(e) =>
                    setFormData({ ...formData, icon: e.target.value })
                  }
                  required
                  label="Icon"
                >
                  {Object.entries(SKILL_ICONS).map(([name, Icon]) => (
                    <MenuItem key={name} value={name}>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <Icon />
                        <span>{name}</span>
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                fullWidth
                label="Skills"
                margin="normal"
                value={formData.skills.join(", ")}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    skills: e.target.value.split(",").map((s) => s.trim()),
                  })
                }
                required
                multiline
                rows={4}
                helperText="Enter skills separated by commas"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit" variant="contained" disabled={submitting}>
                {submitting ? (
                  <>
                    <CircularProgress size={20} sx={{ mr: 1 }} />
                    {editingSkill ? "Updating..." : "Creating..."}
                  </>
                ) : editingSkill ? (
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
