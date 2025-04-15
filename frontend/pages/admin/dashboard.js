import { useEffect } from "react";
import { Grid, Card, CardContent, Typography, Box } from "@mui/material";
import { Code, Build, Mail, Timeline } from "@mui/icons-material";
import AdminLayout from "../../src/components/layout/AdminLayout";
import AuthGuard from "../../src/components/auth/AuthGuard";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import {
  selectProjects,
  selectSkills,
  selectTimelineEvents,
  selectMessages,
  fetchPortfolioData,
  fetchMessages,
} from "../../src/redux/reducers/portfolioSlice";

export default function Dashboard() {
  const dispatch = useDispatch();
  const projects = useSelector(selectProjects);
  const skills = useSelector(selectSkills);
  const timelineEvents = useSelector(selectTimelineEvents);
  const messagesState = useSelector(selectMessages);

  useEffect(() => {
    // Only fetch portfolio data if we don't have any projects or skills
    if (!projects.length || !skills.length) {
      dispatch(fetchPortfolioData());
    }
    // Fetch messages on mount
    dispatch(fetchMessages());
  }, [dispatch, projects.length, skills.length]);

  const statCards = [
    {
      title: "Projects",
      value: projects.length,
      icon: <Code />,
      color: "#2196f3",
      link: "/admin/projects",
    },
    {
      title: "Skills",
      value: skills.length,
      icon: <Build />,
      color: "#4caf50",
      link: "/admin/skills",
    },
    {
      title: "Messages",
      value: messagesState.total || 0,
      subtext:
        messagesState.unread > 0
          ? `${messagesState.unread} unread`
          : "No unread messages",
      icon: <Mail />,
      color: messagesState.unread > 0 ? "#ff9800" : "#9e9e9e",
      link: "/admin/messages",
    },
    {
      title: "Timeline Events",
      value: timelineEvents.length,
      icon: <Timeline />,
      color: "#9c27b0",
      link: "/admin/timeline",
    },
  ];

  return (
    <AuthGuard>
      <AdminLayout>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" gutterBottom>
            Welcome to Admin Dashboard
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage your portfolio content from here
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {statCards.map((card) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={card.title}>
              <Link href={card.link} style={{ textDecoration: "none" }}>
                <Card
                  sx={{
                    cursor: "pointer",
                    transition: "transform 0.2s, box-shadow 0.2s",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: 4,
                    },
                  }}
                >
                  <CardContent>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <Box
                        sx={{
                          backgroundColor: card.color,
                          borderRadius: "50%",
                          p: 1,
                          display: "flex",
                          mr: 2,
                        }}
                      >
                        {card.icon}
                      </Box>
                      <Typography variant="h6" component="div">
                        {card.title}
                      </Typography>
                    </Box>
                    <Typography
                      variant="h4"
                      component="div"
                      sx={{ display: "flex", alignItems: "center" }}
                    >
                      {card.value}
                      {card.subtext && (
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ ml: 1 }}
                        >
                          ({card.subtext})
                        </Typography>
                      )}
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
      </AdminLayout>
    </AuthGuard>
  );
}
