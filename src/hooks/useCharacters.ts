import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllCharacters } from "../api/api";

export const useCharacters = (page: number, search: string) => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["characters", page, search],
    queryFn: () => getAllCharacters(page, search),
    staleTime: 1000 * 60 * 5,
    placeholderData: (previousData) => previousData,
  });

  if (query.data?.info.next) {
    queryClient.prefetchQuery({
      queryKey: ["characters", page + 1, search],
      queryFn: () => getAllCharacters(page + 1, search),
      staleTime: 1000 * 60 * 5,
    });
  }

  return query;
};
