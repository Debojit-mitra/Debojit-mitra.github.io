import { Box, Typography, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import PublicIcon from "@mui/icons-material/Public";

const LoadingScreen = () => {
  const theme = useTheme();

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: (theme) =>
          theme.palette.mode === "dark"
            ? "rgba(0, 0, 0, 0.95)"
            : "rgba(18, 18, 38, 0.95)",
        zIndex: 9999,
      }}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      >
        <PublicIcon
          sx={{
            fontSize: {
              xs: 50,
              sm: 60,
              md: 80,
            },
            color: "#4dabf5",
          }}
        />
      </motion.div>
      <Typography
        variant="h6"
        sx={{
          mt: 2,
          color: "#fff",
          fontFamily: "monospace",
          letterSpacing: "0.2em",
          fontSize: {
            xs: "0.9rem",
            sm: "1rem",
            md: "1.25rem",
          },
          textAlign: "center",
          px: 2,
        }}
      >
        INITIATING LAUNCH SEQUENCE...
      </Typography>
    </Box>
  );
};

export default LoadingScreen;
