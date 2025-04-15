import { useState, useEffect } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  alpha,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Dashboard,
  Person,
  Code,
  Build,
  Mail,
  Timeline,
  Logout,
} from "@mui/icons-material";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import ThemeToggle from "../ui/ThemeToggle";
import { logout } from "../../redux/reducers/authSlice";

const DRAWER_WIDTH = 240;

const menuItems = [
  { text: "Dashboard", icon: <Dashboard />, path: "/admin/dashboard" },
  { text: "Projects", icon: <Code />, path: "/admin/projects" },
  { text: "Skills", icon: <Build />, path: "/admin/skills" },
  { text: "Timeline", icon: <Timeline />, path: "/admin/timeline" },
  { text: "Messages", icon: <Mail />, path: "/admin/messages" },
  { text: "Profile", icon: <Person />, path: "/admin/profile" },
];

export default function AdminLayout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const [activePath, setActivePath] = useState("");

  // Update active path whenever the router changes
  useEffect(() => {
    // Find the matching menu item based on current route
    const currentPath = router.asPath.split("?")[0].split("#")[0];

    // Find the most specific matching path
    const matchingItem = menuItems
      .filter((item) => currentPath.startsWith(item.path))
      .sort((a, b) => b.path.length - a.path.length)[0];

    if (matchingItem) {
      setActivePath(matchingItem.path);
    }
  }, [router.asPath]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    router.push("/admin/login");
  };

  const drawer = (
    <Box sx={{ mt: 8 }}>
      <List>
        {menuItems.map((item) => {
          const isActive = activePath === item.path;

          return (
            <ListItem
              button
              key={item.text}
              onClick={() => router.push(item.path)}
              sx={{
                position: "relative",
                borderLeft: "4px solid transparent",
                transition: "all 0.2s ease-in-out",
                borderRadius: "0 8px 8px 0",
                my: 0.5,
                color: isActive ? "white" : "text.primary",
                backgroundColor: isActive ? "primary.main" : "transparent",
                borderLeftColor: isActive
                  ? (theme) => theme.palette.primary.light
                  : "transparent",
                "&:hover": {
                  backgroundColor: isActive
                    ? "primary.dark"
                    : (theme) =>
                        theme.palette.mode === "dark"
                          ? "rgba(255, 255, 255, 0.08)"
                          : "rgba(0, 0, 0, 0.04)",
                  borderLeftColor: isActive
                    ? (theme) => theme.palette.primary.dark
                    : (theme) => theme.palette.primary.dark,
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: isActive ? "white" : "inherit",
                  minWidth: "40px",
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          );
        })}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          background: "none",
          border: "none",
          borderRadius: 0.5,
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            sx={{ flexGrow: 1, color: (theme) => theme.palette.text.primary }}
          >
            Portfolio Admin
          </Typography>
          <ThemeToggle />
          <Button
            color="inherit"
            onClick={handleLogout}
            startIcon={<Logout />}
            sx={{ ml: 2, color: (theme) => theme.palette.text.primary }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { sm: DRAWER_WIDTH }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: DRAWER_WIDTH,
              bgcolor: "background.nebula",
              borderRadius: 0.5,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: DRAWER_WIDTH,
              bgcolor: "background.nebula",
              borderRadius: 0.5,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
          mt: 8,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
