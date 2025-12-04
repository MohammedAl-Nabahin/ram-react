import { useQuery } from "@tanstack/react-query";
import { getCharacterById, getEpisodes } from "../api/api";

export const useCharacterDetails = (id: string) => {
  const characterQuery = useQuery({
    queryKey: ["character", id],
    queryFn: () => getCharacterById(id),
    enabled: !!id,
  });

  const episodesQuery = useQuery({
    queryKey: ["episodes", characterQuery.data?.episode],
    queryFn: () => getEpisodes(characterQuery.data!.episode),
    enabled: !!characterQuery.data?.episode,
  });

  return {
    character: characterQuery.data,
    episodes: episodesQuery.data,
    isLoading: characterQuery.isLoading || episodesQuery.isLoading,
    isError: characterQuery.isError,
  };
};
