import axios from "axios";
import { Character, CharacterResponse, Episode } from "./types";

const API_BASE_URL = "https://rickandmortyapi.com/api";

// Fetch all episodes
export const fetchAllEpisodes = async (): Promise<Episode[]> => {
  try {
    const firstPage = await axios.get(`${API_BASE_URL}/episode`);
    const totalPages = firstPage.data.info.pages;
    let allEpisodes: Episode[] = [...firstPage.data.results];

    if (totalPages > 1) {
      const remainingRequests = [];
      for (let page = 2; page <= totalPages; page++) {
        remainingRequests.push(
          axios.get(`${API_BASE_URL}/episode?page=${page}`)
        );
      }

      const responses = await Promise.all(remainingRequests);
      responses.forEach((response) => {
        allEpisodes = [...allEpisodes, ...response.data.results];
      });
    }

    return allEpisodes;
  } catch (error) {
    console.error("Error fetching all episodes:", error);
    throw error;
  }
};

// Fetch episode by ID
export const fetchEpisodeById = async (id: number): Promise<Episode> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/episode/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching episode with ID ${id}:`, error);
    throw error;
  }
};

// Fetch all characters
export const fetchCharacters = async (): Promise<CharacterResponse> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/character`);
    return response.data;
  } catch (error) {
    console.error("Error fetching characters:", error);
    throw error;
  }
};

// Fetch character by ID
export const fetchCharacterById = async (id: number): Promise<Character> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/character/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching character with ID ${id}:`, error);
    throw error;
  }
};

// Fetch characters from an episode
export const fetchCharactersFromEpisode = async (
  episodeId: number
): Promise<Character[]> => {
  try {
    const episode = await fetchEpisodeById(episodeId);

    const characterIds = episode.characters.map((url: string) => {
      const parts = url.split("/");
      return parts[parts.length - 1];
    });

    if (characterIds.length === 0) {
      return [];
    }

    if (characterIds.length === 1) {
      const character = await fetchCharacterById(Number(characterIds[0]));
      return [character];
    }

    const response = await axios.get(
      `${API_BASE_URL}/character/${characterIds.join(",")}`
    );
    return response.data;
  } catch (error) {
    console.error(
      `Error fetching characters from episode ${episodeId}:`,
      error
    );
    throw error;
  }
};
