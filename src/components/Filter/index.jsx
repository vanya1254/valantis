import { useState, useEffect } from "react";

import { getData } from "../../api/fetch";
import { URLS_API, ACTIONS, PARAMS } from "../../api/constantsKeys";

import styles from "./Filter.module.scss";

export const Filter = () => {
  const [fieldsList, setFieldsList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData(
        URLS_API.api1,
        ACTIONS.getFields,
        PARAMS.getFields("product", 0, 50)
      );

      setFieldsList(data);
    };
    fetchData();
  }, []);

  return fieldsList !== undefined && fieldsList.length ? (
    <div className={styles.root}>
      <form action="">
        <input id="search" type="text" placeholder="Search..." />
        <button>search</button>
      </form>
    </div>
  ) : (
    "LOADING"
  );
};
