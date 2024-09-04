export const mockPokemonList = {
  count: 1,
  id: 1,
  next: "https://pokeapi.co/api/v2/pokemon?limit=1",
  previous: null,
  results: [
    {
      name: "bulbasaur",
      url: "https://pokeapi.co/api/v2/pokemon/1/",
      id: 1, // Add the id property here
      imageUrl:
        "https://pokeapi.co/media/sprites/pokemon/other/official-artwork/bulbasaur.png", // Use the sprite URL or other relevant URL if needed
    },
  ],
};

export const mockPokemonCard = {
  name: "bulbasaur",
  url: "https://pokeapi.co/api/v2/pokemon/1/",
  id: 1, // Add the id property
  imageUrl:
    "https://pokeapi.co/media/sprites/pokemon/other/official-artwork/bulbasaur.png",
};

export const mockDetailPokemon = {
  name: "bulbasaur",
  id: 1,
  sprites: {
    front_default:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
  },
  abilities: [
    {
      ability: {
        name: "overgrow",
        url: "https://pokeapi.co/api/v2/ability/65/",
      },
      is_hidden: false,
      slot: 1,
    },
    {
      ability: {
        name: "chlorophyll",
        url: "https://pokeapi.co/api/v2/ability/34/",
      },
      is_hidden: true,
      slot: 3,
    },
  ],
  types: [
    {
      type: {
        name: "grass",
        url: "https://pokeapi.co/api/v2/type/12/",
      },
    },
    {
      type: {
        name: "poison",
        url: "https://pokeapi.co/api/v2/type/4/",
      },
    },
  ],
  stats: [
    {
      base_stat: 45,
      effort: 0,
      stat: {
        name: "hp",
        url: "https://pokeapi.co/api/v2/stat/1/",
      },
    },
    {
      base_stat: 49,
      effort: 0,
      stat: {
        name: "attack",
        url: "https://pokeapi.co/api/v2/stat/2/",
      },
    },
    {
      base_stat: 49,
      effort: 0,
      stat: {
        name: "defense",
        url: "https://pokeapi.co/api/v2/stat/3/",
      },
    },
    {
      base_stat: 65,
      effort: 1,
      stat: {
        name: "special-attack",
        url: "https://pokeapi.co/api/v2/stat/4/",
      },
    },
    {
      base_stat: 65,
      effort: 0,
      stat: {
        name: "special-defense",
        url: "https://pokeapi.co/api/v2/stat/5/",
      },
    },
    {
      base_stat: 45,
      effort: 0,
      stat: {
        name: "speed",
        url: "https://pokeapi.co/api/v2/stat/6/",
      },
    },
  ],
  height: 7,
  weight: 69,
};
