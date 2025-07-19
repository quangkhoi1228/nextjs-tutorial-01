import { useState, useEffect } from "react";
export function useSearchFilter<T>(data: T[], filterFn: (item: T, query: string) => boolean) {
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState<T[]>(data);

  useEffect(() => {
    if (query) setFiltered(data.filter((item) => filterFn(item, query)));
    else setFiltered(data);
  }, [data, query, filterFn]);

  return { query, setQuery, filtered, setFiltered };
} 