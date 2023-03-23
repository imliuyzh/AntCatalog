import AsyncSelect from 'react-select/async';
import debounce from 'lodash/debounce';
import makeAnimated from 'react-select/animated';
import { styles2 } from '../../../utils/searchFormStyles';
import { updateFormInput } from '../../../features/internalStateSlice';
import { useDispatch } from 'react-redux';
import * as React from 'react';

const animatedComponents = makeAnimated();

const loadOptions = debounce((instructorInput, callback) => {
    if (instructorInput.trim().length >= 2) {
        fetch(`${window.ANTCATALOG_SERVICES_ENDPOINT}/instructors?name=${encodeURIComponent(instructorInput)}`)
            .then(response => response.json())
            .then(data => callback(data.matches.map(match => ({
                value: match,
                label: match
            }))))
            .catch(() => callback([]));
    } else {
        callback([]);
    }
}, 200);

const InstructorAutocomplete = React.forwardRef((_, ref) => {
    let internalStateDispatch = useDispatch();
    return (
        <AsyncSelect
            aria-label="instructor-input"
            components={animatedComponents}
            isMulti
            loadOptions={loadOptions}
            noOptionsMessage={() => "No matches."}
            onChange={(newValue) => internalStateDispatch(updateFormInput({ instructor: newValue.map(({ value }) => value) }))}
            placeholder="Instructors"
            ref={ref}
            styles={styles2}
        />
    );
});

export default InstructorAutocomplete;
