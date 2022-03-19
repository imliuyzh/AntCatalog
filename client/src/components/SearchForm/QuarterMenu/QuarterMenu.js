import { bindActionCreators } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import * as internalStateActionCreators from '../../../actions/internalStateActionCreators';

export default function QuarterMenu() {
    let internalState = useSelector(state => state.internalState);
    let internalStateDispatch = useDispatch();
    let { updateFormInput } = bindActionCreators(internalStateActionCreators, internalStateDispatch);

    return (
        <select
            onChange={event => updateFormInput({ quarter: event.target.value })}
            value={internalState.formInput.quarter}
        >
            <option value="" disabled className="invalid-option">Quarter</option>
            <option value="Fall">Fall</option>
            <option value="Winter">Winter</option>
            <option value="Spring">Spring</option>
        </select>
    );
}
