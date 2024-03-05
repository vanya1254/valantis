import React from "react";

import ring from "../../assets/img/ring_icon.png";

import styles from "./Loading.module.scss";

export const Loading = () => {
  return (
    <div className={styles.root}>
      <div className={styles.root__content}>
        <img src={ring} alt="ring loading" />
        <p className={styles.root__content_text}>Loading ...</p>
      </div>
    </div>
  );
};
