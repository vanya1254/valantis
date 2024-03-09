import React from "react";
import { Link } from "react-router-dom";

import styles from "./Home.module.scss";

export const Home = () => {
  return (
    <div className={styles.root}>
      <h1 className={styles.root_title}>Welcome to test task Valantis page</h1>
      <Link className={styles.root_link} to={"/valantis/products/page/1"}>
        Products
      </Link>
    </div>
  );
};
