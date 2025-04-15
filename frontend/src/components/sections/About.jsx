import { Box, Container, Typography, Grid, Paper, alpha } from "@mui/material";
import { motion } from "framer-motion";
import {
  Code,
  DesktopWindows,
  Storage,
  PhoneAndroid,
  DeveloperMode,
} from "@mui/icons-material";
import SkillCard from "../ui/SkillCard";
import { useSelector } from "react-redux";
import {
  selectSkills,
  selectTimelineEvents,
  selectOwnerData,
} from "../../redux/reducers/portfolioSlice";

const About = () => {
  const skills = useSelector(selectSkills);
  const timelineEvents = useSelector(selectTimelineEvents);
  const ownerData = useSelector(selectOwnerData);

  return (
    <Box id="about" component="section" sx={{ py: 10, position: "relative" }}>
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
              About Me
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
              {ownerData && ownerData.about
                ? ownerData.about
                : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."}
            </Typography>
          </motion.div>
        </Box>

        {/* Timeline */}
        <Box sx={{ mb: 10 }}>
          <Typography
            variant="h3"
            textAlign="center"
            gutterBottom
            fontWeight={600}
            mb={4}
          >
            My Journey
          </Typography>
          <Box
            sx={{
              maxWidth: "800px",
              mx: "auto",
              position: "relative",
              "&::before": {
                content: '""',
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%)",
                width: "2px",
                height: "100%",
                backgroundColor: "divider",
              },
            }}
          >
            {timelineEvents.map((event, index) => (
              <motion.div
                key={event._id || event.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: false }}
                style={{ position: "relative", marginBottom: "32px" }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: index % 2 === 0 ? "row-reverse" : "row",
                  }}
                >
                  <Box sx={{ width: "50%" }} />
                  <Box
                    sx={{
                      width: "24px",
                      height: "24px",
                      position: "absolute",
                      left: "50%",
                      transform: "translateX(-50%)",
                      borderRadius: "50%",
                      bgcolor: "primary.main",
                      zIndex: 1,
                    }}
                  />
                  <Box
                    sx={{
                      width: "50%",
                      px: 1,
                      textAlign: index % 2 === 0 ? "right" : "left",
                    }}
                  >
                    <Paper
                      elevation={0}
                      sx={{
                        p: 3,
                        borderRadius: 2,
                        backgroundColor: "background.nebula",
                        border: 1,
                        borderColor: "divider",
                      }}
                    >
                      <Typography
                        color="primary"
                        fontWeight="bold"
                        variant="subtitle1"
                      >
                        {event.year}
                      </Typography>
                      <Typography variant="h7" gutterBottom fontWeight={800}>
                        {event.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {event.description}
                      </Typography>
                    </Paper>
                  </Box>
                </Box>
              </motion.div>
            ))}
          </Box>
        </Box>

        {/* Skills Grid */}
        <Box>
          <Typography
            variant="h3"
            textAlign="center"
            gutterBottom
            fontWeight={600}
            mb={4}
          >
            Skills & Expertise
          </Typography>
          <Grid container spacing={3}>
            {skills.map((skill, index) => (
              <Grid
                size={{ xs: 12, sm: 6, lg: 4 }}
                xs={12}
                sm={6}
                lg={4}
                key={skill._id || skill.title}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: false }}
                >
                  <SkillCard {...skill} />
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default About;
