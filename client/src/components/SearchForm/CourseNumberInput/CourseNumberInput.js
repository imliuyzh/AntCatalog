import CreatableSelect from 'react-select/creatable';
import { styles2 } from '../../../utils/searchFormStyles';
import { Tooltip } from '@patternfly/react-core';
import { updateFormInput } from '../../../features/internalStateSlice';
import { useDispatch } from 'react-redux';

export default function CourseNumberInput({ inputRef }) {
    let internalStateDispatch = useDispatch();
    return (
        <Tooltip content="Please provide alphanumeric codes for courses (e.g. H2A, 8C & 1020).">
            <CreatableSelect
                aria-label="course-number-input"
                isMulti
                onChange={(newValue, _) => internalStateDispatch(updateFormInput({ courseNumber: newValue.map(({ value }) => value) }))}
                placeholder="Course Numbers"
                ref={inputRef}
                styles={styles2}
            />
        </Tooltip>
    );
}
