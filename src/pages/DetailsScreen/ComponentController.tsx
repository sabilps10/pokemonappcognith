import { Component } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/type";
import { getPokemonDetails } from "../../services/api";

export interface Props
  extends NativeStackScreenProps<RootStackParamList, "Details"> {}

export interface State {
  pokemon: any | null;
  loading: boolean;
}
class ComponentController extends Component<Props, State> {
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
}

export default ComponentController;
