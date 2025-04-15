import {
  Box,
  Container,
  Typography,
  Grid,
  Link as MuiLink,
  alpha,
} from "@mui/material";
import { motion } from "framer-motion";
import { GitHub, LinkedIn, Instagram, Mail } from "@mui/icons-material";
import Link from "next/link";
import { useSelector } from "react-redux";
import {
  selectSocialLinks,
  selectOwnerData,
} from "../../redux/reducers/portfolioSlice";
import { scrollToSection } from "../../utils/scroll";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const socialLinks = useSelector(selectSocialLinks);
  const ownerData = useSelector(selectOwnerData);

  const quickLinks = [
    { name: "Home", id: "home" },
    { name: "About", id: "about" },
    { name: "Projects", id: "projects" },
    { name: "Contact", id: "contact" },
  ];

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

  // Heart animation variants
  const heartVariants = {
    animate: {
      scale: [1, 1.2, 1],
      transition: {
        duration: 1,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
        repeatDelay: 0.4,
      },
    },
  };

  return (
    <Box
      component="footer"
      sx={{
        position: "relative",
        pt: 10,
        pb: 5,
        overflow: "hidden",
      }}
    >
      {/* Decorative Elements */}
      <Box sx={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: 256,
            height: 256,
            backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.1),
            borderRadius: "50%",
            filter: "blur(60px)",
            transform: "translate(-50%, 50%)",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            right: 0,
            width: 256,
            height: 256,
            backgroundColor: (theme) =>
              alpha(theme.palette.secondary.main, 0.1),
            borderRadius: "50%",
            filter: "blur(60px)",
            transform: "translate(50%, 50%)",
          }}
        />
      </Box>

      <Container maxWidth="lg" sx={{ position: "relative" }}>
        <Grid container spacing={6} mb={8}>
          {/* Brand Section */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Link href="/" passHref legacyBehavior>
              <MuiLink
                sx={{
                  textDecoration: "none",
                  "&:hover": { textDecoration: "none" },
                }}
              >
                <Typography
                  variant="h4"
                  className="gradient-text"
                  sx={{
                    display: "block",
                    mb: 2,
                    fontWeight: 700,
                  }}
                >
                  {ownerData ? ownerData.name : "Dummy Name"}
                </Typography>
              </MuiLink>
            </Link>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mb: 3, maxWidth: "md" }}
            >
              {ownerData && ownerData.footerDescription
                ? ownerData.footerDescription
                : "Dummy Thank You"}
            </Typography>
            {/* Social Links */}
            <Box sx={{ display: "flex", gap: 2 }}>
              {socialLinks.map((social) => {
                const IconComponent = getIconComponent(social.icon);
                return (
                  <motion.div key={social.label} whileHover={{ y: -3 }}>
                    <MuiLink
                      href={social.href}
                      target={social.target || "_blank"}
                      rel={social.rel || "noopener noreferrer"}
                      aria-label={social.label}
                      sx={{
                        p: 1,
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: (theme) =>
                          theme.palette.mode === "light"
                            ? alpha(theme.palette.common.black, 0.05)
                            : alpha(theme.palette.common.white, 0.05),
                        "&:hover": {
                          backgroundColor: (theme) =>
                            theme.palette.mode === "light"
                              ? alpha(theme.palette.common.black, 0.1)
                              : alpha(theme.palette.common.white, 0.1),
                        },
                      }}
                    >
                      <IconComponent fontSize="small" />
                    </MuiLink>
                  </motion.div>
                );
              })}
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Quick Links
            </Typography>
            <Box component="ul" sx={{ listStyle: "none", p: 0, m: 0 }}>
              {quickLinks.map((link) => (
                <Box component="li" key={link.id} sx={{ mb: 1.5 }}>
                  <MuiLink
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.id);
                    }}
                    href={`#${link.id}`}
                    underline="hover"
                    sx={{
                      color: "text.secondary",
                      "&:hover": { color: "primary.main" },
                      transition: "color 0.2s",
                      cursor: "pointer",
                    }}
                  >
                    {link.name}
                  </MuiLink>
                </Box>
              ))}
            </Box>
          </Grid>

          {/* Contact Info */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Contact
            </Typography>
            <Box component="ul" sx={{ listStyle: "none", p: 0, m: 0 }}>
              <Box component="li" sx={{ mb: 1.5 }}>
                <MuiLink
                  href={`mailto:${
                    ownerData ? ownerData.email : "dummmy101email@gmail.com"
                  }`}
                  underline="hover"
                  sx={{
                    color: "text.secondary",
                    "&:hover": { color: "primary.main" },
                    transition: "color 0.2s",
                  }}
                >
                  {ownerData ? ownerData.email : "dummmy101email@gmail.com"}
                </MuiLink>
              </Box>
              <Box component="li" sx={{ mb: 1.5 }}>
                <MuiLink
                  href={
                    ownerData && ownerData.locationLink
                      ? ownerData.locationLink
                      : "https://maps.app.goo.gl/55R5517Cs62ceQCZ7"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  underline="hover"
                  sx={{
                    color: "text.secondary",
                    "&:hover": { color: "primary.main" },
                    transition: "color 0.2s",
                  }}
                >
                  {ownerData && ownerData.location
                    ? ownerData.location
                    : "Somewhere in World, Earth"}
                </MuiLink>
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* Bottom Bar */}
        <Box
          sx={{
            borderTop: 1,
            borderColor: "divider",
            pt: 4,
            textAlign: "center",
            color: "text.secondary",
          }}
        >
          <Typography
            variant="body2"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 0.5,
            }}
          >
            Made with
            <motion.span
              variants={heartVariants}
              animate="animate"
              style={{ display: "inline-block", color: "red" }}
            >
              ❤
            </motion.span>
            by {ownerData ? ownerData.name : "Dummy Person"} © {currentYear}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
