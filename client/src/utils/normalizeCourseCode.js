export default function normalizeCourseCode(code) {
    let digits = ['0', '0', '0', '0', '0'], courseCode = code.toString();
    let arrayIndex = 4, courseCodeIndex = courseCode.length - 1;
    while (courseCodeIndex >= 0) {
        digits[arrayIndex] = courseCode[courseCodeIndex];
        --courseCodeIndex;
        --arrayIndex;
    }
    return digits.join('');
}
