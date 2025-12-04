import { useParams, Link, useLocation } from "react-router-dom";
import { useCharacterDetails } from "../../hooks/useCharacterDetails";
import { Loader } from "../../components/ui/Loader";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { getStatusColor } from "../../utils";

export const CharacterDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const { character, episodes, isLoading, isError } = useCharacterDetails(id!);

  const backUrl = location.state?.from || "/";

  if (isLoading) return <Loader />;

  if (isError || !character) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-red-400 text-xl mb-4">Character not found</p>
          <Link to={backUrl}>
            <Button>Back to Characters</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to={backUrl} className="inline-block mb-6">
        <Button>Back to Characters</Button>
      </Link>

      <Card>
        <div className="grid md:grid-cols-2 gap-6 p-6">
          <div className="flex justify-center items-start">
            <img
              src={character.image}
              alt={character.name}
              className="rounded-lg shadow-xl w-full max-w-md"
            />
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-white mb-4">
              {character.name}
            </h1>

            <div className="space-y-3 text-gray-300">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-400">Status:</span>
                <div className="flex items-center gap-2">
                  <span
                    className={`w-3 h-3 rounded-full ${getStatusColor(
                      character.status
                    )}`}
                  ></span>
                  <span>{character.status}</span>
                </div>
              </div>

              <div>
                <span className="font-semibold text-gray-400">Species:</span>{" "}
                {character.species}
              </div>

              <div>
                <span className="font-semibold text-gray-400">Gender:</span>{" "}
                {character.gender}
              </div>

              {character.type && (
                <div>
                  <span className="font-semibold text-gray-400">Type:</span>{" "}
                  {character.type}
                </div>
              )}

              <div>
                <span className="font-semibold text-gray-400">Origin:</span>{" "}
                {character.origin.name}
              </div>

              <div>
                <span className="font-semibold text-gray-400">Created At:</span>{" "}
                {character.created}
              </div>
            </div>
          </div>
        </div>
      </Card>

      <div className="mt-8">
        <h2 className="text-2xl font-bold text-white mb-4">
          Episodes ({character.episode.length})
        </h2>

        {episodes ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {episodes.map((episode) => (
              <Card key={episode.id}>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-blue-400 font-semibold">
                      {episode.episode}
                    </span>
                    <span className="text-gray-500 text-sm">
                      {episode.air_date}
                    </span>
                  </div>
                  <h3 className="text-white font-medium">{episode.name}</h3>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};
