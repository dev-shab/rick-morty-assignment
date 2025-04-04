import { Character } from "../utils/types";
import CharacterCard from "./CharacterCard";

interface CharacterGridProps {
  characters: Character[];
  loading: boolean;
}

const CharacterGrid = ({ characters, loading }: CharacterGridProps) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (characters.length === 0) {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-lg text-gray-500">No characters found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {characters.map((character) => (
        <CharacterCard key={character.id} character={character} />
      ))}
    </div>
  );
};

export default CharacterGrid;
