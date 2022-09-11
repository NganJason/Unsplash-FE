import * as uuid from "uuid";
import { responseHandler } from "./responseHandler";
import {
  getApis as clientApis,
} from "./client";

const errorMessages = {};

export const unsplashRequest = clientApis(undefined, {
  fetch: responseHandler(
    fetch,
    {...errorMessages }
  ),
  requestInit: () => ({
    headers: {
      "Request-Id": uuid.v4(),
    },
    credentials: "include"
  }),
});