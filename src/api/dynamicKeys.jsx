import md5 from "md5";

import { getTimestamp } from "../utils/index";

export const password = `Valantis_${getTimestamp()}`;
export const hash = md5(password);
