Feature: Home Screen View

    Scenario: Render Pokemon List
        Given I am on the Pokemon list
        When I successfully load Pokemon list
        Then I should see a list of Pokemon
        And I should see a loading indicator when data is being fetched
        And I should see the FlatList component rendered with Pokémon items
        And I should see each Pokemon item rendered with a PokemonCard component
        And I should be able to scroll to the end of the list and load more items

    Scenario: Search works correctly
        Given I am on the Pokemon list
        When I type a search query into the search input
        Then I should see the filtered list of Pokemon based on the search query
        And if the search query is a numeric value, I should see the list of all Pokemon
        And if the search query is empty or contains one character, I should see the full list of Pokemon

    Scenario: Handle fetch error
        Given I get a fetch error when loading Pokemon data
        When the component mounts and attempts to fetch data
        Then I should log the fetch error
        And I should see a loading indicator while the data is being fetched
