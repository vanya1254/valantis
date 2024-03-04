import React, { useEffect } from "react";
import md5 from "md5";

import styles from "./Products.module.scss";
import { act } from "react-dom/test-utils";

export const Products = () => {
  const getTimestamp = () => {
    return `${new Date().toISOString().slice(0, 10).replace(/-/g, "")}`;
  };
  const PASSWORD = `Valantis_${getTimestamp()}`;
  const HASH = md5(PASSWORD);

  const getIds = async () => {
    try {
      const res = await fetch("http://api.valantis.store:40000/", {
        method: "POST",
        body: JSON.stringify({
          action: "get_ids",
          params: { offset: 10, limit: 3 },
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          "X-Auth": HASH,
        },
      });

      const { result } = await res.json();

      return result;
    } catch (error) {}
  };

  const getItemsByIds = async (ids) => {
    try {
      const res = await fetch("http://api.valantis.store:40000/", {
        method: "POST",
        body: JSON.stringify({
          action: "get_items",
          params: { ids: [...ids] },
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          "X-Auth": HASH,
        },
      });

      const { result } = await res.json();

      return result;
    } catch (error) {}
  };

  let itemsList = [];

  const getStore = async () => {
    try {
      const ids = await getIds();
      const items = await getItemsByIds(ids);
      itemsList = items;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getStore();
    };
    fetchData();
  }, []);

  return <div className={styles.root}>{itemsList}</div>;
};
