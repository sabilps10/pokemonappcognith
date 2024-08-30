import { NavigatorScreenParams } from "@react-navigation/native";

export type RootStackParamList = {
  Home: undefined;
  Details: { name: string; id: number }; // Expecting a 'name' parameter
};

export type AppNavigationProps = NavigatorScreenParams<RootStackParamList>;

export interface Pokemon {
  name: string;
  url: string;
  id: number; // Add the id property here
  imageUrl?: string; // Make imageUrl optional to use the same interface before loading details
}

export interface PokemonDetails {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
}

export interface PokemonTest {
  id: number
  name: string
  order: string
  sprites: Sprites
  abilities: Ability[]
  types: Type[]
  height: string
  weight: string
}

interface Ability {
  ability: NameUrl
  is_hidden: boolean
  slot: number
}

interface Type {
  type: NameUrl
  slot: number
}

interface Sprites {
  front_default: string
  other: {
    "official-artwork": {
      front_default: string
    }
  }
}

export interface PokemonListResponse {
  count: number
  next: string | null
  previous: string | null
  results: NameUrl[]
}

export interface NameUrl {
  name: string
  url: string
}