import { createTheme } from "@mui/material/styles";

// Create a theme instance with color mode
export const createAppTheme = (mode) => {
  return createTheme({
    palette: {
      mode,
      ...(mode === "light"
        ? {
            // Light mode palette
            primary: {
              main: "rgba(66, 99, 235, 1)", // Vibrant blue similar to your tailwind theme
              light: "rgba(96, 129, 255, 1)",
              dark: "rgba(36, 69, 205, 1)",
              contrastText: "#ffffff",
            },
            secondary: {
              main: "rgba(147, 51, 234, 0.8)", // Purple with opacity
              light: "rgba(167, 81, 254, 0.8)",
              dark: "rgba(127, 31, 214, 0.8)",
              contrastText: "#ffffff",
            },
            background: {
              default: "rgba(240, 242, 255, 1)", // Soft white with slight blue tint
              paper: "#ffffff",
              nebula: "rgba(240, 249, 255, 0.7)", // Light nebula background for cards
            },
            text: {
              primary: "rgba(30, 41, 59, 1)", // Darker text for contrast
              secondary: "rgba(71, 85, 105, 1)", // Secondary text color
            },
            divider: "rgba(226, 232, 240, 1)",
            // Custom colors
            customColors: {
              star: "rgba(96, 165, 250, 0.4)", // Blue stars with opacity
              nebula: {
                blue: "rgba(147, 197, 253, 0.3)",
                purple: "rgba(167, 139, 250, 0.3)",
              },
              cardBg: "rgba(255, 255, 255, 0.7)",
              cardBorder: "rgba(226, 232, 240, 1)",
            },
          }
        : {
            // Dark mode palette
            primary: {
              main: "rgba(96, 165, 250, 1)", // Vibrant blue
              light: "rgba(126, 195, 255, 1)",
              dark: "rgba(66, 135, 220, 1)",
              contrastText: "#ffffff",
            },
            secondary: {
              main: "rgba(167, 139, 250, 1)", // Purple
              light: "rgba(197, 169, 255, 1)",
              dark: "rgba(137, 109, 220, 1)",
              contrastText: "#ffffff",
            },
            background: {
              default: "rgba(11, 11, 30, 1)", // Dark space background
              paper: "rgba(30, 41, 59, 0.8)",
              nebula: "rgba(26, 26, 58, 0.6)", // Dark nebula background for cards
            },
            text: {
              primary: "#ffffff",
              secondary: "rgba(203, 213, 225, 1)",
            },
            divider: "rgba(51, 65, 85, 1)",
            // Custom colors
            customColors: {
              star: "rgba(255, 255, 255, 0.7)", // White stars with opacity
              nebula: {
                blue: "rgba(37, 99, 235, 0.2)",
                purple: "rgba(147, 51, 234, 0.2)",
              },
              cardBg: "rgba(30, 41, 59, 0.8)",
              cardBorder: "rgba(51, 65, 85, 1)",
            },
          }),
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontWeight: 700,
        fontSize: "3.5rem",
        lineHeight: 1.2,
        letterSpacing: "-0.01em",
        background: "linear-gradient(90deg, #4263eb, #a855f7)",
        backgroundClip: "text",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        textFillColor: "transparent",
      },
      h2: {
        fontWeight: 700,
        fontSize: "2.5rem",
        lineHeight: 1.3,
        letterSpacing: "-0.01em",
      },
      h3: {
        fontWeight: 600,
        fontSize: "1.75rem",
        lineHeight: 1.3,
      },
      h4: {
        fontWeight: 600,
        fontSize: "1.25rem",
        lineHeight: 1.4,
      },
      button: {
        textTransform: "none",
        fontWeight: 500,
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: "0.5rem",
            padding: "0.5rem 1rem",
            boxShadow: "none",
            "&:hover": {
              boxShadow: "0 4px 14px 0 rgba(0, 0, 0, 0.1)",
            },
          },
          contained: {
            "&:hover": {
              boxShadow: "0 6px 20px rgba(0, 0, 0, 0.15)",
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: ({ theme }) => ({
            borderRadius: "0.75rem",
            backdropFilter: "blur(10px)",
            ...(theme.palette.mode === "light"
              ? {
                  boxShadow: "0 4px 20px -4px rgba(147, 197, 253, 0.15)",
                  border: `1px solid ${theme.palette.customColors.cardBorder}`,
                }
              : {
                  boxShadow: "0 4px 20px -4px rgba(0, 0, 0, 0.2)",
                  border: `1px solid ${theme.palette.customColors.cardBorder}`,
                }),
          }),
        },
      },
      MuiCard: {
        styleOverrides: {
          root: ({ theme }) => ({
            backgroundColor: theme.palette.background.nebula,
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            "&:hover": {
              transform: "translateY(-5px)",
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
            },
          }),
        },
      },
      MuiCssBaseline: {
        styleOverrides: (theme) => ({
          body: {
            scrollBehavior: "smooth",
            overflowX: "hidden",
            ...(theme.palette.mode === "light"
              ? {
                  backgroundImage:
                    "linear-gradient(to bottom right, rgba(147, 197, 253, 0.1), rgba(196, 181, 253, 0.1), rgba(167, 139, 250, 0.1))",
                }
              : {
                  backgroundImage: "none",
                  backgroundColor: theme.palette.background.default,
                }),
          },
        }),
      },
    },
    shape: {
      borderRadius: 8,
    },
  });
};
