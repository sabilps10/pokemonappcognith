import { shallow, ShallowWrapper } from "enzyme";
import { FlatList, ActivityIndicator } from "react-native";
import ComponentController from "../../ComponentController";
import { mockPokemonList, mockPokemonCard } from "../../../../values/values";
import {
  getPokemonList,
  getPokemonDetailsList,
  getPokemonDetails,
} from "../../../../services/api";

// Define the type for the API functions
type GetPokemonList = (limit: number, offset: number) => Promise<any>;
type GetPokemonDetailsList = (query: string) => Promise<any>;
type GetPokemonDetails = (id: number) => Promise<any>;

// Mock the module and functions
jest.mock("../../services/api", () => ({
  getPokemonList: jest.fn() as jest.MockedFunction<GetPokemonList>,
  getPokemonDetailsList: jest.fn() as jest.MockedFunction<GetPokemonDetailsList>,
  getPokemonDetails: jest.fn() as jest.MockedFunction<GetPokemonDetails>,
}));

describe("ComponentController", () => {
  let wrapper: ShallowWrapper;
  let instance: ComponentController;
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

    // Create type assertion for the mocked functions
    const getPokemonListMock = getPokemonList as jest.MockedFunction<GetPokemonList>;
    const getPokemonDetailsListMock = getPokemonDetailsList as jest.MockedFunction<GetPokemonDetailsList>;
    const getPokemonDetailsMock = getPokemonDetails as jest.MockedFunction<GetPokemonDetails>;

    getPokemonListMock.mockResolvedValue(mockPokemonList);
    getPokemonDetailsMock.mockResolvedValue(mockPokemonCard);

    wrapper = shallow(<ComponentController {...props} />);
    instance = wrapper.instance() as ComponentController;

    jest.spyOn(instance, "loadMore");
    jest.spyOn(instance, "handleSearch");
  });

  afterEach(() => {
    jest.clearAllMocks();
    consoleErrorSpy.mockRestore();
  });

  test("Render Pokemon List", async () => {
    await instance.fetchPokemons();
    wrapper.update();

    expect(wrapper.find(FlatList).exists()).toBe(true);
    expect(wrapper.find(ActivityIndicator).exists()).toBe(false);

    // Ensure FlatList is rendered with Pokémon items
    const flatlist = wrapper.find(FlatList).props();
    expect(flatlist.data).toEqual(mockPokemonList.results);

    // Simulate scrolling to the end of the list
    flatlist.onEndReached?.({ distanceFromEnd: 0 });
    expect(instance.loadMore).toBeCalled();
  });

  test("Search works correctly", async () => {
    const search = "Bulbasaur";
    const numericSearch = "1";
    const emptySearch = "";

    const getPokemonDetailsListMock = getPokemonDetailsList as jest.MockedFunction<GetPokemonDetailsList>;
    getPokemonDetailsListMock.mockResolvedValue(mockPokemonCard);
    const getPokemonDetailsMock = getPokemonDetails as jest.MockedFunction<GetPokemonDetails>;
    getPokemonDetailsMock.mockResolvedValue(mockPokemonCard);

    await instance.handleSearch(search);
    wrapper.update();

    // Test search functionality
    const state = wrapper.state() as any; // Type assertion for state
    expect(state.filteredPokemons).toEqual([mockPokemonCard]);

    // Test numeric search
    await instance.handleSearch(numericSearch);
    wrapper.update();
    expect(state.pokemons).toEqual([mockPokemonCard]);

    // Test empty search
    await instance.handleSearch(emptySearch);
    wrapper.update();
    expect(state.pokemons).toEqual(mockPokemonList.results);
  });

  test("Handle fetch error", async () => {
    const getPokemonListMock = getPokemonList as jest.MockedFunction<GetPokemonList>;
    getPokemonListMock.mockRejectedValue(new Error("Fetch error"));

    await instance.componentDidMount();
    expect(consoleErrorSpy).toHaveBeenCalledWith(expect.any(Error));
    expect(wrapper.find(ActivityIndicator).exists()).toBe(true);
  });
});
