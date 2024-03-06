import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import { Filter, Pagination, Loading } from "../../components";

import { getData } from "../../api/fetch";
import { URLS_API, ACTIONS, PARAMS } from "../../api/constantsKeys";
import { isEmptyObj } from "../../utils";
import { LIMIT } from "../../constants";

import styles from "./Products.module.scss";

export const Products = () => {
  const pageParams = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (Number.isNaN(Number(pageParams.pageNumber))) {
      navigate("/products");
    }
  }, []);

  const [itemsList, setItemsList] = useState([]);
  const [pageNumber, setPageNumber] = useState(
    isEmptyObj(pageParams) ? "1" : pageParams.pageNumber
  );

  const idsParamsObj = { offset: 50 * (Number(pageNumber) - 1), limit: LIMIT };
  const cleanItemsList = [];

  const getProducts = async () => {
    try {
      const ids = await getData(
        URLS_API.api1,
        ACTIONS.getIds,
        PARAMS.getIds(idsParamsObj.offset, idsParamsObj.limit)
      );
      const items = await getData(
        URLS_API.api1,
        ACTIONS.getItems,
        PARAMS.getItems(ids)
      );

      setItemsList(items);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getProducts();
    };
    fetchData();
  }, [pageParams]);

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
        <Filter />
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
