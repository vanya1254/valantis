import { hash } from "./dynamicKeys";

export const getItemsByIds = async (ids = []) => {
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

export const getIds = async (paramsObject = { offset: 0, limit: 0 }) => {
  try {
    const res = await fetch("http://api.valantis.store:40000/", {
      method: "POST",
      body: JSON.stringify({
        action: "get_ids",
        params: paramsObject,
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

export const getFields = async () => {
  try {
    const res = await fetch("http://api.valantis.store:40000/", {
      method: "POST",
      body: JSON.stringify({
        action: "get_fields",
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
