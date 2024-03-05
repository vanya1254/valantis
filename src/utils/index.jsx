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
