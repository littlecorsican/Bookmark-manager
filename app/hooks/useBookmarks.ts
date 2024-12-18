import useSWR from "swr";
import { API } from "@/utils/API";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const useBookmarks = ({
    offset
}: {
    offset: number
}) => {
  const { data, error, isLoading, mutate } = useSWR(`${API.bookmarks}?page=${offset}`, fetcher);

  return {
    bookmarks: data,
    isLoading,
    isError: !!error,
    mutate,
  };
};
