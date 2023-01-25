import CreatableSelect from 'react-select/creatable';
import makeAnimated from 'react-select/animated';
import { styles2 } from '../../../utils/searchFormStyles';
import { updateFormInput } from '../../../features/internalStateSlice';
import { useDispatch } from 'react-redux';
import * as React from 'react';

const animatedComponents = makeAnimated();

const CourseCodeInput = React.forwardRef((_, ref) => {
    let internalStateDispatch = useDispatch();
    return (
        <CreatableSelect
            aria-label="course-code-input"
            components={animatedComponents}
            isMulti
            noOptionsMessage={() => "Please provide 5-digit codes for classes (e.g. 14200, 29000 & 29100)."}
            onChange={(newValue, _) => internalStateDispatch(updateFormInput({ courseCode: newValue.map(({ value }) => value) }))}
            placeholder="Course Codes"
            ref={ref}
            styles={styles2}
        />
    );
});

export default CourseCodeInput;
