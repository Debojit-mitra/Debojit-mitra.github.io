import { useEffect, useState } from "react";
import Head from "next/head";
import { Provider } from "react-redux";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { CacheProvider } from "@emotion/react";
import createEmotionCache from "../src/utils/createEmotionCache";
import { createAppTheme } from "../styles/theme";
import { store } from "../src/redux/store";
import { useSelector } from "react-redux";
import "../styles/globals.css";

// Client-side cache, shared for the whole session of the user
const clientSideEmotionCache = createEmotionCache();

// AppWrapper to handle theme
function AppWrapper({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps,
}) {
  // We need to use the AppWrapper because custom hooks can't be used directly in _app.js
  return (
    <Provider store={store}>
      <AppContent
        Component={Component}
        emotionCache={emotionCache}
        pageProps={pageProps}
      />
    </Provider>
  );
}

// AppContent to handle theme from Redux
function AppContent({ Component, emotionCache, pageProps }) {
  const themeMode = useSelector((state) => state.theme.mode);
  const [theme, setTheme] = useState(createAppTheme("dark")); // Default dark
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Set mounted to true when component mounts
    setMounted(true);

    // Update the theme based on Redux state
    setTheme(createAppTheme(themeMode));
  }, [themeMode]);

  // Prevent rendering during SSR to avoid theme mismatch
  if (!mounted) {
    return <div style={{ visibility: "hidden" }} />;
  }

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <title>Debojit Mitra | Portfolio</title>
        <meta
          name="description"
          content="Debojit Mitra - Full Stack & Android Developer Portfolio"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  );
}

export default AppWrapper;
