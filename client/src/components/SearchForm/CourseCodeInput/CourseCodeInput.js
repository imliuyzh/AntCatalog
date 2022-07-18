import CreatableSelect from 'react-select/creatable';
import { styles2 } from '../../../utils/searchFormStyles';
import { updateFormInput } from '../../../features/internalStateSlice';
import { useDispatch } from 'react-redux';

export default function CourseCodeInput({ inputRef }) {
    let internalStateDispatch = useDispatch();
    return (
        <CreatableSelect
            isMulti
            onChange={(newValue, _) => internalStateDispatch(updateFormInput({ courseCode: newValue.map(({ value }) => value) }))}
            placeholder="Course Code"
            ref={inputRef}
            styles={styles2}
        />
    );
}
