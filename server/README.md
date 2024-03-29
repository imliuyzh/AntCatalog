# `/server`

## Structure
### `/src`
### index.ts
The entry point which starts the entire back end program.

### app.ts
This file plays an overarching role in the application. It defines all the endpoints on the back end and how to process exceptions and request/response.

#### `/__tests__`
##### app.test.ts
The test file for `app.js` which targets on invalid entry and server errors.

##### courseRouter.test.ts
The test file for `/courses` which focuses on course search.

##### instructorRouter.test.ts
The test file for `/instructors` which focuses on instructor name autocomplete.

#### `/benchmark`
##### locustfile.py
The program for performing stress testing. To run it:
1. Navigate to this directory
2. Run `python3 -m venv .` or `python -m venv .` (may need to install python3-venv if on Linux)
3. Run `source bin/activate` (Linux) or `cd Scripts && activate` (Windows)
   + Install the necessary packages with `pip install -r requirements.txt`
4. Execute `npm run build` and `NODE_ENV=test node ./build/index.js` in `/server`
5. Run `locust -f ./locustfile.py --host=http://localhost:26997`
   + Run `sysctl -w fs.file-max=500000` if the open file limit is too low
6. Open http://0.0.0.0:8089 and provide numeric values like 100 and 50
7. Press `Start Swarming`

##### requirements.txt
Dependencies to `locustfile.py`.

#### `/controllers`
##### courseController.ts
The file for handling the `/courses` endpoint which is about course search. It accepts a JSON object in the body as shown below. Note that every field, except `options["aggregate"]`, is optional.
```
  {
    "values": {
      "year": number[]?,
      "quarter": string[]?,
      "department": string[]?,
      "courseNumber": string[]?,
      "courseCode": number[]?,
      "instructor": string[]?
    },
    "options": {
      "aggregate": boolean, /* Indicate true to combine all matches into one. */
      "offset": number?  /* The number of results to skip over (default to 0). It is ignored when aggregate is set to true. */
    }
  }
```

##### instructorController.ts
The file for handling the `/instructors` endpoint which focuses on instructor name autocomplete. It will read all instructors from `data.db` by calling the function `loadInstructors()`. It accepts only one argument called `name` in the query string: `/instructors?name=`.

#### `/db`
##### data.db
A SQLite database containing course information with the following schema:
```sql
CREATE TABLE Course (
    course_id INTEGER,
    year INTEGER NOT NULL,
    quarter TEXT NOT NULL,
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

##### sequelize.ts
A file connecting to the SQLite file database above.

#### `/middlewares`
##### courseRateLimiter.ts
A file for limiting five requests per second for the `/courses` endpoint.

##### internalErrorHandler.ts
A file for handling malformed JSON request bodies as well as server errors (HTTP 400 & HTTP 500).

##### invalidMethodHandler.ts
A file for handling errors where an invalid method is specified (HTTP 405).

##### invalidRequestSchemaHandler.ts
A file for handling wrong user request format (HTTP 422).

##### invalidRouteHandler.ts
A file for handling errors where an invalid location is specified (HTTP 404).

#### `/routes`
##### courseRouter.ts
Top-level declaration file for the corresponding controller.

##### instructorRouter.ts
Top-level declaration file for the corresponding controller.

#### `/utils`
##### logger.ts
A file for reporting user request information like IP address and body content in a file under the generated `/logs` folder.

## Testing
AntCatalog uses Jest and SuperTest for testing. Type `npm run test` to run all the test cases and `npm run coverage` to see test coverage information. As of June 2023, the back end service achieved 97% statement coverage and 95% branch coverage.
