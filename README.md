# QA TEST WEB APP

## Project Overview
This project contains automated test for the User Registration flow, which includes registration, login and password reset

## Tech Stack
- Playwright
- TypeScript

### Prerequisites
- git
- NodeJS

## Installation

Clone repository
```
git clone https://github.com/lb-ilic/qa-test-web-app.git
```

Navigate into the project folder
```
cd qa-test-web-app
```

Install dependencies
```
npm install
npx playwright install
```

## Run the tests

Run all tests
```
npm run test
```

Run all tests in headed mode
```
npm run test:headed
```

## Test Reports
Automation execution reports are available in folder `/reports` and are generated automatically after test execution

Open lates test report
```
npm run test:report
```

## Project structure
- `pages/` - Page Object Models
- `tests/` - test specifications