---
layout: layout.hbs
---

# Features

## Feature: Chatroom

``` gherkin
Feature: Chat with other users
  Display an empty chatroom when there are no messages
  Messages should be shown after they are submitted
  All people in the chatroom can read all messages

  Scenario: Send a message
    Given I am logged in
    And I have written a message
    When I press the “submit” button
    Then the message shows up in the chatroom

  Scenario: Read a message
    Given I am logged in
    And someone ese has submitted a message
    When I'm in the chatroom
    Then I can read the message
```

## Feature: Project View

``` gherkin
Feature: View all projects 
  All projects should be displayed in terms of a list view

  Scenario: Add a new project
    Given I am a user of this application
    When I click on “ADD A NEW PROJECT” button
    Then I should be presented with a form to fill in all details of the project
    And the project name does not already exist
    And I click on the “SUBMIT” button
    Then I should be able to see this new project in my list of all projects
```

## Feature: Task View

``` gherkin
Feature: View all the tasks for a particular project 
  Task should not display if the user is not a project collaborator 
  All tasks for a project should be shown in terms of a list view

  Scenario: Display tasks based on task filtering  
    Given a particular project is chosen
    And I choose a sorting categories given in the task filtering feature
    When I press the “DISPLAY” button
    Then display all the tasks that match the given category

  Scenario: Add a new task
    Given a particular project is chosen
    And I press the “ADD A NEW TASK” button
    And I am presented with a new task form
    And all the details for a new task have been entered
    When I press the “SUBMIT” button
    Then the new task along with all its details should be populated in the tasks for the project
```

## Feature: Task Filtering

``` gherkin
Feature: Filter tasks by category
  Task should not display unless in category specified
  If there are no tasks for a given category then no tasks should be displayed

  Scenario: Filter tasks by priority
    Given all tasks have priority levels
    And I filter for a particular priority level
    When I press the filter button
    Then I should see all tasks of the specified priority

  Scenario: Filter tasks by status
    Given all tasks are assigned to completion statuses
    And I filter for a particular completion status
    When I press the filter button
    Then I should see all tasks with that specific completion status

  Scenario: Tasks have no status or priority
    Given no tasks have priority levels or completion status
    And I filter for a particular priority or completion status
    When I press the filter button
    Then I should see no tasks
```

## Feature: Notification

``` gherkin
Feature: Notify users of messages and events
  Users should not be able to see any notification before logging in
  Notification should pop out  when a new message is sent to the user
  Notification should pop out when the time is at some task’s notification time the user set
  Notification should pop out when a new task is assigned to a user

  Scenario: Notify users of a new message
    Given a new message is sent to me
    And I have logged in
    Then I should get a notification of a new message
  
  Scenario: Notify users of a task deadline
    Given there is a task with an upcoming notification time 
    And I have logged in
    Then I should get a notification of a task with approaching deadline

  Scenario: Notify users of a new task assigned to me 
    Given there is a new task assigned to me 
    And I have logged in
    Then I should get a notification of a new task assigned to me
```


# Examples

## Feature: Usage

``` gherkin
Feature: Usage
  As a user of Cucumber.js
  I want to have documentation on Cucumber
  So that I can concentrate on building awesome applications

  Scenario: Reading documentation
    Given I am on the Cucumber.js GitHub repository
    When I go to the README file
    Then I should see "Usage" as the page title
```

## Feature: Serve Coffee

``` gherkin
Feature: Serve coffee
  Coffee should not be served until paid for
  Coffee should not be served until the button has been pressed
  If there is no coffee left then money should be refunded

  Scenario: Buy last coffee
    Given there are 1 coffees left in the machine
    And I have deposited 1$
    When I press the coffee button
    Then I should be served a coffee

  Scenario: No more coffees
    Given there is no coffee left in the machine
    And I have deposited $1
    When I press the coffee button
    Then I should be refunded $1
```