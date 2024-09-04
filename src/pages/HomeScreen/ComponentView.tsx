import {
  View,
  FlatList,
  TextInput,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import PokemonCard from "../../components/PokemonCard/PokemonCardView";
import ComponentController from "./ComponentController";

class ControllerView extends ComponentController {
  render() {
    const { search, pokemons, filteredPokemons, loading } = this.state;
    const { navigation } = this.props;

    const isSearchNumeric = !isNaN(Number(search)) && search.trim() !== "";

    return (
      <View style={styles.container}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search your pokemon here"
          placeholderTextColor={"gray"}
          onChangeText={this.handleSearch}
        />
        {loading && (
          <ActivityIndicator
            size="large"
            color="#fff"
            testID="loading-indicator"
          />
        )}
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
              id={item.id}
              images={item.imageUrl}
              name={item.name}
              onPress={() =>
                navigation.navigate("Details", { name: item.name, id: item.id })
              }
            />
          )}
          numColumns={2}
          onEndReached={this.loadMore}
          onEndReachedThreshold={0.5}
        />
      </View>
    );
  }
}
export default ControllerView;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "black",
  },
  searchInput: {
    height: 40,
    marginBottom: 16,
    backgroundColor: "#1f1f1f",
    paddingHorizontal: 8,
    color: "white",
  },
});
