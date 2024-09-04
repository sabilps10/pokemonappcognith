import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import { defineFeature, loadFeature } from "jest-cucumber";
import { View, Text, Image, ActivityIndicator } from "react-native";
import ComponentView from "../../ComponentView";
import { mockDetailPokemon } from "../../../../values/values";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../../../../types/type";

const feature = loadFeature("../features/ComponentView.feature");

defineFeature(feature, (test) => {
  let wrapper: ShallowWrapper;
  let instance: ComponentView;

  beforeEach(() => {
    jest.resetModules();

    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockDetailPokemon),
      })
    ) as jest.Mock;

    // Create a mock route object
    const mockRoute: RouteProp<RootStackParamList, "Details"> = {
      key: "mockKey",
      name: "Details",
      params: {
        id: 1,
        name: "Pikachu",
      },
    };

    // Create a mock navigation object
    const mockNavigation = {
      navigate: jest.fn(),
      goBack: jest.fn(),
      // Add other navigation methods if necessary
    };

    wrapper = shallow(
      <ComponentView
        route={mockRoute}
        navigation={mockNavigation as any} // TypeScript type assertion
      />
    );
    instance = wrapper.instance() as ComponentView;

    jest.spyOn(instance, "componentDidMount");

    afterEach(() => {
      jest.clearAllMocks();
      consoleErrorSpy.mockRestore();
    });
  });

  test("Render Pokemon Details", ({ given, when, then }) => {
    given("I am on the Pokemon details screen", () => {});

    when("I successfully load Pokemon details", async () => {
      instance.componentDidMount();
      await new Promise(setImmediate);
      wrapper.update();
    });

    then("I should see the Pokemon details", () => {
      expect(wrapper.find(Image).prop("source")).toEqual({
        uri: mockDetailPokemon.sprites.front_default,
      });

      expect(wrapper.find(Text).at(0).text()).toContain(
        `#${mockDetailPokemon.id.toString().padStart(4, "0")}`
      );
      expect(wrapper.find(Text).at(1).text()).toBe(
        mockDetailPokemon.name.charAt(0).toUpperCase() +
          mockDetailPokemon.name.slice(1)
      );

      const abilities = mockDetailPokemon.abilities.map(
        (ability: { ability: { name: string } }) => ability.ability.name
      );
      const abilityTexts = wrapper.findWhere(
        (node) => node.type() === Text && abilities.includes(node.text())
      );
      expect(abilityTexts.length).toBe(abilities.length);

      const types = mockDetailPokemon.types.map(
        (type: { type: { name: string } }) => type.type.name
      );
      const typeTexts = wrapper.findWhere(
        (node) => node.type() === Text && types.includes(node.text())
      );
      expect(typeTexts.length).toBe(types.length);
    });

    then("I should see the loading indicator initially", () => {
      expect(wrapper.find(ActivityIndicator).exists()).toBe(true);
    });
  });

  test("Handle fetch error", async ({ given, when, then }) => {
    given("I get a fetch error", () => {
      global.fetch = jest.fn(() =>
        Promise.reject(new Error("Fetch error"))
      ) as jest.Mock;
    });

    when("I mount the component", async () => {
      await instance.componentDidMount();
    });

    then("I should log errors", () => {
      const consoleErrorSpy = jest
        .spyOn(console, "error")
        .mockImplementation(() => {});

      expect(consoleErrorSpy).toHaveBeenCalledWith(expect.any(Error));

      consoleErrorSpy.mockRestore();
    });
  });
});
