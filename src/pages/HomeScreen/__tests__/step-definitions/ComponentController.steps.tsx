import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import { defineFeature, loadFeature } from "jest-cucumber";
import {
  FlatList,
  FlatListProps,
  TextInput,
  ActivityIndicator,
} from "react-native";
import ComponentController from "../../ComponentController";
import PokemonCard from "../../../../components/PokemonCard/PokemonCardView";
import { mockPokemonCard, mockPokemonList } from "../../../../values/values";

const feature = loadFeature("../features/ComponentController.feature");

defineFeature(feature, (test) => {
  let wrapper: ShallowWrapper;
  let instance: ComponentController;

  const props = {
    navigation: {
      navigate: jest.fn(),
    } as any,
    route: {
      params: {
        id: 1, // Ensure this matches the expected parameter in ComponentController
      },
    } as any, // Adjust type as necessary to match RootStackParamList
  };

  beforeEach(() => {
    jest.resetModules();

    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    global.fetch = jest.fn((url) => {
      if (url.includes(mockPokemonList.next)) {
        return Promise.resolve({
          json: () => Promise.resolve(mockPokemonList),
        });
      }
      return Promise.resolve({
        json: () => Promise.resolve(mockPokemonCard),
      });
    }) as jest.Mock;

    wrapper = shallow(<ComponentController {...props} />);
    instance = wrapper.instance() as ComponentController;

    jest.spyOn(instance, "loadMore");
    jest.spyOn(instance, "handleSearch");

    afterEach(() => {
      jest.clearAllMocks();
      consoleErrorSpy.mockRestore();
    });
  });

  test("Render Pokemon List", ({ given, when, then }) => {
    given("I am on the Pokemon list", () => {});

    when("I successfully load the Pokemon list", async () => {
      await new Promise(setImmediate);
      wrapper.update();
    });

    then("I should see a loading indicator when data is being fetched", () => {
      wrapper.setState({ loading: true });
      const activityIndicator = wrapper.find(ActivityIndicator);
      expect(activityIndicator.exists()).toBe(true);
    });

    then("I should see a list of Pokemon", () => {
      const flatListProps = wrapper.find(FlatList).props() as FlatListProps<{
        id: number;
        name: string;
        imageUrl: string;
      }>;

      expect(flatListProps.data?.length).toEqual(
        mockPokemonList.results.length
      );
    });

    then(
      "I should see the FlatList component rendered with Pokémon items",
      () => {
        expect(wrapper.find(FlatList).exists()).toBe(true);
      }
    );

    then(
      "I should see each Pokemon item rendered with a PokemonCard component",
      () => {
        const renderItem = wrapper.find(FlatList).props().renderItem as any;
        const itemWrapper = shallow(renderItem({ item: mockPokemonCard }));

        const card = itemWrapper.find(PokemonCard);
        expect(card.exists()).toBe(true);
        expect(card.props().name).toBe(mockPokemonCard.name);
      }
    );

    then(
      "I should be able to scroll to the end of the list and load more items",
      () => {
        const flatList = wrapper.find(FlatList).props();
        flatList.onEndReached?.({ distanceFromEnd: 0 });

        expect(instance.loadMore).toBeCalled();
      }
    );
  });

  test("Search works correctly", ({ given, when, then }) => {
    given("I am on the Search Pokemon list", () => {});

    when("I type a search query into the search input", () => {
      wrapper.find(TextInput).props().onChangeText?.(mockPokemonCard.name);
    });

    then(
      "I should see the filtered list of Pokemon based on the search query",
      () => {
        expect(instance.handleSearch).toBeCalledWith(mockPokemonCard.name);
        const flatListProps = wrapper.find(FlatList).props() as FlatListProps<{
          id: number;
          name: string;
          imageUrl: string;
        }>;
        expect(flatListProps.data).toEqual([mockPokemonCard]);
      }
    );

    then(
      "if the search query is a numeric value, I should see the list of all Pokemon",
      () => {
        wrapper.find(TextInput).props().onChangeText?.("25");
        expect(instance.handleSearch).toBeCalledWith("25");
      }
    );

    then(
      "if the search query is empty or contains one character, I should see the full list of Pokemon",
      () => {
        wrapper.find(TextInput).props().onChangeText?.("");
        expect(instance.handleSearch).toBeCalledWith("");

        wrapper.find(TextInput).props().onChangeText?.("a");
        expect(instance.handleSearch).toBeCalledWith("a");
      }
    );
  });

  test("Handle fetch error", ({ given, when, then }) => {
    given("I get a fetch error when loading Pokemon data", () => {
      global.fetch = jest.fn(() =>
        Promise.reject(new Error("Fetch error"))
      ) as jest.Mock;
    });

    when("the component mounts and attempts to fetch data", async () => {
      await instance.componentDidMount();
    });

    then("I should log the fetch error", () => {
      const consoleErrorSpy = jest
        .spyOn(console, "error")
        .mockImplementation(() => {});
      expect(consoleErrorSpy).toHaveBeenCalledWith(expect.any(Error));
      consoleErrorSpy.mockRestore();
    });

    then(
      "I should see a loading indicator while the data is being fetched",
      () => {
        wrapper.setState({ loading: true });
        const activityIndicator = wrapper.find(ActivityIndicator);
        expect(activityIndicator.exists()).toBe(true);
      }
    );
  });
});
