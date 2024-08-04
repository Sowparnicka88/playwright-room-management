# playwright-room-management
Overview
This repository contains a set of Playwright tests for managing rooms in an application. The tests include creating, deleting, and verifying rooms within the system.

Project Structure :
    1.pageObjects: Contains page object models for interacting with different parts of the application.
        adminPage.js: Defines interactions with the admin page where rooms are managed.
    2.tests: Contains test scripts for different scenarios.
        createRoom.spec.js: Tests for creating a room in the application.
        deleteRoom.spec.js: Tests for deleting a room from the application.
    3.fixtures: Contains test data or configuration files.
        roomData.js: Provides sample data for testing room creation.
Prerequisites :

    1.Node.js: Ensure Node.js is installed. You can download it from nodejs.org.
    2.Git: Ensure Git is installed. You can download it from git-scm.com.

Setup :
    1. Clone the repository: git clone <https://github.com/Sowparnicka88/playwright-room-management> cd playwright-room-management
    2. Install dependencies:
        npm install
    3.Running Tests:
        npx playwright test
Directory Descriptions:
    1.pageObjects: Contains JavaScript files that define how to interact with the web application.
    2.tests: Contains Playwright test scripts that describe the test scenarios.
    3.fixtures: Contains files that provide test data or configuration required for the tests.
Common Commands:
    1.Run all tests:npx playwright test
    2.Run tests in a specific file:
        npx playwright test tests/createRoom.spec.js --headed
        npx playwright test tests/deleteRoom.spec.js --headed
    3.Generate a test report:
        npx playwright show-report
    

