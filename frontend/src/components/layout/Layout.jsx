import { Box } from "@mui/material";
import Header from "./Header";
import Footer from "./Footer";
import StarBackground from "./StarBackground";

const Layout = ({ children }) => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <StarBackground />
      <Header />
      <Box
        component="main"
        sx={{ pt: "64px", position: "relative", zIndex: 10 }}
      >
        {children}
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;
