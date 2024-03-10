import React, { useEffect, useState, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import { Filter, Pagination, Loading, Skeletons } from "../../components";

import { getData } from "../../api/fetch";
import { URLS_API, ACTIONS, PARAMS } from "../../api/constantsKeys";
import {
  isEmptyObj,
  getFiltersWithoutEmpty,
  addToArrayUniqueItem,
  getArrayOfDuplicates,
} from "../../utils";
import { LIMIT } from "../../constants";

import styles from "./Products.module.scss";

export const getBrands = async () => {
  try {
    const data = await getData(URLS_API.api1, ACTIONS.getFields, {
      field: "brand",
    });

    const result = [...new Set(await data.filter((brand) => brand !== null))];

    return result;
  } catch (error) {}
};

export const Products = () => {
  const isFirstLoading = useRef(true);
  const isFiltered = useRef(false);
  const pageParams = useParams();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [isItemsLoading, setIsItemsLoading] = useState(true);
  const [isLastPage, setIsLastPage] = useState(false);
  const [itemsList, setItemsList] = useState([]);
  const [filters, setFilters] = useState({});
  const [brands, setBrands] = useState([]);
  const [pageNumber, setPageNumber] = useState(
    isEmptyObj(pageParams) ? "1" : pageParams.pageNumber
  );

  const idsParamsObj = {
    offset: LIMIT * (Number(pageNumber) - 1),
    limit: LIMIT,
  };

  const setFiltersByFields = (fields) => {
    setFilters((prev) => {
      const updatedFilters = {};
      fields.forEach((field) => {
        updatedFilters[field] = prev ? prev[field] || "" : "";
      });

      return updatedFilters;
    });
  };

  const getStore = async () => {
    try {
      const dataFields = await getData(URLS_API.api1, ACTIONS.getFields);

      const dataBrands = await getBrands();

      const data = await getData(
        URLS_API.api1,
        ACTIONS.getIds,
        PARAMS.getIds(idsParamsObj.offset, idsParamsObj.limit)
      );

      const items = await getData(URLS_API.api1, ACTIONS.getItems, {
        ...PARAMS.getItems(await data),
      });

      setFiltersByFields(await dataFields);
      setBrands(dataBrands);
      setItemsList(await items);

      if ((await items.length) < LIMIT) {
        setIsLastPage(true);
      } else {
        setIsLastPage(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (Number.isNaN(Number(pageParams.pageNumber))) {
      navigate("/valantis/products/page/1");
    }
    if (!isFiltered.current && isFirstLoading.current) {
      const fetchStore = async () => {
        await getStore();

        setIsLoading(false);
      };

      fetchStore();

      isFirstLoading.current = false;
    }
  }, []);

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

      setItemsList(await items);

      if ((await items.length) < LIMIT) {
        setIsLastPage(true);
      } else {
        setIsLastPage(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!isFirstLoading.current && !isFiltered.current) {
      const fetchProducts = async () => {
        setIsItemsLoading(true);

        await getProducts();

        setIsItemsLoading(false);
      };
      fetchProducts();
    }
  }, [pageParams, filters]);

  const getIdsByFilters = async (currentFilters) => {
    let data = [];

    for (const filter in currentFilters) {
      const filterValue = Number.isNaN(Number(currentFilters[filter]))
        ? `${currentFilters[filter]}`
        : currentFilters[filter];

      const dataByFilter = await getData(
        URLS_API.api1,
        ACTIONS.filter,
        PARAMS.filter({ [filter]: filterValue })
      );

      data.push(...dataByFilter);
    }

    const filteredData =
      Object.entries(currentFilters).length > 1
        ? getArrayOfDuplicates(data)
        : data;

    return filteredData;
  };

  const getFilteredStore = async () => {
    const currentFilters = getFiltersWithoutEmpty(filters);

    if (Object.keys(currentFilters).length) {
      const data = await getIdsByFilters(currentFilters);

      const items = await getData(URLS_API.api1, ACTIONS.getItems, {
        ...PARAMS.getItems(data),
      });

      setItemsList(await items);
    }
  };

  useEffect(() => {
    if (isFiltered.current) {
      const fetchFilteredData = async () => {
        setIsItemsLoading(true);

        await getFilteredStore();

        setIsLastPage(true);
        setPageNumber("1");
        window.history.pushState("", "", `/valantis/products/page/1`);
        setIsItemsLoading(false);
      };

      fetchFilteredData();
      isFiltered.current = false;
    }
  }, [filters]);

  if (!isLoading) {
    const cleanItemsList = [];
    itemsList.forEach((item) => addToArrayUniqueItem(item, cleanItemsList));

    return (
      <>
        <Filter
          brands={brands}
          filters={filters}
          setFilters={setFilters}
          isFiltered={isFiltered}
        />
        <div className={styles.root}>
          {isItemsLoading
            ? [...new Array(10)].map((_, i) => <Skeletons key={i} />)
            : cleanItemsList.map((item) => (
                <Link
                  className={styles.root__product_hover}
                  to={`/valantis/products/${item.id}`}
                  key={item.id}
                >
                  <div className={styles.root__product}>
                    <img
                      className={styles.root__product_img}
                      src="https://valantis.store/_next/image?url=https%3A%2F%2Fvalantis.store%2Fmedia%2Fproducts%2F356a192b79%2Fkolco-iisus.png&w=384&q=75"
                      alt="ring"
                    />
                    <div className={styles.root__product__content}>
                      <p className={styles.root__product_name}>
                        {item.brand && item.brand} {item.product}
                      </p>
                      <p className={styles.root__product_price}>
                        {item.price} {"₽"}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
        </div>
        <Pagination
          currentPage={pageNumber}
          setCurrentPage={setPageNumber}
          isLastPage={isLastPage}
        />
      </>
    );
  } else {
    return <Loading />;
  }
};
