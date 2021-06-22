import Head from "next/head";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";

const defaultEndpoint = `https://rickandmortyapi.com/api/character/`;

export async function getServerSideProps() {
  const res = await fetch(defaultEndpoint);
  const data = await res.json();
  return {
    props: {
      data,
    },
  };
}

export default function Home({ data }) {
  const { info, results: defaultResults = [] } = data;
  const [results, updateResults] = useState(defaultResults);

  const [page, updatePage] = useState({
    ...info,
    current: defaultEndpoint,
  });

  const { current } = page;

  useEffect(() => {
    if (current === defaultEndpoint) return;

    async function request() {
      const res = await fetch(current);
      const nextData = await res.json();

      updatePage({
        current,
        ...nextData.info,
      });

      if (!nextData.info?.prev) {
        updateResults(nextData.results);
        return;
      }

      updateResults((prev) => {
        return [...prev, ...nextData.results];
      });
    }

    request();
  }, [current]);

  function handleLoadMore() {
    updatePage((prev) => {
      return {
        ...prev,
        current: page?.next,
      };
    });
  }

  function handleSubmitSearch(e) {
    e.preventDefault();
    const { currentTarget = {} } = e;
    const fields = Array.from(currentTarget?.elements);
    const fieldQuery = fields.find((field) => field.name === "query");

    const value = fieldQuery.value || "";
    const endpoint = `https://rickandmortyapi.com/api/character/?name=${value}`;

    updatePage({
      current: endpoint,
    });
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {
              scale: 0.8,
              opacity: 0,
            },
            visible: {
              scale: 1,
              opacity: 1,
              transition: {
                delay: 0.4,
              },
            },
          }}
        >
          <h1 className={styles.title}>Wubba Lubba Dub Dub!</h1>
        </motion.div>
        <p className={styles.description}>Rick and Morty Character Wiki</p>
        <form onSubmit={handleSubmitSearch} className={styles.search}>
          <input type="search" name="query" />
          <button className="btn">Search</button>
        </form>

        <ul className={styles.grid}>
          {results.map((result) => {
            const { image, id, name } = result;
            return (
              <motion.li
                whileHover={{
                  position: "relative",
                  zIndex: 1,

                  scale: [1, 1.2, 1.1],
                  rotate: [0, 10, -10, 0],
                  transition: {
                    duration: 0.2,
                  },
                  filter: [
                    "hue-rotate(0) contrast(100%)",
                    "hue-rotate(360deg) contrast(200%)",
                    "hue-rotate(45deg) contrast(300%)",
                    "hue-rotate(0) contrast(100%)",
                  ],
                }}
                key={id}
                className={styles.card}
              >
                <Link href="/character/[id]" as={`/character/${id}`}>
                  <a>
                    <Image
                      src={image}
                      alt={`${name} Thumbnail`}
                      width={300}
                      height={300}
                    />
                    <h3>{name}</h3>
                  </a>
                </Link>
              </motion.li>
            );
          })}
        </ul>
        <p>
          <button className="btn" onClick={handleLoadMore}>
            Load More
          </button>
        </p>
      </main>
    </div>
  );
}
