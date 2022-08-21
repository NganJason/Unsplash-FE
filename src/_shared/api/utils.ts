export const DEFAULT_FETCH_CLIENT = (url: string, config?: RequestInit) =>
  fetch(url, config).then((res) => {
    if (res.status >= 400) {
      throw new ApiError(`${res.status} ${res.statusText}`);
    }
    return res.json().catch(() => res.text());
  });

/** Overrided Promise type. Needs for additional typings of '.catch' callback */
type TPromise<ResolveType, RejectType = any> = Omit<
  Promise<ResolveType>,
  "then" | "catch"
> & {
  then<TResult1 = ResolveType, TResult2 = never>(
    onfulfilled?:
      | ((value: ResolveType) => TResult1 | PromiseLike<TResult1>)
      | undefined
      | null,
    onrejected?:
      | ((reason: RejectType) => TResult2 | PromiseLike<TResult2>)
      | undefined
      | null
  ): TPromise<TResult1 | TResult2, RejectType>;
  catch<TResult = never>(
    onrejected?:
      | ((reason: RejectType) => TResult | PromiseLike<TResult>)
      | undefined
      | null
  ): TPromise<ResolveType | TResult, RejectType>;
};

export enum BODY_TYPE {
  json = 0,
  form,
}
function makeQueryKey(key: string, value: any) {
  return !key || !value ? "" : key + "=" + value;
}
export function parseQueryString(obj: Record<string, any>): string {
  return Object.keys(obj).reduce((ret, key) => {
    const val = obj[key];
    let query = "";
    if (Array.isArray(val)) {
      query = val
        .map((v) => makeQueryKey(key, v))
        .filter((v) => !!v)
        .join("&");
    } else {
      query = makeQueryKey(key, val);
    }
    if (ret) {
      ret += "&";
    }
    return ret + query;
  }, "");
}
function formatBody(
  type: BODY_TYPE,
  params: Record<string, any>
): string | FormData | undefined {
  if (type === BODY_TYPE.json) {
    return JSON.stringify(params);
  }
  if (type === BODY_TYPE.form) {
    return Object.keys(params).reduce((data, key) => {
      data.append(key, params[key]);
      return data;
    }, new FormData());
  }
}

export function replacePathParams(
  path: string,
  pathParams: Record<string, string>
) {
  return path.replace(/\{(\w+)}/g, (_, param) => pathParams[param]);
}

export function createRequester({
  request = DEFAULT_FETCH_CLIENT,
  queryStringParser = parseQueryString,
  requestInit = {},
}: {
  request?: (input: string, init?: RequestInit) => Promise<any>;
  queryStringParser?: (obj: Record<string, any>) => string;
  requestInit?: RequestInit | (() => RequestInit);
}) {
  return <
    Req extends { [key: string]: any } | null | undefined | void,
    Res,
    Rej = any
  >(
    path: string,
    method: string,
    body: Req,
    bodyType = BODY_TYPE.json,
    config = {} as RequestInit
  ): TPromise<Res, Rej> => {
    let url = path;
    if (body && method === "get") {
      url += "?";
      url += queryStringParser(body as Exclude<NonNullable<Req>, void>);
    }
    const defaultHeaders = {} as Record<string, string>;
    if (bodyType === BODY_TYPE.json) {
      defaultHeaders["Content-Type"] = "application/json";
    }
    const _requestInit =
      requestInit instanceof Function ? requestInit() : requestInit;
    return request(url, {
      ..._requestInit,
      ...config,
      headers: Object.assign(
        defaultHeaders,
        _requestInit.headers,
        config.headers
      ),
      method,
      body:
        body && method !== "get"
          ? formatBody(bodyType, body as Exclude<NonNullable<Req>, void>)
          : void 0,
    });
  };
}

export class ApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ApiError";
  }
}
