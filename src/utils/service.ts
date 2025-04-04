import axios from "axios";
import { EpisodeResponse } from "./types";

const API_BASE_URL = "https://rickandmortyapi.com/api";

// Fetch all episodes
export const fetchEpisodes = async (): Promise<EpisodeResponse> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/episode`);
    return response.data;
  } catch (error) {
    console.error("Error fetching episodes:", error);
    throw error;
  }
};
