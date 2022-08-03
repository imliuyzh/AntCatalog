export default function generateRequestParams(formInput, newOffset) {
    return {
        values: {
            year: formInput.year,
            quarter: formInput.quarter,
            department: formInput.department,
            courseNumber: formInput.courseNumber,
            courseCode: formInput.courseCode,
            instructor: formInput.instructor
        },
        options: {
            aggregate: formInput.aggregate,
            offset: newOffset
        }
    };
}
