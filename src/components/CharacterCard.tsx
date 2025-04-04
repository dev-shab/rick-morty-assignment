import { Character } from "../utils/types";

interface CharacterCardProps {
  character: Character;
}

const CharacterCard = ({ character }: CharacterCardProps) => {
  return (
    <div className="card w-full bg-base-100 shadow-xl overflow-hidden">
      <figure>
        <img
          src={character.image}
          alt={character.name}
          className="w-full h-48 object-cover"
        />
      </figure>
      <div className="card-body p-4">
        <h2 className="card-title text-lg">{character.name}</h2>
        <div className="flex flex-col text-sm">
          <span className="flex items-center gap-1">
            <div
              className={`w-2 h-2 rounded-full ${
                character.status === "Alive"
                  ? "bg-success"
                  : character.status === "Dead"
                  ? "bg-error"
                  : "bg-warning"
              }`}
            />
            {character.status} - {character.species}
          </span>
          <span className="text-gray-500">{character.location.name}</span>
        </div>
      </div>
    </div>
  );
};

export default CharacterCard;
