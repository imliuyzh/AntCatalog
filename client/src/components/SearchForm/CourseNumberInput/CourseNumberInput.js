import { bindActionCreators } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import * as internalStateActionCreators from '../../../actions/internalStateActionCreators';

export default function CourseNumberInput() {
    let internalState = useSelector(state => state.InternalState);
	let internalStateDispatch = useDispatch();
    let { updateFormInput } = bindActionCreators(internalStateActionCreators, internalStateDispatch);
    
    return (
        <input
            className="input-elements"
            id="course-number"
            onChange={event => updateFormInput({ courseNumber: event.target.value })}
            placeholder="Course Number"
            type="text"
            value={internalState.formInput.courseNumber}
        />
    );
}
