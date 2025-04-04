import { useEffect, useState } from "react";
import { Character, Episode } from "./utils/types";
import {
  fetchCharacters,
  fetchCharactersFromEpisode,
  fetchAllEpisodes,
} from "./utils/service";
import EpisodeList from "./components/EpisodeList";
import CharacterGrid from "./components/CharacterGrid";

const App = () => {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [selectedEpisodeId, setSelectedEpisodeId] = useState<number | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [episodesLoading, setEpisodesLoading] = useState<boolean>(true);

  useEffect(() => {
    const getEpisodes = async () => {
      setEpisodesLoading(true);
      try {
        const response = await fetchAllEpisodes();
        setEpisodes(response);
      } catch (error) {
        console.error("Failed to load episodes:", error);
      } finally {
        setEpisodesLoading(false);
      }
    };

    getEpisodes();
  }, []);

  useEffect(() => {
    const loadCharacters = async () => {
      setLoading(true);
      try {
        if (selectedEpisodeId) {
          const episodeCharacters = await fetchCharactersFromEpisode(
            selectedEpisodeId
          );
          setCharacters(episodeCharacters);
        } else {
          const response = await fetchCharacters();
          setCharacters(response.results);
        }
      } catch (error) {
        console.error("Failed to load characters:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCharacters();
  }, [selectedEpisodeId]);

  const handleSelectEpisode = (episodeId: number | null) => {
    setSelectedEpisodeId(episodeId);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="w-64 h-full border-r border-base-300">
        <EpisodeList
          episodes={episodes}
          selectedEpisodeId={selectedEpisodeId}
          onSelectEpisode={handleSelectEpisode}
          loading={episodesLoading}
        />
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="p-4 border-b border-base-300">
          <h1 className="text-2xl font-bold">
            {selectedEpisodeId
              ? `Characters from ${
                  episodes.find((e) => e.id === selectedEpisodeId)?.name
                }`
              : "All Characters"}
          </h1>
        </div>
        <CharacterGrid characters={characters} loading={loading} />
      </div>
    </div>
  );
};

export default App;
