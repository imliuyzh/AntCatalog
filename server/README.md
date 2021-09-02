# `/server`

## Structure
### `index.js`
The entry point which starts the entire back end program. To do so, run `npm index.js`.

### `app.js`
This file plays an overarching role in the application. It defines all the endpoints on the back end and how to process exceptions and request/response.

### `/src`
#### `/__tests__`
##### `app.test.js`
The test file for `app.js` which targets on invalid entry and server errors.

##### `instructorAutocomplete.test.js`
The test file for `/complete/instructors` which focuses on instructor name autocomplete.

##### `search.test.js`
The test file for `/api/v1/search` which focuses on course search.

#### `/db`
##### `data.db`
A SQLite database containing course information.
```
  CREATE TABLE Course (
      term TEXT,
      course_code INTEGER,
      department TEXT NOT NULL,
      course_number TEXT NOT NULL,
      course_title TEXT NOT NULL,
      grade_a_count INTEGER NOT NULL,
      grade_b_count INTEGER NOT NULL,
      grade_c_count INTEGER NOT NULL,
      grade_d_count INTEGER NOT NULL,
      grade_f_count INTEGER NOT NULL,
      grade_p_count INTEGER NOT NULL,
      grade_np_count INTEGER NOT NULL,
      gpa_avg REAL NOT NULL,
      CONSTRAINT CoursePrimaryKey PRIMARY KEY (term, course_code)
  );
  
  CREATE TABLE Instructor (
      term TEXT,
      course_code INTEGER,
      name TEXT,
      CONSTRAINT InstructorPrimaryKey PRIMARY KEY (term, course_code, name),
      CONSTRAINT InstructorTermForeignKey FOREIGN KEY (term) REFERENCES Course(term),
      CONSTRAINT InstructorCourseCodeForeignKey FOREIGN KEY (course_code) REFERENCES Course(course_code) ON DELETE CASCADE
  );
```

##### `sequelize.js`
A file connecting to the SQLite database above.

#### `/middlewares`
##### `internalErrorHandler.js`
A file for handling server errors (HTTP 500).

##### `invalidRouteHandler.js`
A file for handling errors where the location specified is not valid (HTTP 404).

##### `rateLimiter.js`
A file for limiting two requests per second.

#### `/routes`
##### `instructorAutocomplete.js`
The file for handling the `/complete/instructors` endpoint which focuses on instructor name autocomplete. It will read all instructors from `data.db` by calling the function in `instructorList.js`. It accepts only one argument called `name` in the query string: `/complete/instructors?name=`.

##### `search.js`
The file for handling the `/api/v1/search` endpoint which focuses on course search. It accepts a JSON object in the body:
```
  {
    /* At least one of these five fields must not be null/undefined. */
    "values": {
      /* e.g. "Spring 2021", "Fall 2015" */
      "term": string,
      
      /* See front end dropdown menu for acceptable parameters (e.g. "COMPSCI", "EDUC"). */
      "department": string,
      
      /* e.g. "161", "45J" */
      "courseNumber": string,
      
      /* e.g. 02250, 35780 */
      "courseCode": number,
      
      /* e.g. "KLEFSTAD, R.", "GOODRICH, M." */
      "instructor": string
    },
    
    "options": {
      /* Indicate true to summarize all matches into one. */
      "aggregate": boolean,
      
      /* Optional (default is 0), ignored when aggregate is true. */
      "offset": number
    }
  }
```

#### `/utils`
##### `courseSearchAuxiliaries.js`
##### `instructorList.js`
##### `logger.js`

## Code Analysis and Testing
AntCatalog uses semistandard for code styles. However, AntCatalog actually does not enforce every rule due to readability and potential bugs. AntCatalog also uses Jest and SuperTest for testing. Type `npm run test` to run all the test cases and `npm run jslint` to see test coverage information. As of September 2021, AntCatalog achieved over 98% on overall coverage.
