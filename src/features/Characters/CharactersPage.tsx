import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useCharacters } from "../../hooks/useCharacters";
import { useDebounce } from "../../hooks/useDebounce";
import { CharacterCard } from "../../components/CharacterCard";
import { SearchBar } from "../../components/SearchBar";
import { Pagination } from "../../components/Pagination";
import { Skeleton } from "../../components/ui/Skeleton";
import { Button } from "../../components/ui/Button";

export const CharactersPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const [searchInput, setSearchInput] = useState("");
  const debouncedSearch = useDebounce(searchInput);

  const { data, isFetching, isError, refetch } = useCharacters(
    page,
    debouncedSearch
  );

  const updatePage = (newPage: number) => {
    if (newPage === 1) {
      setSearchParams({}, { replace: true });
    } else {
      setSearchParams({ page: String(newPage) }, { replace: true });
    }
  };

  const handlePageChange = (newPage: number) => {
    updatePage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearch = (value: string) => {
    setSearchInput(value);
    if (page !== 1) updatePage(1);
  };

  if (isError) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col justify-center items-center gap-5 text-center text-red-400">
          <p>Failed to load characters. Please try again.</p>
          <Button
            className="w-20"
            onClick={() => {
              refetch();
            }}
          >
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-12 py-8">
      <h1 className="text-4xl font-bold text-center text-white mb-8 cursor-default">
        Rick and Morty Explorer
      </h1>

      <SearchBar value={searchInput} onChange={handleSearch} autoFocus />

      {!isFetching && data?.results.length === 0 ? (
        <div className="text-center text-gray-400 py-12">
          <p className="text-xl">No characters found</p>
          <p className="text-sm mt-2">Try different character</p>
        </div>
      ) : (
        <>
          <div className="w-[70%] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {isFetching && !data?.results.length
              ? Array.from({ length: 8 }).map((_, i) => <Skeleton key={i} />)
              : data?.results.map((character) => (
                  <CharacterCard
                    key={character.id}
                    id={character.id}
                    name={character.name}
                    image={character.image}
                    status={character.status}
                    species={character.species}
                  />
                ))}
          </div>

          {data && !isFetching && (
            <Pagination
              currentPage={page}
              totalPages={data.info.pages || 0}
              onPageChange={handlePageChange}
              hasNext={!!data.info.next}
              hasPrev={!!data.info.prev}
            />
          )}
        </>
      )}
    </div>
  );
};
