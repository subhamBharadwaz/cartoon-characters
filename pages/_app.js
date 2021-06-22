import Head from "next/head";
import "../styles/globals.css";
import { motion, AnimatePresence } from "framer-motion";
import NProgress from "nprogress";
import Router from "next/router";

Router.events.on("routeChangeStart", (url) => {
  console.log(`Loading: ${url}`);
  NProgress.start();
});
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps, router }) {
  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css"
        />
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
          <Component {...pageProps} />
        </motion.div>
      </AnimatePresence>
    </>
  );
}

export default MyApp;
