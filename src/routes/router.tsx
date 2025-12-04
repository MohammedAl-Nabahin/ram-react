import { createBrowserRouter } from "react-router-dom";
import { CharactersPage } from "../features/Characters/CharactersPage";
import { CharacterDetailsPage } from "../features/CharacterDetails/CharacterDetailsPage";
import { NotFoundPage } from "../components/NotFoundPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <CharactersPage />,
  },
  {
    path: "/character/:id",
    element: <CharacterDetailsPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
