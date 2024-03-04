import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import md5 from "md5";

import { Pagination } from "../../components";

import { getTimestamp } from "../../utils";

import styles from "./Products.module.scss";

export const Products = () => {
  const [itemsList, setItemsList] = useState([]);

  const PASSWORD = `Valantis_${getTimestamp()}`;
  const HASH = md5(PASSWORD);

  const getIds = async () => {
    try {
      const res = await fetch("http://api.valantis.store:40000/", {
        method: "POST",
        body: JSON.stringify({
          action: "get_ids",
          params: { offset: 0, limit: 10 },
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

  const getStore = async () => {
    try {
      const ids = await getIds();
      const items = await getItemsByIds(ids);
      setItemsList(items);
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

  return (
    <>
      <div className={styles.root}>
        {itemsList.length
          ? itemsList.map((item, i) => (
              <Link to={`/products/${item.id}`} key={i}>
                <div className={styles.root__product}>
                  <img
                    className={styles.root__product_img}
                    src="https://valantis.store/_next/image?url=https%3A%2F%2Fvalantis.store%2Fmedia%2Fproducts%2F356a192b79%2Fkolco-iisus.png&w=384&q=75"
                    alt="ring"
                  />
                  <div className={styles.root__product__content}>
                    <p className={styles.root__product_name}>{item.product}</p>
                    <p className={styles.root__product_price}>
                      {item.price} {"₽"}
                    </p>
                  </div>
                </div>
              </Link>
            ))
          : "LOADING"}
      </div>
      <Pagination />
    </>
  );
};
