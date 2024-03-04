import React from "react";
import { Link } from "react-router-dom";

import styles from "./NotFound.module.scss";

export const NotFound = () => {
  return (
    <div className={styles.root}>
      <h1 className={styles.root_title}>The page was not found</h1>
      <div className={styles.root__links}>
        <Link className={styles.root_link} to={"/"}>
          Home
        </Link>
        <Link className={styles.root_link} to={"/products"}>
          Products
        </Link>
      </div>
    </div>
  );
};
