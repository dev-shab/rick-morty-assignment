import { useEffect, useState } from "react";
import { Episode } from "./utils/types";
import { fetchEpisodes } from "./utils/service";
import EpisodeList from "./components/EpisodeList";

const App = () => {
  const [episodes, setEpisodes] = useState<Episode[]>([]);

  useEffect(() => {
    const getEpisodes = async () => {
      try {
        const response = await fetchEpisodes();
        setEpisodes(response.results);
      } catch (error) {
        console.error("Failed to load episodes:", error);
      }
    };

    getEpisodes();
  }, []);

  return (
    <div>
      <div className="w-1/6 h-full border-r border-base-300">
        <EpisodeList episodes={episodes} />
      </div>
    </div>
  );
};

export default App;
