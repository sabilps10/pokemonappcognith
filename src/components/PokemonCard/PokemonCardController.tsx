import { Component } from "react";

interface State {
  name: string;
  id: number;
  images: string | undefined;
  onPress: () => void;
}

class PokemonCardController extends Component<State> {}

export default PokemonCardController;
