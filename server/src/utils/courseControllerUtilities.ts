/**
 * Determine if the field should be included in the final SQL query or not
 * @param field a parameter in request body or query string
 * @returns whether the field should be included in the final SQL query
 */
export function validateField(field: Number[] | string[]): boolean {
    return field !== null && field !== undefined && field.length > 0; 
}
