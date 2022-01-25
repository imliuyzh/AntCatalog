import { bindActionCreators } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import * as internalStateActionCreators from '../../../actions/internalStateActionCreators';

export default function CourseCodeInput() {
    let internalState = useSelector(state => state.internalState);
    let internalStateDispatch = useDispatch();
    let { updateFormInput } = bindActionCreators(internalStateActionCreators, internalStateDispatch);

    return (
        <input
            className="input-elements"
            id="course-code"
            onChange={event => updateFormInput({ courseCode: event.target.value })}
            placeholder="Course Code"
            type="text"
            value={internalState.formInput.courseCode}
        />
    );
}
