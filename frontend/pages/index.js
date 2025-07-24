import { useEffect } from "react";
import Head from "next/head";
import Layout from "../src/components/layout/Layout";
import Hero from "../src/components/sections/Hero";
import About from "../src/components/sections/About";
import Projects from "../src/components/sections/Projects";
import Contact from "../src/components/sections/Contact";
import LoadingScreen from "../src/components/ui/LoadingScreen";
import ErrorScreen from "../src/components/ui/ErrorScreen";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPortfolioData,
  selectLoading,
  selectError,
  selectOwnerData,
} from "../src/redux/reducers/portfolioSlice";

export default function Home() {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const ownerData = useSelector(selectOwnerData);

  useEffect(() => {
    // Fetch all data when component mounts
    dispatch(fetchPortfolioData());
  }, [dispatch]);

  // Dynamically set title based on owner data
  const title = ownerData
    ? `${ownerData.name} | ${ownerData.title || "Portfolio"}`
    : "Debojit Mitra | Full Stack & Android Developer";

  const description = ownerData?.description
    ? ownerData.description
    : "Portfolio of Debojit Mitra, a Full Stack and Android developer with expertise in React, Next.js, Flutter, and more.";

  return (
    <>
      <Head>
        <meta
          name="google-site-verification"
          content="M3TQ1wISaSnjD-_KNN4ydO1kN2hUqhbuo5KdrOMdCmU"
        />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={`${title}`} />
        <meta
          property="og:description"
          content="See my GitHub work and projects."
        />
        <meta property="og:url" content="https://debojit-mitra.github.io/" />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {loading && <LoadingScreen />}
      {error && <ErrorScreen error={error} />}

      {!loading && !error && (
        <Layout>
          <Hero />
          <About />
          <Projects />
          <Contact />
        </Layout>
      )}
    </>
  );
}
