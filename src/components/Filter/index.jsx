import { useRef, useState } from "react";

import styles from "./Filter.module.scss";

export const Filter = ({ brands, filters, setFilters, isFiltered }) => {
  const searchRef = useRef();
  const [sliderValue, setSliderValue] = useState(0);

  const handleSliderChange = (event) => {
    setSliderValue(event.target.value);
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

    if (brandValue !== null) {
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
            type="range"
            min={0}
            max={1000000}
            value={sliderValue}
            onChange={handleSliderChange}
          />
          <div className={styles.root__price__submit}>
            <p>Value: {sliderValue} ₽</p>
            <button onClick={onClickSubmit}>submit</button>
          </div>
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
        {brands.map((brand, i) => (
          <button
            onClick={onClickBrand}
            key={i}
            className={`${styles.root__brands_btn} ${
              filters.brand == brand ? "selected" : ""
            }`}
          >
            {brand}
          </button>
        ))}
      </div>
    </div>
  );
};
