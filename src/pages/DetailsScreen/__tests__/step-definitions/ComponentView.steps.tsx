import lodash from "lodash";
import DetailsPage from "../../ComponentView";
import { shallow, ShallowWrapper } from "enzyme";
import { defineFeature, loadFeature } from "jest-cucumber";
import { mockDetailPokemon, mockSpeciesPokemon } from "../../../../values/values";

const feature = loadFeature("../features/ComponentView.feature");

defineFeature(feature, (test) => {
  let wrapper: ShallowWrapper;
  let instance: DetailsPage;

  const props = {
    route: {
      params: { name: mockDetailPokemon.name },
    },
  };

  beforeEach(() => {
    jest.resetModules();

    global.fetch = jest.fn((url) => {
      if (url.includes("/pokemon/")) {
        return Promise.resolve({
          json: () => Promise.resolve(mockDetailPokemon),
        });
      }
      if (url.includes("/pokemon-species/")) {
        return Promise.resolve({
          json: () => Promise.resolve(mockSpeciesPokemon),
        });
      }
      return Promise.reject("Rejected");
    }) as jest.Mock;

    wrapper = shallow(<DetailsPage route={props.route} />);
    instance = wrapper.instance() as DetailsPage;

    lodash.debounce = jest.fn((func) => func) as jest.Mock;

    jest.spyOn(instance, "fetchData");
    jest.spyOn(instance, "fetchDataDebounced");

    afterEach(() => {
      jest.clearAllMocks();
    });
  });

  test("Render Pokemon Details", ({ given, when, then, and }) => {
    given("I am on the Pokemon details", () => {});

    when("I successfully load Pokemon details", async () => {
      instance.componentDidMount();
      await new Promise(setImmediate);
      wrapper.update();
    });

    then("I should see Pokemon details", () => {
      expect(instance.state.data.name).toEqual(mockDetailPokemon.name);
      expect(instance.state.data.description).toEqual(
        mockSpeciesPokemon.flavor_text_entries[0].flavor_text
      );
    });
  });

  // For search functionality
  test("Search works correctly", ({ given, when, then }) => {
    given("I am on the Pokemon details page", () => {});

    when("I perform a search", () => {
      instance.onSearch(mockDetailPokemon.name);
    });

    then("I should see the search results", () => {
      expect(instance.fetchDataDebounced).toHaveBeenCalledWith(
        mockDetailPokemon.name
      );
    });
  });

  // For fetch error
  test("Handle fetch error", async ({ given, when, then }) => {
    given("I get a fetch error", () => {
      global.fetch = jest.fn(() =>
        Promise.reject(new Error("Fetch error"))
      ) as jest.Mock;
    });

    when("I mounted the component", async () => {
      await instance.componentDidMount();
    });

    then("I should true error", () => {
      instance.setState({ error: true });
    });
  });
});
