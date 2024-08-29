import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native"; // Import types and hooks
import { RootStackParamList } from "../../types/pokemon"; // Import the navigation types
import { getPokemonDetails } from "../../services/api";
import { styles } from "./Styles";

type DetailsScreenRouteProp = RouteProp<RootStackParamList, "Details">;

const DetailsScreen = () => {
  const route = useRoute<DetailsScreenRouteProp>();
  const { name, id } = route.params;
  const [pokemon, setPokemon] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchPokemonDetails();
  }, []);

  const fetchPokemonDetails = async () => {
    try {
      const data = await getPokemonDetails(id);
      setPokemon(data);
    } catch (error) {
      console.error("Error fetching Pokémon details:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  const formattedId = id.toString().padStart(4, "0");

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Image
          source={{ uri: pokemon?.sprites.front_default }}
          style={styles.image}
        />
        <View style={styles.nameContainer}>
          <View style={styles.numberContainer}>
            <Text style={styles.number}>#{formattedId}</Text>
          </View>
          <Text style={styles.title}>
            {pokemon?.name.charAt(0).toUpperCase() + pokemon?.name.slice(1)}
          </Text>
        </View>
        <View style={styles.detailContainer}>
          <View style={styles.abilitiesContainer}>
            <Text style={styles.subTitle}>Pokemon Abilities</Text>
            {pokemon?.abilities.map(
              (ability: { ability: { name: string } }) => (
                <Text style={styles.subTitleIn} key={ability.ability.name}>
                  {ability.ability.name}
                </Text>
              )
            )}
          </View>
          <View style={styles.typesContainer}>
            <Text style={styles.subTitle}>Pokemon Types</Text>
            {pokemon?.types.map((type: { type: { name: string } }) => (
              <Text style={styles.subTitleIn} key={type.type.name}>
                {type.type.name}
              </Text>
            ))}
          </View>
          <View style={styles.statsContainer}>
            <Text style={styles.subTitle}>Pokemon Stats</Text>
            {pokemon?.stats.map(
              (stat: { stat: { name: string }; base_stat: number }) => (
                <Text
                  style={styles.subTitleIn}
                  key={stat.stat.name}
                >{`${stat.stat.name} ${stat.base_stat}`}</Text>
              )
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DetailsScreen;
