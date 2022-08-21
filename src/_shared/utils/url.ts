export function toQueryString(obj: Record<string, unknown>) {
  const entries = Object.entries(obj)
    .filter(([, value]) => value != null)
    .map(([key, value]) => [key, `${value}`]);
  const searchParams = new URLSearchParams(entries);
  return searchParams.toString();
}

export function withQueryString(
  pathname: string,
  obj: Record<string, unknown>
) {
  const qs = toQueryString(obj);
  return pathname + (qs.length > 0 ? `?${qs}` : "");
}

export function fromQueryString(str: string) {
  const searchParams = new URLSearchParams(str);
  return Object.fromEntries(searchParams.entries());
}
