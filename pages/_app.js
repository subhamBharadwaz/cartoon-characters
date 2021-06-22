import Head from "next/head";
import { useState } from "react";
import "../styles/globals.css";
import { motion, AnimatePresence } from "framer-motion";
import NProgress from "nprogress";
import Router from "next/router";

import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme, GlobalStyles } from "../ThemeConfig";

Router.onRouteChangeStart = (url) => {
  NProgress.start();
};

Router.onRouteChangeComplete = () => NProgress.done();

Router.onRouteChangeError = () => NProgress.done();
NProgress.configure({ showSpinner: false });

function MyApp({ Component, pageProps, router }) {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    theme == "light" ? setTheme("dark") : setTheme("light");
  };
  return (
    <>
      <Head>
        <link rel="stylesheet" href="/nprogress.css" />
      </Head>

      <AnimatePresence>
        <motion.div
          key={router.route}
          initial="pageInitial"
          animate="pageAnimate"
          exit="pageExit"
          variants={{
            pageInitial: {
              opacity: 0,
            },
            pageAnimate: {
              opacity: 1,
            },
            pageExit: {
              backgroundColor: `white`,
              filter: `invert()`,
              opacity: 0,
            },
          }}
        >
          <ThemeProvider theme={theme == "light" ? lightTheme : darkTheme}>
            <GlobalStyles />
            <button className="btn theme-toggler" onClick={toggleTheme}>
              Switch theme
            </button>
            <Component {...pageProps} />
          </ThemeProvider>
        </motion.div>
      </AnimatePresence>
    </>
  );
}

export default MyApp;
