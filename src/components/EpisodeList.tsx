import { Episode } from "../utils/types";

interface EpisodeListProps {
  episodes: Episode[];
  selectedEpisodeId: number | null;
  onSelectEpisode: (episodeId: number | null) => void;
  loading: boolean;
}

const EpisodeList = ({
  episodes,
  selectedEpisodeId,
  onSelectEpisode,
  loading,
}: EpisodeListProps) => {
  if (loading) {
    return (
      <div className="h-full overflow-y-auto bg-base-200 p-4 flex justify-center items-center">
        <span className="loading loading-spinner loading-md"></span>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto bg-base-200 p-4">
      <h2 className="text-xl font-bold mb-4">Episodes</h2>
      <ul className="menu bg-base-200 rounded-box">
        {episodes.map((episode) => (
          <li key={episode.id}>
            <a
              onClick={() => {
                if (selectedEpisodeId === episode.id) {
                  onSelectEpisode(null);
                } else {
                  onSelectEpisode(episode.id);
                }
              }}
              className={`${
                selectedEpisodeId === episode.id
                  ? "active font-bold bg-base-300"
                  : ""
              }`}
            >
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
