Feature: Pokemon Details

    Scenario: Render Pokemon Details
        Given I am on the Pokemon details
        When I successfully load Pokemon details
        Then I should see Pokemon details

    Scenario: Search works correctly
        Given I am on the Pokemon details page
        When I perform a search
        Then I should see the search results

    Scenario: Handle fetch error
        Given I get a fetch error
        When I mounted the component
        Then I should true error
