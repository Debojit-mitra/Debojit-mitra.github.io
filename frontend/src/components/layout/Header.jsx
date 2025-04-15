import { useState, useEffect } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  useScrollTrigger,
  alpha,
  Typography,
} from "@mui/material";
import { Menu, Close } from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "../ui/ThemeToggle";
import { scrollToSection } from "../../utils/scroll";
import { useSelector } from "react-redux";
import { selectOwnerData } from "../../redux/reducers/portfolioSlice";

const DRAWER_WIDTH = 240;

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const ownerData = useSelector(selectOwnerData);

  const navItems = [
    { label: "Home", id: "home" },
    { label: "About", id: "about" },
    { label: "Projects", id: "projects" },
    { label: "Contact", id: "contact" },
  ];

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 20,
  });

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    // Initial check for active section on page load
    const checkInitialSection = () => {
      const viewportHeight = window.innerHeight;
      const viewportCenter = viewportHeight / 2;

      const sectionPositions = navItems.map((item) => {
        const element = document.getElementById(item.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          const distanceToCenter = Math.abs(
            rect.top + rect.height / 2 - viewportCenter
          );
          return { id: item.id, distance: distanceToCenter };
        }
        return { id: item.id, distance: Infinity };
      });

      const closestSection = sectionPositions.reduce((prev, curr) =>
        prev.distance < curr.distance ? prev : curr
      );

      setActiveSection(closestSection.id);
    };

    const handleScroll = () => {
      // Check which section is in view
      const sections = navItems.map((item) => ({
        id: item.id,
        element: document.getElementById(item.id),
      }));

      const currentSection = sections.find((section) => {
        if (section.element) {
          const rect = section.element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (currentSection) {
        setActiveSection(currentSection.id);
      }
    };

    setTimeout(checkInitialSection, 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (sectionId) => {
    setIsMenuOpen(false);
    setTimeout(() => {
      scrollToSection(sectionId);
    }, 10);
  };

  const navigationList = (
    <List sx={{ py: 1 }}>
      {navItems.map((item) => (
        <ListItem key={item.id} disablePadding>
          <ListItemButton
            onClick={() => handleNavClick(item.id)}
            sx={{
              py: 1.5,
              px: 3,
              my: 0.5,
              borderRadius: 2,
              backgroundColor: (theme) =>
                activeSection === item.id
                  ? alpha(theme.palette.primary.main, 0.1)
                  : "transparent",
              color: (theme) =>
                activeSection === item.id
                  ? theme.palette.primary.main
                  : theme.palette.text.primary,
            }}
          >
            {item.label}
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );

  return (
    <AppBar
      position="fixed"
      sx={{
        boxShadow: trigger ? 2 : 0,
        backgroundColor: "transparent",
        backdropFilter: trigger ? "blur(10px)" : "none",
        transition: "all 0.3s ease",
        background: "none",
        border: "none",
        borderRadius: 0.5,
      }}
    >
      <Toolbar
        sx={{
          width: "100%",
          maxWidth: 1200,
          mx: "auto",
          px: { xs: 2, sm: 3 },
          height: 64,
        }}
      >
        <Box sx={{ flexGrow: 1 }} />

        {/* Desktop Navigation */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            gap: 1,
          }}
        >
          {navItems.map((item) => (
            <Box key={item.id} sx={{ position: "relative" }}>
              <Button
                onClick={() => handleNavClick(item.id)}
                sx={{
                  px: 2,
                  py: 1,
                  borderRadius: 2,
                  color: (theme) =>
                    activeSection === item.id
                      ? theme.palette.primary.main
                      : theme.palette.text.secondary,
                  "&:hover": {
                    color: "primary.main",
                    backgroundColor: "transparent",
                  },
                  position: "relative",
                  zIndex: 1,
                }}
              >
                {item.label}
              </Button>
              {activeSection === item.id && (
                <motion.div
                  layoutId="navbar-indicator"
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: 8,
                    zIndex: 0,
                  }}
                  transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                  initial={false}
                  animate={{
                    backgroundColor: alpha("#4263eb", 0.1),
                  }}
                />
              )}
            </Box>
          ))}
          <Box sx={{ ml: 1 }}>
            <ThemeToggle />
          </Box>
        </Box>

        {/* Mobile Menu Button */}
        <Box
          sx={{
            display: { xs: "flex", md: "none" },
            alignItems: "center",
            gap: 2,
          }}
        >
          <ThemeToggle />
          <IconButton
            edge="end"
            color="inherit"
            aria-label="toggle menu"
            onClick={handleMenuToggle}
            sx={{
              p: 1,
              borderRadius: 2,
              "&:hover": {
                backgroundColor: (theme) =>
                  alpha(theme.palette.primary.main, 0.08),
              },
            }}
          >
            {isMenuOpen ? <Close /> : <Menu />}
          </IconButton>
        </Box>
      </Toolbar>

      {/* Mobile Navigation */}
      <Box
        component="nav"
        sx={{ width: { sm: DRAWER_WIDTH }, flexShrink: { sm: 0 } }}
      >
        {/* Mobile Drawer */}
        <Drawer
          variant="temporary"
          open={isMenuOpen}
          onClose={handleMenuToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: DRAWER_WIDTH,
              bgcolor: "background.nebula",
              borderRadius: 0.5,
              backdropFilter: "blur(10px)",
            },
          }}
        >
          {navigationList}
        </Drawer>
      </Box>
    </AppBar>
  );
};

export default Header;
