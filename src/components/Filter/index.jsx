import { useRef, useState } from "react";
import { useHistory } from "react-router-dom";

import styles from "./Filter.module.scss";

export const Filter = ({ brands, filters, setFilters, isFiltered }) => {
  const searchRef = useRef();
  const history = useHistory();
  const [sliderValue, setSliderValue] = useState();

  const handleSliderChange = (event) => {
    if (
      !Number.isNaN(Number(event.target.value)) &&
      Number(event.target.value) !== 0
    ) {
      setSliderValue(event.target.value);
    } else {
      setSliderValue("");
    }
  };

  const onClickSearch = (e) => {
    e.preventDefault();
    const searchValue = searchRef.current.value.trim();

    if (searchValue !== "") {
      setFilters((prev) => {
        prev.product = searchValue;
        return { ...prev };
      });
      isFiltered.current = true;
    }
  };

  const onClickSubmit = (e) => {
    if (sliderValue !== 0) {
      setFilters((prev) => {
        prev.price = Number(sliderValue);

        return { ...prev };
      });
      isFiltered.current = true;
    }
  };

  const onClickBrand = (e) => {
    const brandValue = e.currentTarget.innerHTML.replace("&amp;", "&");

    if (brandValue === "ALL") {
      setFilters((prev) => {
        for (const key in prev) {
          prev[key] = "";
        }

        return { ...prev };
      });
      history.push("/valantis/products/page/1");
    } else if (brandValue !== null) {
      setFilters((prev) => {
        prev.brand = brandValue;

        return { ...prev };
      });
      isFiltered.current = true;
    }
  };

  return (
    <div className={styles.root}>
      <div className={styles.root__top}>
        <div className={styles.root__price}>
          <input
            type="text"
            value={sliderValue || ""}
            onChange={handleSliderChange}
            placeholder={"Price... Ex: 10000"}
          />
          ₽
          {/* <div className={styles.root__price__submit}>
            <p>Value: {sliderValue} ₽</p> */}
          <button onClick={onClickSubmit}>submit</button>
          {/* </div> */}
        </div>
        <form className={styles.root__search}>
          <input
            ref={searchRef}
            id="search"
            type="text"
            placeholder="Search..."
          />
          <button onClick={onClickSearch}>search</button>
        </form>
      </div>
      <div className={styles.root__brands}>
        <button
          onClick={onClickBrand}
          className={`${styles.root__brands_btn} ${
            filters.brand ? "" : "selected"
          }`}
        >
          {"ALL"}
        </button>
        {brands.map((brand, i) => (
          <button
            onClick={onClickBrand}
            key={i}
            className={`${styles.root__brands_btn} ${
              filters.brand === brand ? "selected" : ""
            }`}
          >
            {brand}
          </button>
        ))}
      </div>
    </div>
  );
};
