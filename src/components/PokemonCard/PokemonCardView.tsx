import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import PokemonCardController from "./PokemonCardController";

class PokemonCardView extends PokemonCardController {
  render() {
    const { name, id, images, onPress } = this.props;
    const formattedId = id.toString().padStart(4, "0");

    return (
      <TouchableOpacity
        testID="pokemon-card"
        onPress={onPress}
        style={styles.card}
      >
        <View style={styles.numberContainer}>
          <Text style={styles.number}>#{formattedId}</Text>
        </View>
        <View style={styles.detailContainer}>
          <Image
            testID="pokemon-image"
            source={{ uri: images }}
            style={styles.images}
            resizeMode="stretch"
          />
          <Text style={styles.text}>{name.toUpperCase()}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export default PokemonCardView;

export const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 8,
    padding: 8,
    backgroundColor: "#1f1f1f",
    borderRadius: 10,
    elevation: 3,
  },
  numberContainer: {
    width: 55,
    height: 35,
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
  detailContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  images: {
    width: 100,
    height: 100,
    marginVertical: 5,
  },
  text: {
    fontSize: 18,
    fontWeight: "400",
    color: "white",
    letterSpacing: 0.8,
    marginTop: 6,
  },
});
