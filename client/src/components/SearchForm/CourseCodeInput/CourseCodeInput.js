import CreatableSelect from 'react-select/creatable';
import { styles2 } from '../../../utils/searchFormStyles';
import { Tooltip } from '@patternfly/react-core';
import { updateFormInput } from '../../../features/internalStateSlice';
import { useDispatch } from 'react-redux';

export default function CourseCodeInput({ inputRef }) {
    let internalStateDispatch = useDispatch();
    return (
        <Tooltip content="Please provide 5-digit codes for classes (e.g. 14200, 29000 & 29100).">
            <CreatableSelect
                aria-label="course-code-input"
                isMulti
                onChange={(newValue, _) => internalStateDispatch(updateFormInput({ courseCode: newValue.map(({ value }) => value) }))}
                placeholder="Course Codes"
                ref={inputRef}
                styles={styles2}
            />
        </Tooltip>
    );
}
