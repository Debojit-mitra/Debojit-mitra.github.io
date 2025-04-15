import { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  ButtonGroup,
  CircularProgress,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import ProjectCard from "../ui/ProjectCard";
import { useDispatch, useSelector } from "react-redux";
import {
  setSelectedCategory,
  selectProjects,
  selectCategories,
  selectSelectedCategory,
  selectLoading,
} from "../../redux/reducers/portfolioSlice";

const Projects = () => {
  const dispatch = useDispatch();
  const projects = useSelector(selectProjects);
  const categories = useSelector(selectCategories);
  const selectedCategory = useSelector(selectSelectedCategory);
  const loading = useSelector(selectLoading);

  const handleCategoryChange = (category) => {
    dispatch(setSelectedCategory(category));
  };

  return (
    <Box id="projects" component="section" sx={{ py: 10 }}>
      <Container maxWidth="lg">
        {/* Section Header */}
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: false }}
          >
            <Typography variant="h2" component="h2" gutterBottom>
              Featured Projects
            </Typography>
          </motion.div>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: false }}
          >
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ maxWidth: "800px", mx: "auto" }}
            >
              A showcase of my best work, featuring web applications, mobile
              apps, and UI/UX projects.
            </Typography>
          </motion.div>
        </Box>

        {/* Category Filter */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mb: 6,
            flexWrap: "wrap",
            gap: 1,
          }}
        >
          <ButtonGroup
            variant="outlined"
            aria-label="project category filter"
            sx={{
              flexWrap: "wrap",
              justifyContent: "center",
              "& .MuiButtonGroup-grouped": {
                m: 0.5,
              },
            }}
          >
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => handleCategoryChange(category)}
                variant={
                  selectedCategory === category ? "contained" : "outlined"
                }
                sx={{
                  px: 3,
                  py: 1,
                  borderRadius: "24px !important",
                  textTransform: "capitalize",
                }}
              >
                {category === "ai_ml"
                  ? "AI/ML"
                  : category === "cli"
                  ? "CLI"
                  : category === "all"
                  ? "All Projects"
                  : `${category.charAt(0).toUpperCase()}${category.slice(1)}`}
              </Button>
            ))}
          </ButtonGroup>
        </Box>

        {/* Projects Grid */}
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "200px",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <motion.div layout>
            <Grid container spacing={3}>
              <AnimatePresence mode="popLayout">
                {projects.map((project) => (
                  <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={project.id}>
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ProjectCard project={project} />
                    </motion.div>
                  </Grid>
                ))}
              </AnimatePresence>
            </Grid>
          </motion.div>
        )}
      </Container>
    </Box>
  );
};

export default Projects;
