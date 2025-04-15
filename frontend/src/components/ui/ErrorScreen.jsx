import { Box, Typography, Button } from "@mui/material";
import { motion } from "framer-motion";
import { Error as ErrorIcon } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { fetchPortfolioData } from "../../redux/reducers/portfolioSlice";

const ErrorScreen = ({ error }) => {
  const dispatch = useDispatch();

  const handleRetry = () => {
    dispatch(fetchPortfolioData());
  };

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
            ? theme.palette.background.default
            : "rgba(255, 255, 255, 0.9)",
        zIndex: 9999,
      }}
    >
      <ErrorIcon color="error" sx={{ fontSize: 60, mb: 2 }} />
      <Typography variant="h5" color="error" gutterBottom>
        Oops! Something went wrong
      </Typography>
      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ mb: 3, textAlign: "center" }}
      >
        {error || "Failed to connect to server"}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleRetry}
        component={motion.button}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Retry
      </Button>
    </Box>
  );
};

export default ErrorScreen;
