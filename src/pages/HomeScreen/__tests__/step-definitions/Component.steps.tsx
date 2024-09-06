import { shallow, ShallowWrapper } from "enzyme";
import { defineFeature, loadFeature } from "jest-cucumber";
import { FlatList, TextInput, ActivityIndicator } from "react-native";
import ControllerView from "../../ComponentView";
import PokemonCard from "../../../../components/PokemonCard/PokemonCardView";
import { mockPokemonList, mockPokemonCard } from "../../../../values/values";

const feature = loadFeature("../features/ComponentView.feature");

defineFeature(feature, (test) => {
  let wrapper: ShallowWrapper;
  jest.mock("node:assert");
  jest.mock("node:net");

  const props = {
    navigation: {
      navigate: jest.fn(),
    } as any,
    route: {
      params: {
        id: 1,
        name: "Bulbasaur",
      },
    } as any,
  };

  beforeEach(() => {
    jest.resetModules();

    global.fetch = jest.fn((url) => {
      if (url.includes("next")) {
        return Promise.resolve({
          json: () => Promise.resolve(mockPokemonList),
        });
      }
      return Promise.resolve({
        json: () => Promise.resolve(mockPokemonCard),
      });
    }) as jest.Mock;

    wrapper = shallow(<ControllerView {...props} />);

    jest.spyOn(wrapper.instance() as any, "loadMore");
    jest.spyOn(wrapper.instance() as any, "handleSearch");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Render Pokemon List", ({ given, when, then }) => {
    given("I am on the Pokemon list", () => {});

    when("I successfully load Pokemon list", async () => {
      // Wait for asynchronous state updates triggered by fetch
      await new Promise(setImmediate);
    });

    then("I should see a loading indicator when data is being fetched", () => {
      wrapper.setState({ loading: true });
      expect(wrapper.find(ActivityIndicator).exists()).toBe(true);
    });

    then("I should see a list of Pokemon", () => {
      wrapper.setState({ pokemons: mockPokemonList.results, loading: false });
      expect(wrapper.find(FlatList).exists()).toBe(true);
      expect(wrapper.find(FlatList).props().data).toEqual(
        mockPokemonList.results
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
        expect(itemWrapper.find(PokemonCard).exists()).toBe(true);
      }
    );

    then(
      "I should be able to scroll to the end of the list and load more items",
      () => {
        const flatlistProps = wrapper.find(FlatList).props();
        flatlistProps.onEndReached?.({ distanceFromEnd: 0 });
        expect((wrapper.instance() as any).loadMore).toBeCalled();
      }
    );
  });

  test("Search works correctly", ({ given, when, then }) => {
    given("I am on the Search Pokemon list", () => {});

    when("I type a search query into the search input", () => {
      const searchQuery = "Bulbasaur";
      wrapper.find(TextInput).props().onChangeText?.(searchQuery);
      (wrapper.instance() as any).handleSearch(searchQuery);
    });

    then(
      "I should see the filtered list of Pokemon based on the search query",
      () => {
        expect(wrapper.find(FlatList).props().data).toEqual(
          mockPokemonList.results.filter((pokemon) =>
            pokemon.name.toLowerCase().includes("bulbasaur")
          )
        );
      }
    );

    then(
      "if the search query is a numeric value, I should see the list of all Pokemon",
      () => {
        const searchQuery = "1";
        wrapper.setState({ search: searchQuery });
        (wrapper.instance() as any).handleSearch(searchQuery);

        expect(wrapper.find(FlatList).props().data).toEqual(
          mockPokemonList.results
        );
      }
    );

    then(
      "if the search query is empty or contains one character, I should see the full list of Pokemon",
      () => {
        const searchQuery = "";
        wrapper.setState({ search: searchQuery });
        (wrapper.instance() as any).handleSearch(searchQuery);

        expect(wrapper.find(FlatList).props().data).toEqual(
          mockPokemonList.results
        );
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
      await new Promise(setImmediate);
      // No need to manually trigger a wrapper update
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
        expect(wrapper.find(ActivityIndicator).exists()).toBe(true);
      }
    );
  });
});

