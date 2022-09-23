import { createRequester, BODY_TYPE } from "./utils";
import { clientInit } from "./responseHandler";

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

export interface VerifyUserRequest {};

export interface VerifyUserResponse {
  debug_msg?: string;
  user: User | null;
};

export interface User {
  id?: number;
  username?: string;
  email_address?: string;
  first_name?: string;
  last_name?: string;
  profile_url?: string;
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

export interface GetUserRequest {
  user_id?: number;
}

export interface GetUserResponse {
  debug_msg?: string;
  user: User | null;
}

export interface GetImagesRequest {
  user_id?: number;
  page_size?: number;
  cursor?: string | null;
}

export interface GetImagesResponse {
  debug_msg?: string;
  images?: Image[];
  next_cursor?: string;
}

export interface GetUserLikesRequest {
  user_id?: number;
  cursor?: string | null;
  page_size?: number;
}

export interface GetUserLikesResponse {
  debug_msg?: string;
  images?: Image[];
  next_cursor?: string;
}

export interface Image {
  id?: number;
  user?: User;
  url?: string;
  desc?: string;
  likes?: number;
  downloads?: number;
}

export interface AddDeltaImageRequest {
  image_id?: number;
  delta_image?: DeltaImage;
}

export interface AddDeltaImageResponse {
  debug_msg?: string;
  image?: Image;
}

export interface DeltaImage {
  likes?: number;
  downloads?: number;
}

export interface UploadImageRequest {
  desc?: string;
}

export interface UploadImageResponse {
  debug_msg?: string;
  image?: Image;
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
    verifyUser: {
      path: "/api/user/verify",
      post: (data: VerifyUserRequest, requestInit?: RequestInit) => {
        const path = "/api/user/verify";

        return request<VerifyUserRequest, VerifyUserResponse>(
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
      },
    },
    getImages: {
      path: "/api/image/get_all",
      post: (data: GetImagesRequest, requestInit?: RequestInit) => {
        const path = "/api/image/get_all";

        return request<GetImagesRequest, GetImagesResponse>(
          baseUrl + path,
          "post",
          data,
          BODY_TYPE.json,
          requestInit
        );
      },
    },
    getUserLikes: {
      path: "/api/user/likes",
      post: (data: GetUserLikesRequest, requestInit?: RequestInit) => {
        const path = "/api/user/likes";

        return request<GetUserLikesRequest, GetUserLikesResponse>(
          baseUrl + path,
          "post",
          data,
          BODY_TYPE.json,
          requestInit
        );
      },
    },
    addDeltaImage: {
      path: "/api/image/add_delta",
      post: (data: AddDeltaImageRequest, requestInit?: RequestInit) => {
        const path = "/api/image/add_delta";

        return request<AddDeltaImageRequest, AddDeltaImageResponse>(
          baseUrl + path,
          "post",
          data,
          BODY_TYPE.json,
          requestInit
        );
      },
    },
    uploadImage: {
      path: "/api/image/upload",
      post: (data: UploadImageRequest, requestInit?: RequestInit) => {
        const path = "/api/image/upload";

        return request<UploadImageRequest, UploadImageResponse>(
          baseUrl + path,
          "post",
          data,
          BODY_TYPE.json,
          requestInit
        );
      },
    },
  };
  return clients;
}

export const request = getApis(DEFAULT_BASE_URL, clientInit);
