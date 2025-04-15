import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Paper,
  Link,
  InputAdornment,
  Snackbar,
  Alert,
  alpha,
  CircularProgress,
} from "@mui/material";
import { motion } from "framer-motion";
import { MailOutline, Instagram, LocationOn, Send } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  submitContactForm,
  selectContactFormStatus,
  selectOwnerData,
} from "../../redux/reducers/portfolioSlice";

const Contact = () => {
  const dispatch = useDispatch();
  const formStatus = useSelector(selectContactFormStatus);
  const ownerData = useSelector(selectOwnerData);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  useEffect(() => {
    if (formStatus === "succeeded") {
      setSnackbarMessage("Your message has been sent successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } else if (formStatus === "failed") {
      setSnackbarMessage(
        "There was an error sending your message. Redirecting to email...."
      );
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      handleDefaultMail();
    }
  }, [formStatus]);

  // Create dynamic contact info based on owner data
  const getContactInfo = () => {
    const contactItems = [];

    // Email
    if (ownerData?.email) {
      contactItems.push({
        icon: MailOutline,
        title: "Email",
        content: ownerData.email,
        link: `mailto:${ownerData.email}`,
      });
    }

    // Instagram
    if (ownerData?.instagram) {
      contactItems.push({
        icon: Instagram,
        title: "Instagram",
        content: "Connect with me on Instagram",
        target: "_blank",
        rel: "noopener noreferrer",
        link: ownerData.instagram,
      });
    }

    // Location
    if (ownerData?.location) {
      contactItems.push({
        icon: LocationOn,
        title: "Location",
        content: ownerData.location,
        target: "_blank",
        rel: "noopener noreferrer",
        link:
          ownerData?.locationLink ||
          "https://maps.app.goo.gl/Dt8SauiNAdkXkXAg9",
      });
    }

    return contactItems;
  };

  const contactInfo = getContactInfo();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setSnackbarMessage("Please fill in all required fields");
      setSnackbarSeverity("warning");
      setSnackbarOpen(true);
      return;
    }

    // Option 1: Use API if available
    dispatch(submitContactForm(formData));
  };

  const handleDefaultMail = () => {
    const mailtoLink = `mailto:${
      ownerData?.email || "dummyemail@gmail.com"
    }?subject=${encodeURIComponent(
      formData.subject || "Contact Form Submission"
    )}&body=${encodeURIComponent(
      `Name: ${formData.name}\n\nMessage:\n${formData.message}`
    )}`;
    window.location.href = mailtoLink;
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box
      id="contact"
      component="section"
      sx={{
        py: 10,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Elements */}
      <motion.div
        className="absolute"
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
          left: "-256px",
          top: "128px",
          width: "384px",
          height: "384px",
          borderRadius: "50%",
          background: (theme) => alpha(theme.palette.primary.main, 0.1),
          filter: "blur(60px)",
          zIndex: 0,
        }}
      />

      <motion.div
        className="absolute"
        animate={{
          x: [0, -100, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          position: "absolute",
          right: "-256px",
          bottom: "128px",
          width: "384px",
          height: "384px",
          borderRadius: "50%",
          background: (theme) => alpha(theme.palette.secondary.main, 0.1),
          filter: "blur(60px)",
          zIndex: 0,
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        {/* Section Header */}
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: false }}
          >
            <Typography variant="h2" component="h2" gutterBottom>
              Get In Touch
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
              Have a project in mind or want to collaborate? I'd love to hear
              from you. Drop me a message and I'll get back to you as soon as
              possible.
            </Typography>
          </motion.div>
        </Box>

        <Grid container spacing={4} justifyContent="center">
          {/* Contact Information */}
          <Grid size={{ xs: 12, md: 4 }} sx={{ order: { xs: 2, md: 1 } }}>
            <Typography variant="h5" fontWeight={600} gutterBottom>
              Contact Information
            </Typography>
            <Box sx={{ mb: 4 }}>
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: false }}
                >
                  <Paper
                    elevation={0}
                    component={Link}
                    href={info.link}
                    target={info.target}
                    rel={info.rel}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 3,
                      p: 3,
                      mb: 2,
                      borderRadius: 1,
                      backgroundColor: "background.nebula",
                      textDecoration: "none",
                      color: "text.primary",
                      border: 1,
                      borderColor: "divider",
                      transition: "all 0.2s",
                      "&:hover": {
                        backgroundColor: (theme) =>
                          alpha(theme.palette.primary.main, 0.05),
                      },
                    }}
                  >
                    <Box
                      sx={{
                        p: 1.5,
                        borderRadius: 2,
                        backgroundColor: (theme) =>
                          alpha(theme.palette.primary.main, 0.1),
                        color: "primary.main",
                        display: "flex",
                      }}
                    >
                      <info.icon />
                    </Box>
                    <Box>
                      <Typography variant="h6" fontWeight={500}>
                        {info.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {info.content}
                      </Typography>
                    </Box>
                  </Paper>
                </motion.div>
              ))}
            </Box>
          </Grid>

          {/* Contact Form */}
          <Grid
            size={{ xs: 12, md: 7 }}
            mt={{ md: 5 }}
            sx={{ order: { xs: 1, md: 2 } }}
          >
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: false }}
            >
              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid size={{ xs: 12 }}>
                    <TextField
                      label="Your Name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      fullWidth
                      required
                      variant="outlined"
                      InputProps={{
                        sx: { borderRadius: 1 },
                      }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <TextField
                      label="Your Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      fullWidth
                      required
                      variant="outlined"
                      InputProps={{
                        sx: { borderRadius: 1 },
                      }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <TextField
                      label="Your Message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      fullWidth
                      required
                      multiline
                      rows={4}
                      variant="outlined"
                      InputProps={{
                        sx: { borderRadius: 1 },
                      }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      fullWidth
                      size="large"
                      disabled={formStatus === "loading"}
                      endIcon={
                        formStatus === "loading" ? (
                          <CircularProgress size={20} color="inherit" />
                        ) : (
                          <Send />
                        )
                      }
                      sx={{
                        py: 1.5,
                        borderRadius: 1,
                      }}
                    >
                      {formStatus === "loading" ? "Sending..." : "Send Message"}
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </motion.div>
          </Grid>
        </Grid>

        {/* Snackbar for notifications */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity={snackbarSeverity}
            variant="filled"
            sx={{ width: "100%" }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default Contact;
