import { IconButton, alpha } from "@mui/material";
import { LightMode, DarkMode } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme, selectTheme } from "../../redux/reducers/themeSlice";

const ThemeToggle = () => {
  const dispatch = useDispatch();
  const themeMode = useSelector(selectTheme);
  const isDark = themeMode === "dark";

  return (
    <IconButton
      onClick={() => dispatch(toggleTheme())}
      aria-label="Toggle theme"
      sx={{
        p: 1,
        borderRadius: 2,
        backgroundColor: (theme) =>
          alpha(
            theme.palette.mode === "dark"
              ? theme.palette.common.white
              : theme.palette.common.black,
            0.05
          ),
        "&:hover": {
          backgroundColor: (theme) =>
            alpha(
              theme.palette.mode === "dark"
                ? theme.palette.common.white
                : theme.palette.common.black,
              0.1
            ),
        },
      }}
    >
      {isDark ? (
        <LightMode sx={{ color: "yellow.400" }} fontSize="small" />
      ) : (
        <DarkMode sx={{ color: "primary.main" }} fontSize="small" />
      )}
    </IconButton>
  );
};

export default ThemeToggle;
