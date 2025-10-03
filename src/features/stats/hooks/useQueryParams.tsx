import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

export const useQueryParams = (key: string = "", defaultValue?: string) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const setValue = useCallback(
    (value: string) => {
      searchParams.set(key, value);
      setSearchParams(searchParams);
    },
    [searchParams, setSearchParams, key]
  );

  const value = useMemo(() => {
    return searchParams.get(key) || defaultValue || "";
  }, [searchParams, key, defaultValue]);

  return [value, setValue] as const;
};
