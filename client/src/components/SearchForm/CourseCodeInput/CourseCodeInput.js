import { updateFormInput } from '../../../features/internalStateSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function CourseCodeInput() {
    let internalState = useSelector(state => state.internalState);
    let internalStateDispatch = useDispatch();

    return (
        <input
            className="input-elements"
            id="course-code"
            onChange={event => internalStateDispatch(updateFormInput({ courseCode: event.target.value }))}
            placeholder="Course Code"
            type="text"
            value={internalState.formInput.courseCode}
        />
    );
}
