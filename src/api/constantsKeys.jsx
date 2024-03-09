export const URLS_API = {
  api1: "http://api.valantis.store:41000/",
  api2: "https://api.valantis.store:40000/",
};

export const ACTIONS = {
  getIds: "get_ids",
  getItems: "get_items",
  getFields: "get_fields",
  filter: "filter",
};

export const PARAMS = {
  getIds(offsetValue = 0, limitValue = 0) {
    return { offset: offsetValue, limit: limitValue };
  },
  getItems(arrayIds = []) {
    return { ids: [...arrayIds] };
  },
  getFields(fieldName = "", offsetValue = 0, limitValue = 0) {
    return { field: fieldName, offset: offsetValue, limit: limitValue };
  },
  filter(field = {}) {
    return { ...field };
  },
};
