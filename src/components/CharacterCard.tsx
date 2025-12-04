import { Link, useLocation } from "react-router-dom";
import { Card } from "./ui/Card";
import { getStatusColor } from "../utils";

interface CharacterCardProps {
  id: number;
  name: string;
  image: string;
  status: string;
  species: string;
}

export const CharacterCard = ({
  id,
  name,
  image,
  status,
  species,
}: CharacterCardProps) => {
  const location = useLocation();

  return (
    <Link
      to={`/character/${id}`}
      state={{ from: `${location.pathname}${location.search}` }}
      className="block group"
    >
      <Card className="hover:ring-2 hover:ring-blue-500 transition-all">
        <div className="relative overflow-hidden">
          <img
            src={image}
            alt={name}
            loading="lazy"
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-4">
          <h3 className="text-xl font-bold text-white mb-2 truncate">{name}</h3>
          <div className="flex items-center gap-2 text-gray-300">
            <span
              className={`w-2 h-2 rounded-full ${getStatusColor(status)}`}
            ></span>
            <span className="text-sm">
              {status} | {species}
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
};
