import { createRequester, BODY_TYPE } from "./utils";
import { clientInit } from "./responseHandler";

/**
 * Utility messages
 */
export interface DqueueResponseHeader {
  debug_msg?: string;
}

export const DEFAULT_BASE_URL = "";

type Options = {
  fetch?: (input: RequestInfo, init?: RequestInit) => Promise<any>;
  requestInit?: RequestInit | (() => RequestInit);
  transformRequest?: <T = any>(
    path: string,
    method: string,
    body: any,
    bodyType?: BODY_TYPE,
    requestInit?: RequestInit
  ) => [T, RequestInit | undefined];
};

export type TestApiRequest = {};

export type TestApiResponse = {
  data?: TestApiResponseData;
};

export type TestApiResponseData = {
  name?: string;
};

export interface LoginUserRequest {
  email_address?: string;
  password?: string;
}

export interface LoginUserResponse {
  debug_msg?: string;
  user: User | null;
}

export interface LogoutRequest {}

export interface LogoutResponse {
  debug_msg?: string;
}

export interface GetUserRequest {};

export interface GetUserResponse {
  debug_msg?: string;
  user: User | null;
};

export interface User {
  id?: number;
  username?: string;
  email_address?: string;
  first_name?: string;
  last_name?: string;
};

export interface CreateUserRequest {
  email_address?: string;
  password?: string;
  username?: string;
  first_name?: string;
  last_name?: string;
}

export interface CreateUserResponse {
  debug_msg?: string;
  user: User | null;
}

export function getApis(baseUrl = DEFAULT_BASE_URL, opts?: Options) {
  const _request = createRequester({
    request: opts?.fetch,
    requestInit: opts?.requestInit,
  });
  let request = _request;
  if (opts?.transformRequest) {
    request = <
      Req extends { [key: string]: any } | null | undefined | void,
      Res,
      Rej = any
    >(
      path: string,
      method: string,
      body: any,
      bodyType?: BODY_TYPE,
      requestInit?: RequestInit
    ) => {
      /* Hack to pass TS compilier */
      const [_body, _requestInit] = opts?.transformRequest
        ? opts.transformRequest<Req>(path, method, body, bodyType, requestInit)
        : [body, requestInit];
      return _request<Req, Res, Rej>(
        path,
        method,
        _body,
        bodyType,
        _requestInit
      );
    };
  }

  const clients = {
    testApi: {
      path: "/test_api",
      post:
        /**
         * POST /test_api
         */
        (data: TestApiRequest, requestInit?: RequestInit) => {
          const path = "/test_api";
          return request<TestApiRequest, TestApiResponse>(
            baseUrl + path,
            "post",
            data,
            BODY_TYPE.json,
            requestInit
          );
        },
    },
    login: {
      path: "/api/user/login",
      post: (data: LoginUserRequest, requestInit?: RequestInit) => {
        const path = "/api/user/login";

        return request<LoginUserRequest, LoginUserResponse>(
          baseUrl + path,
          "post",
          data,
          BODY_TYPE.json,
          requestInit
        );
      },
    },
    getUser: {
      path: "/api/user/get",
      post: (data: GetUserRequest, requestInit?: RequestInit) => {
        const path = "/api/user/get";

        return request<GetUserRequest, GetUserResponse>(
          baseUrl + path,
          "post",
          data,
          BODY_TYPE.json,
          requestInit
        );
      },
    },
    createUser: {
      path: "/api/user/create",
      post: (data: CreateUserRequest, requestInit?: RequestInit) => {
        const path = "/api/user/create";

        return request<CreateUserRequest, CreateUserResponse>(
          baseUrl + path,
          "post",
          data,
          BODY_TYPE.json,
          requestInit
        );
      },
    },
    logout: {
      path: "/api/user/logout",
      post: (data: LogoutRequest, requestInit?: RequestInit) => {
        const path = "/api/user/logout";

        return request<LogoutRequest, LogoutResponse>(
          baseUrl + path,
          "post",
          data,
          BODY_TYPE.json,
          requestInit
        );
      }
    }
  };
  return clients;
}

export const request = getApis(DEFAULT_BASE_URL, clientInit);
