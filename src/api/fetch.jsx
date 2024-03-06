import { hash } from "./dynamicKeys";

export const getData = async (urlApi, action, params) => {
  try {
    const res = await fetch(urlApi, {
      method: "POST",
      body: JSON.stringify({
        action: action,
        params,
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
