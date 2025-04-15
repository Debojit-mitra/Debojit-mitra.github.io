import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Chip,
  Button,
  alpha,
  styled,
} from "@mui/material";
import { motion } from "framer-motion";
import { GitHub, OpenInNew, Label } from "@mui/icons-material";
import Image from "next/image";

// Styled component for the card for animation
const MotionCard = styled(motion.div)(({ theme }) => ({
  height: "100%",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
}));

const ProjectCard = ({ project }) => {
  return (
    <MotionCard whileHover={{ y: -5 }}>
      <Card
        elevation={0}
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          backgroundColor: "background.nebula",
          border: 1,
          borderColor: "divider",
        }}
      >
        {/* Project Image */}
        <Box sx={{ position: "relative", aspectRatio: "16/9", width: "100%" }}>
          <CardMedia
            component="img"
            image={project.image || "/api/placeholder/600/400"}
            alt={project.title}
            height="auto"
            sx={{ objectFit: "cover", height: "100%" }}
          />
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to top, rgba(0, 0, 0, 0.5), transparent)",
            }}
          />
        </Box>

        {/* Project Content */}
        <CardContent
          sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
        >
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mb: 1.5 }}>
            {project.tags &&
              project.tags.slice(0, 3).map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  size="small"
                  icon={<Label sx={{ fontSize: 16 }} />}
                  sx={{
                    px: 1,
                    py: 0.5,
                    borderRadius: "16px",
                    height: "24px",
                    backgroundColor: (theme) =>
                      alpha(theme.palette.primary.main, 0.1),
                    color: "primary.main",
                    "& .MuiChip-icon": {
                      color: "primary.main",
                    },
                  }}
                />
              ))}
          </Box>

          <Typography variant="h6" fontWeight={600} gutterBottom>
            {project.title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 2.5, flexGrow: 1 }}
          >
            {project.description}
          </Typography>

          {/* Project Links */}
          <Box sx={{ display: "flex", gap: 1.5, mt: "auto" }}>
            {project.github && (
              <Button
                component="a"
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                startIcon={<GitHub />}
                variant="outlined"
                color="inherit"
                size="small"
                sx={{
                  borderColor: (theme) =>
                    theme.palette.mode === "dark"
                      ? "rgba(255, 255, 255, 0.3)"
                      : "rgba(0, 0, 0, 0.2)",
                  color: (theme) =>
                    theme.palette.mode === "dark"
                      ? "rgba(255, 255, 255, 0.7)"
                      : "rgba(0, 0, 0, 0.7)",
                  "&:hover": {
                    borderColor: (theme) =>
                      theme.palette.mode === "dark"
                        ? "rgba(255, 255, 255, 0.5)"
                        : "rgba(0, 0, 0, 0.4)",
                    backgroundColor: (theme) =>
                      theme.palette.mode === "dark"
                        ? "rgba(255, 255, 255, 0.05)"
                        : "rgba(0, 0, 0, 0.05)",
                  },
                }}
              >
                Code
              </Button>
            )}
            {project.demo && (
              <Button
                component="a"
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                startIcon={<OpenInNew />}
                variant="contained"
                color="primary"
                size="small"
              >
                Live Demo
              </Button>
            )}
          </Box>
        </CardContent>
      </Card>
    </MotionCard>
  );
};

export default ProjectCard;
