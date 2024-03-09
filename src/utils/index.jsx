export const getTimestamp = () => {
  return `${new Date().toISOString().slice(0, 10).replace(/-/g, "")}`;
};

export const isEmptyObj = (obj) => {
  for (const prop in obj) {
    if (Object.hasOwn(obj, prop)) {
      return false;
    }
  }
  return true;
};

export const getFiltersWithoutEmpty = (filters) => {
  const cleanFilters = {};

  for (const filter in filters) {
    if (filters[filter] && filters[filter] !== "ALL") {
      cleanFilters[filter] = filters[filter];
    }
  }

  return cleanFilters;
};

export const curPageItems = (items, start, end) => {
  return [...items.slice(start, end)];
};

export const addToArrayUniqueItem = (item, array) => {
  const i = array.findIndex((x) => x.id === item.id);
  if (i <= -1) {
    array.push({ ...item });
  }
};

export const getArrayOfDuplicates = (array) => {
  const result = [];
  const seen = {};

  for (const item of array) {
    if (seen[item]) {
      result.push(item);
    } else {
      seen[item] = true;
    }
  }

  return result;
};
