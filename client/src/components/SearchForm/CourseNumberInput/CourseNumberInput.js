import CreatableSelect from 'react-select/creatable';
import { styles2 } from '../../../utils/searchFormStyles';
import { updateFormInput } from '../../../features/internalStateSlice';
import { useDispatch } from 'react-redux';

export default function CourseNumberInput({ inputRef }) {
    let internalStateDispatch = useDispatch();
    return (
        <CreatableSelect
            aria-label="course-number-input"
            isMulti
            onChange={(newValue, _) => internalStateDispatch(updateFormInput({ courseNumber: newValue.map(({ value }) => value) }))}
            placeholder="Course Number"
            ref={inputRef}
            styles={styles2}
        />
    );
}
