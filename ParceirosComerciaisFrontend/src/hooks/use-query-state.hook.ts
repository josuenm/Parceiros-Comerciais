import { useCallback, useMemo, useState, useEffect } from "react";

export function useQueryState<T extends string | number | boolean>(
  key: string,
  defaultValue: T
) {
  const getParamValue = useCallback((): T => {
    const params = new URLSearchParams(window.location.search);
    const param = params.get(key);

    if (param === null) return defaultValue;

    if (typeof defaultValue === "number") {
      const num = Number(param);
      return (isNaN(num) ? defaultValue : num) as T;
    }

    if (typeof defaultValue === "boolean") {
      return (param === "true" ? true : param === "false" ? false : defaultValue) as T;
    }

    return param as T;
  }, [key, defaultValue]);

  const [value, setValueState] = useState<T>(getParamValue);

  useEffect(() => {
    const handler = () => {
      setValueState(getParamValue());
    };

    window.addEventListener("popstate", handler);
    return () => window.removeEventListener("popstate", handler);
  }, [getParamValue]);

  const setValue = useCallback(
    (newValue: T) => {
      const params = new URLSearchParams(window.location.search);
      params.set(key, String(newValue));

      const newUrl = `${window.location.pathname}?${params.toString()}`;
      window.history.pushState({}, "", newUrl);

      setValueState(newValue);
    },
    [key]
  );

  return useMemo(() => [value, setValue] as const, [value, setValue]);
}
