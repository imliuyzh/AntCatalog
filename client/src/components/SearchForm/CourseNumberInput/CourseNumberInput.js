import CreatableSelect from 'react-select/creatable';
import makeAnimated from 'react-select/animated';
import { styles2 } from '../../../utils/SearchForm/utils';
import { updateFormInput } from '../../../features/internalStateSlice';
import { useDispatch } from 'react-redux';

export default function CourseNumberInput() {
    let internalStateDispatch = useDispatch();
    return (
        <CreatableSelect
            components={makeAnimated()}
            isMulti
            onChange={(newValue, _) => internalStateDispatch(updateFormInput({ courseNumber: newValue.map(({ value }) => value)}))}
            placeholder="Course Number"
            styles={styles2}
        />
    );
}
