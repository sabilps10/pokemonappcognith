import { shallow, ShallowWrapper } from "enzyme";
import { defineFeature, loadFeature } from "jest-cucumber";
import { Text, Image } from "react-native";
import ComponentView from "../../ComponentView";
import { mockDetailPokemon } from "../../../../values/values";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../../../../types/type";

const feature = loadFeature("../features/ComponentView.feature");

defineFeature(feature, (test) => {
  let wrapper: ShallowWrapper;
  let instance: ComponentView;

  let props = {
    navigation: {
      navigate: jest.fn(),
    } as any,
    route: {
      key: "details",
      name: "Details",
      params: {
        id: mockDetailPokemon.id,
        name: mockDetailPokemon.name,
      },
    } as RouteProp<RootStackParamList, "Details">,
  };

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

    wrapper = shallow(
      <ComponentView navigation={props.navigation} route={props.route} />
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
      const formattedId = props.route.params.id.toString().padStart(4, "0");
      const idText = wrapper.find(Text).at(0);
      expect(idText.props().children).toContain(`#${formattedId}`);
    });

    then("I should see Pokemon's name", () => {
      const nameText = wrapper.find(Text).at(1);
      expect(nameText.props().children).toBe(mockDetailPokemon.name);
    });

    then("I should see Pokemon's abilities", () => {
      const abilitiesText = wrapper.find(Text).filterWhere((node) => {
        const children = node.props().children;
        return typeof children === "string" && children.includes("Abilities");
      });
      expect(abilitiesText.exists()).toBe(true);
    });

    then("I should see Pokemon's types", () => {
      const typesText = wrapper.find(Text).filterWhere((node) => {
        const children = node.props().children;
        return typeof children === "string" && children.includes("Types");
      });
      expect(typesText.exists()).toBe(true);
    });

    then("I should see Pokemon's stats", () => {
      const statsText = wrapper.find(Text).filterWhere((node) => {
        const children = node.props().children;
        return typeof children === "string" && children.includes("Stats");
      });
      expect(statsText.exists()).toBe(true);
    });
  });

  test("Handle fetch error", ({ given, when, then }) => {
    given("I encounter a fetch error while loading Pokemon details", () => {
      global.fetch = jest.fn(() =>
        Promise.reject(new Error("Fetch error"))
      ) as jest.Mock;
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
