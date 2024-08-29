import React, { useEffect, useState, useCallback } from "react";
import { View, FlatList, TextInput, StyleSheet } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { debounce } from "lodash";
import PokemonCard from "../../components/PokemonCard/PokemonCard";
import { getPokemonList, getPokemonDetailsList } from "../../services/api";
import { Pokemon } from "../../types/pokemon";
import { RootStackParamList } from "../../types/pokemon";
import { styles } from "./Styles";

const HomeScreen = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [filteredPokemons, setFilteredPokemons] = useState<Pokemon[]>([]);
  const [search, setSearch] = useState<string>("");
  const [offset, setOffset] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    if (search === "") {
      fetchPokemons();
    }
  }, [offset, search]);

  const fetchPokemons = async () => {
    setLoading(true);
    try {
      const data = await getPokemonList(20, offset);
      setPokemons((prevPokemons) => {
        const pokemonMap = new Map<number, Pokemon>();
        [
          ...prevPokemons,
          ...data.results.map((pokemon: { name: string; url: string }) => {
            const id = Number(pokemon.url.split("/").slice(-2, -1)[0]);
            return {
              name: pokemon.name,
              url: pokemon.url,
              id,
            };
          }),
        ].forEach((pokemon) => pokemonMap.set(pokemon.id, pokemon));
        return Array.from(pokemonMap.values());
      });
    } catch (error) {
      console.error("Error fetching Pokémon:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPokemonByNameOrNumber = async (query: string) => {
    setLoading(true);
    try {
      const data = await getPokemonDetailsList(query);
      if (data) {
        console.log("data id", data);
        setPokemons([
          {
            name: data.name,
            url: `https://pokeapi.co/api/v2/pokemon/${data.id}/`,
            id: data.id,
          },
        ]);
      } else {
        setPokemons([]);
      }
    } catch (error) {
      console.error("Error fetching Pokémon by name or number:", error);
      setPokemons([]);
    } finally {
      setLoading(false);
    }
  };

  const filterPokemons = (text: string) => {
    if (text.length < 2) {
      setFilteredPokemons([]);
      return;
    }
    const lowerCaseText = text.toLowerCase();
    const filtered = pokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(lowerCaseText)
    );
    setFilteredPokemons(filtered);
  };

  const handleSearch = useCallback(
    debounce((text: string) => {
      setSearch(text);
      if (text === "") {
        setOffset(0);
        setPokemons([]); // Clear the current list for a fresh start
        fetchPokemons(); // Fetch the initial list again
      } else {
        const isNumeric = !isNaN(Number(text)) && text.trim() !== "";
        const query = isNumeric ? Number(text) : text.toLowerCase();
        if (isNumeric) {
          fetchPokemonByNameOrNumber(query.toString()); // Pass the number as a string
        } else {
          filterPokemons(text); // Filter the Pokémon list based on the search input
        }
      }
    }, 500),
    [] // Dependencies array is empty to avoid re-creating the debounce function
  );

  const loadMore = () => {
    if (!loading && search === "") {
      setOffset(offset + 20);
    }
  };

  const isSearchNumeric = !isNaN(Number(search)) && search.trim() !== "";

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search your pokemon here"
        placeholderTextColor={"gray"}
        onChangeText={handleSearch}
      />
      <FlatList
        data={
          search.length <= 1
            ? pokemons
            : isSearchNumeric
            ? pokemons
            : filteredPokemons
        }
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <PokemonCard
            name={item.name}
            id={item.id}
            onPress={() =>
              navigation.navigate("Details", { name: item.name, id: item.id })
            }
          />
        )}
        numColumns={2}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};

export default HomeScreen;
