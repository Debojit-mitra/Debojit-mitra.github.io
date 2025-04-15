import { Box, Container, Typography, Button, Grid } from "@mui/material";
import { motion } from "framer-motion";
import { ArrowForward } from "@mui/icons-material";
import { GitHub, LinkedIn, Instagram, Mail } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { TypeAnimation } from "react-type-animation";
import {
  selectSocialLinks,
  selectOwnerData,
} from "../../redux/reducers/portfolioSlice";
import { scrollToSection } from "../../utils/scroll";

const Hero = () => {
  const socialLinks = useSelector(selectSocialLinks);
  const ownerData = useSelector(selectOwnerData);

  // Map icons from strings to MUI components
  const getIconComponent = (iconName) => {
    switch (iconName) {
      case "Github":
        return GitHub;
      case "Linkedin":
        return LinkedIn;
      case "Instagram":
        return Instagram;
      case "Mail":
        return Mail;
      default:
        return GitHub;
    }
  };

  // Split description into sentences
  const getDescriptionSequence = () => {
    if (!ownerData?.description) return [];

    const sentences = ownerData.description.split(".");
    const sequence = sentences
      .filter((sentence) => sentence.trim()) // Remove empty sentences
      .flatMap((sentence) => [
        sentence.trim() + ".", // Show sentence
        3000, // Wait for 3 seconds
      ]);

    return sequence;
  };

  return (
    <Box
      id="home"
      sx={{
        minHeight: "calc(100vh - 64px)",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Animated background element */}
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          position: "absolute",
          right: "-256px",
          top: "-256px",
          width: "384px",
          height: "384px",
          borderRadius: "50%",
          filter: "blur(60px)",
          zIndex: 0,
        }}
        className="animate-blob"
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Grid container spacing={3} alignItems="center">
          {/* Text Content */}
          <Grid size={{ xs: 12, lg: 8 }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Typography
                variant="h1"
                className="gradient-text"
                sx={{
                  mb: 2,
                  fontSize: { xs: "2rem", sm: "3rem", md: "3.5rem" },
                }}
                gutterBottom
              >
                {ownerData ? ownerData.name : ""}
              </Typography>

              <Box
                sx={{
                  mt: { xs: 2, md: "none" },
                  mr: { md: 15, lg: 20 },
                  height: "80px",
                }}
              >
                {ownerData && ownerData.description && (
                  <TypeAnimation
                    sequence={getDescriptionSequence()}
                    wrapper="span"
                    speed={50}
                    repeat={Infinity}
                    style={{
                      fontSize: "1.25rem",
                      display: "inline-block",
                      color: "text.secondary",
                    }}
                  />
                )}
              </Box>

              {/* CTA Buttons */}
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 4 }}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => scrollToSection("projects")}
                    endIcon={<ArrowForward />}
                    size="large"
                    sx={{ px: 3, py: 1 }}
                  >
                    View Projects
                  </Button>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="outlined"
                    color="primary"
                    href={`mailto:${ownerData ? ownerData.email : ""}`}
                    size="large"
                    sx={{ px: 3, py: 1 }}
                  >
                    Contact Me
                  </Button>
                </motion.div>
              </Box>

              {/* Social Links */}
              <Box sx={{ display: "flex", gap: 2 }}>
                {socialLinks.map((social) => {
                  const IconComponent = getIconComponent(social.icon);
                  return (
                    <motion.div
                      key={social.label}
                      whileHover={{ scale: 1.1, y: -2 }}
                    >
                      <Box
                        component="a"
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                        sx={{
                          p: 1,
                          borderRadius: "50%",
                          display: "flex",
                          backgroundColor: (theme) =>
                            theme.palette.mode === "light"
                              ? "rgba(0, 0, 0, 0.05)"
                              : "rgba(255, 255, 255, 0.05)",
                          "&:hover": {
                            backgroundColor: (theme) =>
                              theme.palette.mode === "light"
                                ? "rgba(0, 0, 0, 0.1)"
                                : "rgba(255, 255, 255, 0.1)",
                          },
                          color: "text.primary",
                        }}
                      >
                        <IconComponent fontSize="small" />
                      </Box>
                    </motion.div>
                  );
                })}
              </Box>
            </motion.div>
          </Grid>

          {/* Animated Illustration */}
          <Grid size={{ xs: 12, lg: 4 }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              style={{ position: "relative" }}
            >
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "1/1",
                  maxWidth: {
                    xs: "300px",
                    sm: "400px",
                    md: "500px",
                    lg: "600px",
                  },
                  mx: "auto",
                }}
              >
                {/* Floating astronaut placeholder */}
                <Box
                  sx={{
                    inset: { xs: "-20px", sm: "-30px", md: "-40px" },
                    position: "absolute",
                  }}
                >
                  <motion.div
                    animate={{
                      y: [-30, 30, -30],
                      rotate: [0, 8, -8, 0],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    style={{
                      position: "absolute",
                      inset: 0,
                      borderRadius: "50%",
                      background:
                        "linear-gradient(to bottom right, rgba(96, 165, 250, 0.15), rgba(167, 139, 250, 0.15))",
                    }}
                  >
                    <Box
                      sx={{
                        position: "absolute",
                        inset: { xs: "16px", sm: "24px", md: "32px" },
                        borderRadius: "50%",
                        background:
                          "linear-gradient(to bottom right, rgb(31, 132, 255), rgb(100, 49, 255))",
                        opacity: 0.35,
                        filter: "blur(48px)",
                      }}
                    />
                  </motion.div>
                </Box>
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Hero;
