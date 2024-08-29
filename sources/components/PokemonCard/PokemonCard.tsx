import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./Styles";

interface PokemonCardProps {
  name: string;
  id: number;
  onPress: () => void;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ name, id, onPress }) => {
  const formattedId = id.toString().padStart(4, "0");

  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <View style={styles.numberContainer}>
        <Text style={styles.number}>#{formattedId}</Text>
      </View>
      <Text style={styles.text}>
        {name.charAt(0).toUpperCase() + name.slice(1)}
      </Text>
    </TouchableOpacity>
  );
};

export default PokemonCard;
