Feature: Pokemon List

    Scenario: Render Pokemon List
        Given I am on the Pokemon list
        When I successfully load Pokemon list
        Then I should see a list of Pokemon
        Then I should see flatlist item rendered
        Then I reach the end of the List
    
    Scenario: Search works correctly
        Given I am on the Pokemon details page
        When I perform a search
        Then I should navigate to the details page

    Scenario: Handle fetch error
        Given I get a fetch error
        When I mounted the component
        Then I should log errors
