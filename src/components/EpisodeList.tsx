import { Episode } from "../utils/types";

interface EpisodeListProps {
  episodes: Episode[];
}

const EpisodeList: React.FC<EpisodeListProps> = ({ episodes }) => {
  return (
    <div className="h-full overflow-y-auto bg-base-200 p-4">
      <h2 className="text-xl font-bold mb-4">Episodes</h2>
      <ul className="menu bg-base-200 rounded-box">
        {episodes.map((episode) => (
          <li key={episode.id}>
            <a>
              <span className="font-medium">{episode.episode}</span>
              {episode.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EpisodeList;
