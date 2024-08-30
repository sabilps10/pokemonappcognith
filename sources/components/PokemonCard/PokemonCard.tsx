import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { styles } from "./Styles";

interface PokemonCardProps {
  name: string;
  id: number;
  images: string | undefined;
  onPress: () => void;
}

const PokemonCard: React.FC<PokemonCardProps> = ({
  name,
  id,
  images,
  onPress,
}) => {
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
};

export default PokemonCard;
