import { Component } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { debounce } from "lodash";
import {
  getPokemonList,
  getPokemonDetailsList,
  getPokemonDetails,
} from "../../services/api";
import { Pokemon, PokemonDetails } from "../../types/type";
import { RootStackParamList } from "../../types/type";

export interface Props
  extends NativeStackScreenProps<RootStackParamList, "Home"> {}

export interface State {
  pokemons: Pokemon[];
  filteredPokemons: Pokemon[];
  search: string;
  offset: number;
  loading: boolean;
}

class ComponentController extends Component<Props, State> {
  public handleSearch = debounce(async (text: string) => {
    this.setState({ search: text });

    if (text === "") {
      this.setState({ offset: 0, pokemons: [] });
      await this.fetchPokemons();
    } else {
      const isNumeric = !isNaN(Number(text)) && text.trim() !== "";
      const query = isNumeric ? Number(text) : text.toLowerCase();
      if (isNumeric) {
        await this.fetchPokemonByNameOrNumber(query.toString()); // Pass the number as a string
      } else {
        this.filterPokemons(text); // Filter the Pokémon list based on the search input
      }
    }
  }, 500);

  constructor(props: Props) {
    super(props);
    this.state = {
      pokemons: [],
      filteredPokemons: [],
      search: "",
      offset: 0,
      loading: false,
    };
  }

  async componentDidMount() {
    await this.fetchPokemons();
  }

  async componentDidUpdate(prevProps: Props, prevState: State) {
    if (
      prevState.offset !== this.state.offset ||
      prevState.search !== this.state.search
    ) {
      await this.fetchPokemons();
    }
  }

  fetchPokemons = async () => {
    this.setState({ loading: true });
    try {
      const data = await getPokemonList(20, this.state.offset);
      const detailedPokemonPromises = data.results.map(
        async (pokemon: { name: string; url: string }) => {
          const id = Number(pokemon.url.split("/").slice(-2, -1)[0]);
          const details: PokemonDetails = await getPokemonDetails(id);
          return {
            name: pokemon.name,
            url: pokemon.url,
            id,
            imageUrl: details.sprites.front_default, // Include the image URL here
          };
        }
      );

      const detailedPokemons: Pokemon[] = await Promise.all(
        detailedPokemonPromises
      );

      this.setState((prevState) => {
        const pokemonMap = new Map<number, Pokemon>();
        [...prevState.pokemons, ...detailedPokemons].forEach((pokemon) =>
          pokemonMap.set(pokemon.id, pokemon)
        );
        return { pokemons: Array.from(pokemonMap.values()) };
      });
    } catch (error) {
      console.error("Error fetching Pokémon:", error);
    } finally {
      this.setState({ loading: false });
    }
  };

  fetchPokemonByNameOrNumber = async (query: string) => {
    this.setState({ loading: true });
    try {
      const data = await getPokemonDetailsList(query);
      if (data) {
        this.setState({
          pokemons: [
            {
              name: data.name,
              url: `https://pokeapi.co/api/v2/pokemon/${data.id}/`,
              id: data.id,
              imageUrl: data.sprites.front_default,
            },
          ],
        });
      } else {
        this.setState({ pokemons: [] });
      }
    } catch (error) {
      console.error("Error fetching Pokémon by name or number:", error);
      this.setState({ pokemons: [] });
    } finally {
      this.setState({ loading: false });
    }
  };

  filterPokemons = (text: string) => {
    if (text.length < 2) {
      this.setState({ filteredPokemons: [] });
      return;
    }
    const lowerCaseText = text.toLowerCase();
    const filtered = this.state.pokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(lowerCaseText)
    );
    this.setState({ filteredPokemons: filtered });
  };

  loadMore = () => {
    if (!this.state.loading && this.state.search === "") {
      this.setState((prevState) => ({ offset: prevState.offset + 20 }));
    }
  };
}

export default ComponentController;
