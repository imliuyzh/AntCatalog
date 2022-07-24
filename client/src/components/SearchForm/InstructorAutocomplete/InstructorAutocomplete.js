import AsyncSelect from 'react-select/async';
import debounce from 'lodash/debounce';
import { styles2 } from '../../../utils/searchFormStyles';
import { updateFormInput } from '../../../features/internalStateSlice';
import { useDispatch } from 'react-redux';

const loadOptions = debounce((instructorInput, callback) => {
    try {
        if (instructorInput.trim().length >= 2) {
            fetch(`${window.ANTCATALOG_SERVICES_ENDPOINT}/instructors?name=${encodeURIComponent(instructorInput)}`)
                .then(response => response.json())
                .then(data => callback(data.matches.map(match => ({
                    value: match,
                    label: match
                }))));
        } else {
            callback([]);
        }
    } catch {
        callback([]);
    }
}, 200);

export default function InstructorAutocomplete({ inputRef }) {
    let internalStateDispatch = useDispatch();
    return (
        <AsyncSelect
            aria-label="instructor-input"
            isMulti
            loadOptions={loadOptions}
            onChange={(newValue) => internalStateDispatch(updateFormInput({ instructor: newValue.map(({ value }) => value) }))}
            placeholder="Instructor"
            ref={inputRef}
            styles={styles2}
        />
    );
}
