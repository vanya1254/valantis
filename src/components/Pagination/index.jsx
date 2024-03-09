import React from "react";
import { Link } from "react-router-dom";

import styles from "./Pagination.module.scss";

export const Pagination = ({ currentPage, setCurrentPage, isLastPage }) => {
  const onClickPrevPage = () => {
    setCurrentPage((prev) => (prev === "1" ? prev : `${Number(prev) - 1}`));
    window.scrollTo(0, 0);
  };

  const onClickNextPage = () => {
    setCurrentPage((prev) => `${Number(prev) + 1}`);
    window.scrollTo(0, 0);
  };

  return (
    <div className={styles.root}>
      <ul className={styles.root__nav}>
        <li
          className={`${styles.root__nav_link} ${
            Number(currentPage) === 1 ? "disabled" : ""
          }`}
        >
          <Link
            onClick={onClickPrevPage}
            to={`/valantis/products/page/${Number(currentPage) - 1}`}
          >{`<`}</Link>
        </li>
        <li>{currentPage}</li>
        <li
          className={`${styles.root__nav_link} ${isLastPage ? "disabled" : ""}`}
        >
          <Link
            onClick={onClickNextPage}
            to={`/valantis/products/page/${Number(currentPage) + 1}`}
          >{`>`}</Link>
        </li>
      </ul>
    </div>
  );
};
