import type { ApiResponse, Character, Episode } from "../types";

const BASE_URL = "https://rickandmortyapi.com/api";

const fetchApi = async <T>(endpoint: string): Promise<T> => {
  const response = await fetch(`${BASE_URL}${endpoint}`);

  if (!response.ok) {
    if (response.status === 404) {
      return {
        info: { count: 0, pages: 0, next: null, prev: null },
        results: [],
      } as T;
    }
    throw new Error(`API Error: ${response.statusText}`);
  }

  return response.json();
};

export const getAllCharacters = (page: number, name: string) => {
  const params = new URLSearchParams({ page: String(page) });
  if (name.trim()) params.append("name", name);
  return fetchApi<ApiResponse<Character>>(`/character/?${params}`);
};

export const getCharacterById = (id: string) =>
  fetchApi<Character>(`/character/${id}`);

export const getEpisodes = async (episodeUrls: string[]) => {
  if (!episodeUrls.length) return [];
  const ids = episodeUrls.map((url) => url.split("/").pop()).join(",");
  const data = await fetchApi<Episode | Episode[]>(`/episode/${ids}`);
  return Array.isArray(data) ? data : [data];
};
