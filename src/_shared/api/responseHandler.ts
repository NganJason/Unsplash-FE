import * as uuid from "uuid";
// import message from "antd/es/message";
import { ApiError } from "./utils";

const errorMessages = {
  /** @todo add your <error code>: <error message> mapping here */
};
const DEFAULT_ERROR_MSG = "Unknown error happened!";

const GATEWAY_ERRORS = {
};

export function responseHandler(
  requestFunc = fetch,
  errorMessages = {} as { [key: number]: string },
  errorMessageHandler?: (err: Error) => void
) {
  return (...args: [RequestInfo, RequestInit | undefined]) =>
    requestFunc(...args)
      .then(async (res) => {
        // Check whether response status is valid
        const resData = await res.json();
        if (res.status === 401) {
          let path = window.location.href
          if (!path.includes("login=true")) {
            window.location.href = window.location.href + "?login=true";
          }
        }

        if (res.status >= 400) {
          if (resData.debug_msg) {
            throw new ApiError(`${res.status} ${resData.debug_msg}`);
          } else {
            throw new ApiError(`${res.status} ${res.statusText}`);
          }
        }
        
        // Handle redirection
        if (res.status === 302) {
          window.location.href = resData.data.redirect_url;
        }
        return resData;
      })
      .then((res) => {
        // Handle HTTP gateway error code
        if (res.error_code) {
          throw new ApiError(
            res.debug_msg ||
              errorMessages[res.error_code as keyof typeof errorMessages] ||
              GATEWAY_ERRORS[res.error_code as keyof typeof GATEWAY_ERRORS] ||
              DEFAULT_ERROR_MSG
          );
        }
        // Handle SPEX error code
        if (res.sp_error_code) {
          if (res.data?.header?.debug_msg?.length > 0) {
            throw new ApiError(res.data.header.debug_msg);
          } else {
            throw new ApiError(
              errorMessages[res.sp_error_code as keyof typeof errorMessages] ||
                DEFAULT_ERROR_MSG
            );
          }
        }
        return res;
      })
      .catch((err) => {
        if (typeof errorMessageHandler === "function") {
          errorMessageHandler(err);
        } else {
          // message.error(err.message);
        }
        throw err;
      });
}

/**
 * REQUIRED for initializing the generated API clients
 */
export const clientInit = {
  fetch: responseHandler(fetch, errorMessages),
  requestInit: () => ({
    headers: {
      // Set a global region header
      Region: ((window as any) && (window as any).__LOCALE__) || "SG",
      // Set a request ID
      "Request-Id": uuid.v4(),
    },
  }),
};
