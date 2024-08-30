import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import { defineFeature, loadFeature } from "jest-cucumber";
import HomeScreen, { Props } from "../../sources/screens/HomeScreen/HomeScreen";
import { mockFetch } from "../types/utils";
import { pokemonListResponseMock } from "../types/mocks";
import { FlatListProps } from "react-native";
import { NameUrl } from "../../sources/types/type";

const feature = loadFeature("../features/HomeScreen.feature");

defineFeature(feature, (test) => {
  let props: Props;
  let wrapper: ShallowWrapper;
  let instance: HomeScreen;

  beforeEach(() => {
    jest.resetModules();
    props = {
      navigation: {
        dispatch: jest.fn(),
        navigate: jest.fn(),
        goBack: jest.fn(),
        push: jest.fn(),
        pop: jest.fn(),
        popToTop: jest.fn(),
        replace: jest.fn(),
        reset: jest.fn(),
        setParams: jest.fn(),
        isFocused: jest.fn(),
        addListener: jest.fn(),
        removeListener: jest.fn(),
      },
      route: {
        key: "Home",
        name: "Home",
      },
    } as unknown as Props;
    window.fetch = mockFetch(pokemonListResponseMock);
    wrapper = shallow(<HomeScreen {...props} />);
    instance = wrapper.instance() as HomeScreen;
  });

  test("Render Pokemon List", ({ given, when, then }) => {
    given("I am on the Home screen", () => {
      // No need to do anything here since beforeEach already handles it
    });

    when("I successfully load the Home screen", async () => {
      await instance.componentDidMount();
      wrapper.update();
    });

    then("I should see a list of Pokemon", () => {
      const updatedFlatListProps = wrapper.find("FlatList").props() as FlatListProps<NameUrl>;
      expect(updatedFlatListProps.data?.length).toBeGreaterThan(0);
    });
  });

  test("Load more Pokemon on scroll", ({ given, when, then }) => {
    given("I have a list of Pokemon", async () => {
      await instance.componentDidMount();
      wrapper.update();
    });

    when("I scroll down to the end", async () => {
      const updatedFlatListProps = wrapper.find("FlatList").props() as FlatListProps<NameUrl>;
      const scrollDownToEndFn = updatedFlatListProps.onEndReached;
      scrollDownToEndFn?.({ distanceFromEnd: 0 });

      // Simulate API call and state update
      wrapper.setState({
        pokemons: [
          ...instance.state.pokemons,
          ...[
            { name: "bulbasaur", url: "mock-url-1" },
            { name: "ivysaur", url: "mock-url-2" },
          ],
        ],
      });
      wrapper.update();
    });

    then("I should see more Pokemon", () => {
      const updatedFlatListProps = wrapper.find("FlatList").props() as FlatListProps<NameUrl>;
      expect(updatedFlatListProps.data?.length).toBeGreaterThan(20); // Assuming initial load is 20
    });
  });
});
