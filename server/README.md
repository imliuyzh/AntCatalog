# /server

## Structure
### `index.js`
The entry point which starts the entire back end program. To do so, run `npm index.js`.

### `app.js`
This file plays an overarching role in the application. It defines all the endpoints on the back end and how to process exceptions and request/response.

### `/src`
#### `__tests__`
##### `app.test.js`
##### `instructorAutocomplete.test.js`
##### `search.test.js`

#### `db`
##### `data.db`
##### `sequelize.js`

#### `middlewares`
##### `internalErrorHandler.js`
##### `invalidRouteHandler.js`
##### `rateLimiter.js`

#### `routes`
##### `instructorAutocomplete.js`
##### `search.js`

#### `utils`
##### `courseSearchAuxiliaries.js`
##### `instructorList.js`
##### `logger.js`

## Code Analysis and Testing
AntCatalog uses semistandard for code styles. However, AntCatalog actually does not enforce every rule due to readability and potential bugs. AntCatalog also uses Jest and SuperTest for testing. Type `npm run test` to run all the test cases and `npm run jslint` to see test coverage information. As of September 2021, AntCatalog achieved over 98% on overall coverage.
