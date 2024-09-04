import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import { defineFeature, loadFeature } from "jest-cucumber";
import { View, Text, ActivityIndicator } from "react-native";
import ComponentController from "../../ComponentController";
import { mockDetailPokemon } from "../../../../values/values";
import { getPokemonDetails } from "../../../../services/api";

// Load feature file
const feature = loadFeature("../features/ComponentController.feature");

defineFeature(feature, (test) => {
  let wrapper: ShallowWrapper;
  let instance: ComponentController;

  beforeEach(() => {
    jest.resetModules();

    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    // Mock the API call
    jest
      .spyOn(getPokemonDetails, "default")
      .mockImplementation(() => Promise.resolve(mockDetailPokemon));

    // Create a mock route object
    const mockRoute = {
      key: "mockKey",
      name: "Details",
      params: {
        id: 1,
      },
    };

    // Create a mock navigation object
    const mockNavigation = {
      navigate: jest.fn(),
      goBack: jest.fn(),
      // Add other navigation methods if necessary
    };

    wrapper = shallow(
      <ComponentController
        route={mockRoute as any} // TypeScript type assertion
        navigation={mockNavigation as any} // TypeScript type assertion
      />
    );
    instance = wrapper.instance() as ComponentController;

    jest.spyOn(instance, "componentDidMount");

    afterEach(() => {
      jest.clearAllMocks();
      consoleErrorSpy.mockRestore();
    });
  });

  test("Render Pokemon Details", ({ given, when, then }) => {
    given("I am on the Pokémon details page", () => {});

    when("I successfully load Pokémon details", async () => {
      instance.componentDidMount();
      await new Promise(setImmediate); // Ensure state updates and re-rendering
      wrapper.update();
    });

    then("I should see the Pokémon details", () => {
      // Assuming `pokemon` is set correctly in state and UI renders it
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
      jest
        .spyOn(getPokemonDetails, "default")
        .mockImplementation(() => Promise.reject(new Error("Fetch error")));
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
