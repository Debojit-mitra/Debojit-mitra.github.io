import { useEffect, useState } from "react";
import { Box, alpha } from "@mui/material";
import { useSelector } from "react-redux";
import { selectTheme } from "../../redux/reducers/themeSlice";

const StarBackground = () => {
  const [stars, setStars] = useState([]);
  const themeMode = useSelector(selectTheme);
  const isLight = themeMode === "light";

  useEffect(() => {
    const generateStars = () => {
      const starCount = Math.floor(
        (window.innerWidth * window.innerHeight) / (isLight ? 12000 : 10000)
      );
      return Array.from({ length: starCount }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * (isLight ? 4 : 2) + 1,
        animationDelay: Math.random() * 5, // Increased max delay to 5s
        animationDuration: 2 + Math.random() * 2, // Random duration between 2-4s
      }));
    };

    const handleResize = () => {
      setStars(generateStars());
    };

    setStars(generateStars());
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [isLight]);

  return (
    <Box className="star-field">
      {/* Stars */}
      {stars.map((star) => (
        <Box
          key={star.id}
          className="star"
          sx={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            backgroundColor: isLight
              ? "rgba(59, 130, 246, 0.3)"
              : "rgba(255, 255, 255, 0.7)",
            animationDelay: `${star.animationDelay}s`,
            "--twinkle-duration": `${star.animationDuration}s`,
          }}
        />
      ))}

      {/* Nebula effects */}
      <Box
        className="nebula"
        sx={{
          top: "20%",
          left: "10%",
          width: "40vw",
          height: "40vh",
          backgroundColor: isLight
            ? "rgba(167, 139, 250, 0.)"
            : "rgba(147, 51, 234, 0.2)",
          opacity: isLight ? 0.3 : 0.2,
        }}
      />
      <Box
        className="nebula"
        sx={{
          bottom: "30%",
          right: "20%",
          width: "35vw",
          height: "35vh",
          backgroundColor: isLight
            ? "rgba(96, 165, 250, 0.3)"
            : "rgba(59, 130, 246, 0.2)",
          opacity: isLight ? 0.3 : 0.2,
        }}
      />

      {/* Light mode gradient overlay with increased intensity */}
      {isLight && (
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background:
              "linear-gradient(45deg, rgba(147, 197, 253, 0.3), rgba(167, 139, 250, 0.3))",
            mixBlendMode: "multiply",
          }}
        />
      )}
    </Box>
  );
};

export default StarBackground;
