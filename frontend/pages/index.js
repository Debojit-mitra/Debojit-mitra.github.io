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
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
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
