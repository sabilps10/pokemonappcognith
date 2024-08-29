import axios from "axios";

const BASE_URL = "https://pokeapi.co/api/v2";

// Fetch a list of Pokémon with pagination
export const getPokemonList = async (limit: number, offset: number) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching Pokémon list:", error);
    throw error;
  }
};

// Fetch details of a Pokémon by name or number
export const getPokemonDetailsList = async (query: string) => {
  try {
    // Check if query is a number or a name
    const url = isNaN(Number(query))
      ? `${BASE_URL}/pokemon/${query.toLowerCase()}`
      : `${BASE_URL}/pokemon/${query}`;

    const response = await axios.get(url);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      // Handle 404 errors specifically
      if (error.response && error.response.status === 404) {
        return null;
      }
      console.error("Error fetching Pokémon details:", error);
      throw error; // Rethrow other errors
    }
    // If it's not an AxiosError, throw it as is
    console.error("Unexpected error fetching Pokémon details:", error);
    throw error;
  }
};

export const getPokemonDetails = async (id: number) => {
  try {
    // Check if query is a number or a name
    const url = `${BASE_URL}/pokemon/${id}`;

    const response = await axios.get(url);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      // Handle 404 errors specifically
      if (error.response && error.response.status === 404) {
        return null;
      }
      console.error("Error fetching Pokémon details:", error);
      throw error; // Rethrow other errors
    }
    // If it's not an AxiosError, throw it as is
    console.error("Unexpected error fetching Pokémon details:", error);
    throw error;
  }
};
