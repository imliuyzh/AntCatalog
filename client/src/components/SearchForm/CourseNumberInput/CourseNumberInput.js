import CreatableSelect from 'react-select/creatable';
import makeAnimated from 'react-select/animated';
import { styles2 } from '../../../utils/searchFormStyles';
import { updateFormInput } from '../../../features/internalStateSlice';
import { useDispatch } from 'react-redux';
import * as React from 'react';

const animatedComponents = makeAnimated();

const CourseNumberInput = React.forwardRef((_, ref) => {
    let internalStateDispatch = useDispatch();
    return (
        <CreatableSelect
            aria-label="course-number-input"
            components={animatedComponents}
            isMulti
            noOptionsMessage={() => "Please provide alphanumeric codes for courses (e.g. H2A, 8C & 102)"}
            onChange={(newValue, _) => internalStateDispatch(updateFormInput({ courseNumber: newValue.map(({ value }) => value) }))}
            placeholder="Course Numbers"
            ref={ref}
            styles={styles2}
        />
    );
});

export default CourseNumberInput;
