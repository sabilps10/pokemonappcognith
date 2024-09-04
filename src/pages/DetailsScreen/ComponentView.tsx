import {
  View,
  Text,
  Image,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
} from "react-native";
import DetailsScreenController from "./ComponentController";

class DetailsScreenView extends DetailsScreenController {
  
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

export default DetailsScreenView;

const windowWidth = Dimensions.get("window").width;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  image: {
    width: 300,
    height: 300,
    marginVertical: 15,
  },
  numberContainer: {
    width: 55,
    height: 30,
    borderRadius: 8,
    backgroundColor: "#2f2f2f",
    justifyContent: "center",
    alignItems: "center",
  },
  number: {
    fontSize: 13,
    fontWeight: "bold",
    color: "ghostwhite",
  },
  nameContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
  },
  detailContainer: {
    width: "100%",
    marginVertical: 10,
    padding: 15,
    backgroundColor: "#2f2f2f",
    borderRadius: 10,
  },
  abilitiesContainer: {
    width: "100%",
    borderRadius: 8,
    padding: 10,
  },
  typesContainer: {
    width: "100%",
    borderRadius: 8,
    padding: 10,
    marginVertical: 7,
  },
  botContainer: {
    width: "100%",
    marginVertical: 5,
    padding: 10,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#3e3e3e",
    elevation: 3,
  },
  titleBot: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  subTitleBot: {
    fontSize: 13,
    color: "white",
    fontWeight: "600",
  },
  statsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    padding: 10,
    backgroundColor: "#3e3e3e",
    borderRadius: 10,
    elevation: 3,
  },
  statColumn: {
    flexBasis: "45%",
    marginVertical: 13,
    marginHorizontal: 3,
  },
  statName: {
    fontSize: 14,
    fontWeight: "600",
    color: "white",
  },
  statValue: {
    fontSize: 13,
    color: "white",
  },
});
