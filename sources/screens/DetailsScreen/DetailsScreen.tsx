import React, { Component } from "react";
import { View, Text, Image, ActivityIndicator } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/type";
import { getPokemonDetails } from "../../services/api";
import {styles} from './Styles'

export interface Props extends NativeStackScreenProps<RootStackParamList, "Details"> {}
export interface State {
  pokemon: any | null;
  loading: boolean;
}
class DetailsScreen extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      pokemon: null,
      loading: true,
    };
  }

  async componentDidMount() {
    const { id } = this.props.route.params;
    await this.fetchPokemonDetails(id);
  }

  fetchPokemonDetails = async (id: number) => {
    try {
      const data = await getPokemonDetails(id);
      this.setState({ pokemon: data });
    } catch (error) {
      console.error("Error fetching Pokémon details:", error);
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { pokemon, loading } = this.state;
    const { id, name } = this.props.route.params;

    if (loading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      );
    }

    const formattedId = id.toString().padStart(4, "0");

    return (
      <View style={styles.container}>
        <Image
          source={{ uri: pokemon?.sprites.front_default }}
          style={styles.image}
          resizeMode="cover"
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
            <Text style={styles.titleBot}>Pokemon Abilities</Text>
            <View style={styles.botContainer}>
              {pokemon?.abilities.map(
                (ability: { ability: { name: string } }) => (
                  <Text style={styles.subTitleBot} key={ability.ability.name}>
                    {ability.ability.name}
                  </Text>
                )
              )}
            </View>
          </View>
          <View style={styles.typesContainer}>
            <Text style={styles.titleBot}>Pokemon Types</Text>
            <View style={styles.botContainer}>
              {pokemon?.types.map((type: { type: { name: string } }) => (
                <Text style={styles.subTitleBot} key={type.type.name}>
                  {type.type.name}
                </Text>
              ))}
            </View>
          </View>
          <View style={styles.statsContainer}>
            {pokemon?.stats.map(
              (stat: { stat: { name: string }; base_stat: number }) => (
                <View style={styles.statColumn} key={stat.stat.name}>
                  <Text style={styles.statName}>
                    {stat.stat.name.toUpperCase()}
                  </Text>
                  <Text style={styles.statValue}>{stat.base_stat}</Text>
                </View>
              )
            )}
          </View>
        </View>
      </View>
    );
  }
}

export default DetailsScreen;
