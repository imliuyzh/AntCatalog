import AsyncSelect from 'react-select/async';
import debounce from 'lodash/debounce';
import makeAnimated from 'react-select/animated';
import { styles2 } from '../../../utils/SearchForm/utils';
import { updateFormInput } from '../../../features/internalStateSlice';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function InstructorAutocomplete() {
    let internalState = useSelector(state => state.internalState);
    let internalStateDispatch = useDispatch();

    // eslint-disable-next-line
    const loadOptions = useCallback(
        debounce((instructorInput, callback) => {
            if (instructorInput.length >= 2) {
                fetch(`${window.ANTCATALOG_SERVICES_ENDPOINT}/instructors?name=${encodeURIComponent(instructorInput)}`)
                    .then(response => response.json())
                    .then(data => callback(data.matches.map(match => ({
                        value: match,
                        label: match
                    }))));
            } else {
                callback([]);
            }
        }, 300),
        []
    );

    return (
        <AsyncSelect
            components={makeAnimated()}
            isMulti
            loadOptions={loadOptions}
            onChange={(newValue) => internalStateDispatch(updateFormInput({ instructor: newValue.map(({ value }) => value) }))}
            options={internalState.formInput.instructor}
            placeholder="Instructor"
            styles={styles2}
        />
    );
}
