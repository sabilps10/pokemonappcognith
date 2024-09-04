import { shallow, ShallowWrapper } from "enzyme";
import { FlatList, ActivityIndicator, TextInput } from "react-native";
import ControllerView from "../../ComponentView";
import PokemonCard from "../../../../components/PokemonCard/PokemonCardView";
import { mockPokemonList, mockPokemonCard } from "../../../../values/values";

describe("ControllerView", () => {
  let wrapper: ShallowWrapper;
  let instance: ControllerView;
  let consoleErrorSpy: jest.SpyInstance;

  const props = {
    navigation: {
      navigate: jest.fn(),
    } as any,
    route: {
      params: {
        id: 1,
        name: "Bulbasaur",
      },
    } as any, // Mock route params as needed
  };

  beforeEach(() => {
    jest.resetModules();

    consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});

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
    instance = wrapper.instance() as ControllerView;

    jest.spyOn(instance, "loadMore");
    jest.spyOn(instance, "handleSearch");
  });

  afterEach(() => {
    jest.clearAllMocks();
    consoleErrorSpy.mockRestore();
  });

  test("Render Pokemon List", () => {
    instance.setState({ pokemons: mockPokemonList.results, loading: false });
    wrapper.update();

    expect(wrapper.find(FlatList).exists()).toBe(true);
    expect(wrapper.find(ActivityIndicator).exists()).toBe(false);
    expect(wrapper.find(FlatList).props().data).toEqual(
      mockPokemonList.results
    );

    // Check if each PokemonCard is rendered
    expect(
      wrapper
        .find(FlatList)
        .children()
        .every((child) => child.type() === PokemonCard)
    ).toBe(true);

    // Simulate scrolling to the end of the list
    const flatlist = wrapper.find(FlatList).props();
    flatlist.onEndReached?.({ distanceFromEnd: 0 });
    expect(instance.loadMore).toBeCalled();
  });

  test("Search works correctly", () => {
    // Simulate typing a search query
    const search = "Bulbasaur";
    instance.setState({ search });
    instance.handleSearch(search);
    wrapper.update(); // Ensure the component re-renders

    expect(wrapper.find(FlatList).props().data).toEqual(
      search.length <= 1
        ? mockPokemonList.results
        : mockPokemonList.results.filter((pokemon) =>
            pokemon.name.toLowerCase().includes(search.toLowerCase())
          )
    );
  });

  test("Handle fetch error", async () => {
    global.fetch = jest.fn(() =>
      Promise.reject(new Error("Fetch error"))
    ) as jest.Mock;

    await instance.componentDidMount();

    expect(consoleErrorSpy).toHaveBeenCalledWith(expect.any(Error));
    expect(wrapper.find(ActivityIndicator).exists()).toBe(true); // Should see a loading indicator while fetching
  });
});
