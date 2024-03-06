import { useState, useEffect } from "react";

import { getData } from "../../api/fetch";
import { URLS_API, ACTIONS, PARAMS } from "../../api/constantsKeys";

import styles from "./Filter.module.scss";

export const Filter = () => {
  const [itemsList, setItemsList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData(
        URLS_API.api1,
        ACTIONS.filter,
        PARAMS.filter({ product: "" })
      );

      const items = await getData(URLS_API.api1, ACTIONS.getItems, {
        ...PARAMS.getItems([...data]),
      });

      setItemsList(data);
    };
    fetchData();
  }, []);

  return itemsList !== undefined && itemsList.length ? (
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
