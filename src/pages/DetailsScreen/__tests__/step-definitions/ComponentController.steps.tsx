import { shallow, ShallowWrapper } from "enzyme";
import { defineFeature, loadFeature } from "jest-cucumber";
import { Text, Image, ActivityIndicator, View } from "react-native";
import ComponentController from "../../ComponentController";
import { mockDetailPokemon } from "../../../../values/values";
import { getPokemonDetails } from "../../../../services/api";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../../../../types/type";

const feature = loadFeature("../features/ComponentController.feature");

jest.mock("../../services/api");

defineFeature(feature, (test) => {
  let wrapper: ShallowWrapper;
  let instance: ComponentController;

  const props = {
    navigation: {
      navigate: jest.fn(),
    } as any,
    route: {
      key: "details", // Include the 'key' property
      name: "Details", // Include the 'name' property
      params: {
        id: 1, // Assuming the ID is passed as a route parameter
      },
    } as RouteProp<RootStackParamList, "Details">,
  };

  beforeEach(() => {
    jest.resetModules();

    wrapper = shallow(<ComponentController {...props} />);
    instance = wrapper.instance() as ComponentController;

    jest.spyOn(instance, "fetchPokemonDetails");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Render Pokemon Details", ({ given, when, then }) => {
    given("I am on the Pokemon details screen", () => {});

    when("I successfully load Pokemon details", async () => {
      (getPokemonDetails as jest.Mock).mockResolvedValue(mockDetailPokemon);
      await instance.componentDidMount();
      wrapper.update();
    });

    then("I should see Pokemon's image", () => {
      const image = wrapper.find(Image);
      const imageUri = mockDetailPokemon.sprites?.front_default; // Handle undefined
      const imageSource = image.props().source as { uri: string }; // Type assertion
      expect(imageSource.uri).toBe(imageUri);
    });

    then("I should see Pokemon's ID", () => {
      const text = wrapper.find(Text).at(0);
      expect(text.contains(`ID: ${mockDetailPokemon.id}`)).toBe(true);
    });

    then("I should see Pokemon's name", () => {
      const text = wrapper.find(Text).at(1);
      expect(text.contains(mockDetailPokemon.name)).toBe(true);
    });

    then("I should see Pokemon's abilities", () => {
      const abilitiesText = wrapper.find(Text).at(2);
      const abilities = mockDetailPokemon.abilities
        .map((ability: any) => ability.ability.name)
        .join(", ");
      expect(abilitiesText.contains(`Abilities: ${abilities}`)).toBe(true);
    });

    then("I should see Pokemon's types", () => {
      const typesText = wrapper.find(Text).at(3);
      const types = mockDetailPokemon.types
        .map((type: any) => type.type.name)
        .join(", ");
      expect(typesText.contains(`Types: ${types}`)).toBe(true);
    });

    then("I should see Pokemon's stats", () => {
      const statsText = wrapper.find(Text).at(4);
      const stats = mockDetailPokemon.stats
        .map((stat: any) => `${stat.stat.name}: ${stat.base_stat}`)
        .join(", ");
      expect(statsText.contains(`Stats: ${stats}`)).toBe(true);
    });
  });

  test("Handle fetch error", ({ given, when, then }) => {
    given("I encounter a fetch error while loading Pokemon details", () => {
      (getPokemonDetails as jest.Mock).mockRejectedValue(
        new Error("Fetch error")
      );
    });

    when("I mount the component", async () => {
      await instance.componentDidMount();
    });

    then("I should see an error message or indication of an error", () => {
      const consoleErrorSpy = jest
        .spyOn(console, "error")
        .mockImplementation(() => {});
      expect(consoleErrorSpy).toHaveBeenCalledWith(expect.any(Error));
      consoleErrorSpy.mockRestore();
    });
  });
});
