import useSWR from "swr";
import { API } from "@/utils/API";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const useTags = () => {
  const { data, error, isLoading, mutate } = useSWR(`${API.tags}`, fetcher);

  return {
    tags: data,
    isLoading,
    isError: !!error,
    refetchTags: mutate,
  };
};
