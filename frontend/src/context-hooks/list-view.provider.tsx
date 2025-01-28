"use client";

import { TFilterTutor, TSortTutor } from "@/lib/types";
import { createContext, ReactNode, useContext, useMemo, useState } from "react";
import useSWR from "swr";
import { IResponseTutors } from "@/lib/response-types";
import { ICountryContext } from "./useCountry";

const sortList = [
  { name: "Price: higher first", value: "price-higher" },
  { name: "Price: lower first", value: "price-lower" },
  { name: "Reviews", value: "reviews" },
  { name: "Popularity", value: "popularity" },
  { name: "Rating", value: "rating" },
  { name: "Relevance", value: "relevance" },
];

interface IContext {
  sort: TSortTutor;
  setSort: (sort: TSortTutor) => void;
  filter: TFilterTutor;
  setFilter: (filter: TFilterTutor) => void;
  sortList: typeof sortList;
  data?: IResponseTutors["data"];
  isLoading: boolean;
}

const ListViewContext = createContext<IContext>({
  sort: "relevance",
  setSort: () => {},
  filter: {
    price: { min: 0, max: 100 },
    isNative: false,
    countryOfBirth: "",
    isSuperTutor: false,
  },
  setFilter: () => {},
  sortList,
  data: [],
  isLoading: false,
});

export function ListViewProvider({
  children,
  country = "",
}: {
  children: ReactNode;
  country?: ICountryContext["country"];
}) {
  const [sort, setSort] = useState<TSortTutor>("relevance");
  const [filter, setFilter] = useState<TFilterTutor>({
    price: { min: 0, max: 100 },
    isNative: false,
    countryOfBirth: country,
    isSuperTutor: false,
  });

  const queryParams = useMemo(() => {
    return new URLSearchParams({
      sort,
      lang: country,
    }).toString();
  }, [sort, country]);

  const { data, isLoading } = useSWR(
    `/api/tutor?${queryParams}`,
    country
      ? async () =>
          (await fetch(`/api/tutor?${queryParams}`).then((res) =>
            res.json(),
          )) as {
            data: IResponseTutors;
            status: number;
          }
      : null,
  );

  return (
    <ListViewContext.Provider
      value={{
        sort,
        setSort,
        filter,
        setFilter,
        sortList,
        data: data?.data.data,
        isLoading,
      }}
    >
      {children}
    </ListViewContext.Provider>
  );
}

export function useListViewContext() {
  const context = useContext(ListViewContext);
  if (!context) {
    throw new Error(
      "useListViewContext must be used within a ListViewProvider",
    );
  }
  return context;
}
