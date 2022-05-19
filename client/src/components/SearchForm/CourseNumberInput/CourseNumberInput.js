import { updateFormInput } from '../../../features/internalStateSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function CourseNumberInput() {
    let internalState = useSelector(state => state.internalState);
    let internalStateDispatch = useDispatch();
    
    return (
        <input
            className="input-elements"
            id="course-number"
            onChange={event => internalStateDispatch(updateFormInput({ courseNumber: event.target.value }))}
            placeholder="Course Number"
            type="text"
            value={internalState.formInput.courseNumber}
        />
    );
}
