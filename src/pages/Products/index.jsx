import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import md5 from "md5";

import { Pagination, Loading } from "../../components";

import { getTimestamp, isEmptyObj } from "../../utils";
import { LIMIT } from "../../constants";

import styles from "./Products.module.scss";

export const password = `Valantis_${getTimestamp()}`;
export const hash = md5(password);

export const getItemsByIds = async (ids) => {
  try {
    const res = await fetch("http://api.valantis.store:40000/", {
      method: "POST",
      body: JSON.stringify({
        action: "get_items",
        params: { ids: [...ids] },
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "X-Auth": hash,
      },
    });

    const { result } = await res.json();

    return result;
  } catch (error) {
    if (error.status !== undefined) {
      console.error(error.status);
    }
  }
};

export const Products = () => {
  const params = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (Number.isNaN(Number(params.pageNumber))) {
      navigate("/products");
    }
  }, []);

  const [itemsList, setItemsList] = useState([]);
  const [pageNumber, setPageNumber] = useState(
    isEmptyObj(params) ? "1" : params.pageNumber
  );

  const cleanItemsList = [];

  const getIds = async () => {
    try {
      const res = await fetch("http://api.valantis.store:40000/", {
        method: "POST",
        body: JSON.stringify({
          action: "get_ids",
          params: { offset: 50 * (Number(pageNumber) - 1), limit: LIMIT },
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          "X-Auth": hash,
        },
      });

      const { result } = await res.json();

      return result;
    } catch (error) {
      if (error.status !== undefined) {
        console.error(error.status);
      }
    }
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
  }, [params]);

  const checkItem = (item, array) => {
    const i = array.findIndex((x) => x.id === item.id);
    if (i <= -1) {
      array.push({ ...item });
    }
  };

  if (itemsList !== undefined && itemsList.length) {
    itemsList.forEach((item) => checkItem(item, cleanItemsList));
    return (
      <>
        <div className={styles.root}>
          {cleanItemsList.map((item) => (
            <Link to={`/products/${item.id}`} key={item.id}>
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
          ))}
        </div>
        <Pagination currentPage={pageNumber} setCurrentPage={setPageNumber} />
      </>
    );
  } else {
    return <Loading />;
  }
};
