import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { NotFound } from "../NotFound";
import { Loading } from "../../components";

import { getData } from "../../api/fetch";
import { URLS_API, ACTIONS, PARAMS } from "../../api/constantsKeys";
import { isEmptyObj } from "../../utils";

import styles from "./Product.module.scss";

export const Product = () => {
  const params = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData(
        URLS_API.api1,
        ACTIONS.getItems,
        PARAMS.getItems([params.id])
      );
      const product =
        (await data) !== undefined && data.length ? data[0] : null;

      setProduct(product);
    };

    fetchData();
  }, [params]);

  return product !== undefined && !isEmptyObj(product) ? (
    <div className={styles.root}>
      <div className={styles.root__product}>
        <img
          className={styles.root__product_img}
          src="https://valantis.store/_next/image?url=https%3A%2F%2Fvalantis.store%2Fmedia%2Fproducts%2F356a192b79%2Fkolco-iisus.png&w=384&q=75"
          alt="ring"
        />
        <div className={styles.root__product__content}>
          <p className={styles.root__product_name}>{product.product}</p>
          <p className={styles.root__product_price}>
            {product.price} {"₽"}
          </p>
        </div>
      </div>
    </div>
  ) : product === null ? (
    <NotFound />
  ) : (
    <Loading />
  );
};
