import { Paper, Box, Typography, Chip, alpha } from "@mui/material";
import { motion } from "framer-motion";
import React from "react";
import {
  Code,
  Web as WebIcon,
  Storage as DatabaseIcon,
  Cloud as CloudIcon,
  Casino as AIIcon,
  Build as ToolsIcon,
  Language as LanguageIcon,
  School as EducationIcon,
  Psychology as LogicIcon,
  Terminal as TerminalIcon,
  Architecture as ArchitectureIcon,
  Security as SecurityIcon,
  Dataset as DataIcon,
  Analytics as AnalyticsIcon,
  Hub as NetworkIcon,
  PhoneAndroid as MobileIcon,
  DesignServices as DesignIcon,
} from "@mui/icons-material";

const SkillCard = ({ icon, title, skills }) => {
  // Map string icon names to MUI icon components
  const getIconComponent = (iconName) => {
    switch (iconName) {
      case "Code":
        return <Code />;
      case "Web":
        return <WebIcon />;
      case "Database":
        return <DatabaseIcon />;
      case "Cloud":
        return <CloudIcon />;
      case "AI":
        return <AIIcon />;
      case "Tools":
        return <ToolsIcon />;
      case "Language":
        return <LanguageIcon />;
      case "Education":
        return <EducationIcon />;
      case "Logic":
        return <LogicIcon />;
      case "Terminal":
        return <TerminalIcon />;
      case "Architecture":
        return <ArchitectureIcon />;
      case "Security":
        return <SecurityIcon />;
      case "Data":
        return <DataIcon />;
      case "Analytics":
        return <AnalyticsIcon />;
      case "Network":
        return <NetworkIcon />;
      case "Mobile":
        return <MobileIcon />;
      case "Design":
        return <DesignIcon />;
      default:
        return <Code />;
    }
  };

  return (
    <motion.div whileHover={{ y: -5 }}>
      <Paper
        elevation={0}
        sx={{
          p: 3,
          height: "176px", // Fixed height equivalent to 44 (h-44)
          backgroundColor: "background.nebula",
          border: 1,
          borderColor: "divider",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "start", gap: 2, mb: 1.5 }}>
          <Box
            sx={{
              p: 1,
              borderRadius: 1,
              backgroundColor: (theme) =>
                alpha(theme.palette.primary.main, 0.1),
              color: "primary.main",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            {getIconComponent(icon)}
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" fontWeight={600}>
              {title}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ flex: 1, overflowY: "auto" }}>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {skills.map((skill, index) => (
              <Chip
                key={index}
                label={skill}
                size="small"
                variant="outlined"
                sx={{
                  borderColor: (theme) =>
                    alpha(theme.palette.primary.main, 0.2),
                  backgroundColor: (theme) =>
                    alpha(theme.palette.primary.main, 0.1),
                  color: "primary.main",
                  fontWeight: 500,
                }}
              />
            ))}
          </Box>
        </Box>
      </Paper>
    </motion.div>
  );
};

export default SkillCard;
