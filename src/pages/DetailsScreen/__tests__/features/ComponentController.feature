Feature: Details Screen View

  Scenario: Render Pokemon Details
    Given I am on the Pokemon details screen
    When I successfully load Pokemon details
    Then I should see Pokemon's image
    Then I should see Pokemon's ID
    Then I should see Pokemon's name
    Then I should see Pokemon's abilities
    Then I should see Pokemon's types
    Them I should see Pokemon's stats

  Scenario: Handle fetch error
    Given I encounter a fetch error while loading Pokemon details
    When I mount the component
    Then I should see an error message or indication of an error
