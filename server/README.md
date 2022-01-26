# `/server`

## Structure
### `/src`
### `index.ts`
The entry point which starts the entire back end program.

### `app.ts`
This file plays an overarching role in the application. It defines all the endpoints on the back end and how to process exceptions and request/response.

#### `/__tests__`
##### `app.test.ts`
The test file for `app.js` which targets on invalid entry and server errors.

##### `instructorAutocomplete.test.ts`
The test file for `/complete/instructors` which focuses on instructor name autocomplete.

##### `search.test.ts`
The test file for `/api/search` which focuses on course search.

#### `/db`
##### `data.db`
A SQLite database containing course information.
```
    CREATE TABLE Course (
        course_id INTEGER,
        term TEXT NOT NULL,
        course_code INTEGER NOT NULL,
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
        CONSTRAINT CoursePrimaryKey PRIMARY KEY (course_id)
    );

    CREATE TABLE Instructor (
        course_id INTEGER,
        name TEXT,
        CONSTRAINT InstructorPrimaryKey PRIMARY KEY (course_id, name),
        CONSTRAINT InstructorCourseIdForeignKey FOREIGN KEY (course_id) REFERENCES Course(course_id) ON DELETE CASCADE
    );

    CREATE VIEW InstructorView AS
        SELECT
            I.course_id,
            GROUP_CONCAT(I.name, '/') AS names
        FROM Instructor I
        GROUP BY I.course_id;
```

##### `sequelize.ts`
A file connecting to the SQLite database above.

#### `/locust`
##### `locustfile.py`
The program for performing stress testing. To run it:
1. Navigate to this directory
2. Run `python3 -m venv .` or `python -m venv .` (may need to install python3-venv if on Linux)
3. Run `source bin/activate` (Linux) or `cd Scripts && activate`
4. Run `locust -f ./locustfile.py --host=http://localhost:26997`
   + Execute `npm run dev` in `/server` beforehand
   + Run `sysctl -w fs.file-max=500000` if the system open file limit is too low (this is in console messages)
5. Open http://0.0.0.0:8089 and type 100 and 50
6. Press start swarming

##### `requirements.txt`
Dependencies to `locustfile.py`.

#### `/middlewares`
##### `internalErrorHandler.ts`
A file for handling server errors (HTTP 500).

##### `invalidRouteHandler.ts`
A file for handling errors where the location specified is not valid (HTTP 404).

##### `rateLimiter.ts`
A file for limiting five requests per second.

#### `/routes`
##### `instructorAutocomplete.ts`
The file for handling the `/complete/instructors` endpoint which focuses on instructor name autocomplete. It will read all instructors from `data.db` by calling the function in `instructorList.js`. It accepts only one argument called `name` in the query string: `/complete/instructors?name=`.

##### `search.ts`
The file for handling the `/api/search` endpoint which focuses on course search. It accepts a JSON object in the body:
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
      /* Indicate true to combine all matches into one. */
      "aggregate": boolean,
      
      /* The number of results to skip over. Optional (default is 0), ignored when aggregate is true. */
      "offset": number
    }
  }
```

#### `/utils`
##### `courseSearchAuxiliaries.ts`
Most of the work in `/api/search` is actually being done here. The code in this file will fetch all relating classes based on the values provided.

##### `instructorList.ts`
A file for fetching all instructors in the database.

##### `logger.ts`
A file for reporting user request information like IP address and body content in a file under the generated `/logs` folder.

## Code Analysis and Testing
AntCatalog uses Jest and SuperTest for testing. Type `npm run test` to run all the test cases and `npm run coverage` to see test coverage information. As of September 2021, AntCatalog achieved over 98% on overall coverage.
