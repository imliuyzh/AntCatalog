import CreatableSelect from 'react-select/creatable';
import makeAnimated from 'react-select/animated';
import { styles2 } from '../../../utils/SearchForm/utils';
import { updateFormInput } from '../../../features/internalStateSlice';
import { useDispatch } from 'react-redux';

export default function CourseCodeInput() {
    let internalStateDispatch = useDispatch();
    return (
        <CreatableSelect
            components={makeAnimated()}
            isMulti
            onChange={(newValue, _) => internalStateDispatch(updateFormInput({ courseCode: newValue.map(({ value }) => value)}))}
            placeholder="Course Code"
            styles={styles2}
        />
    );
}
