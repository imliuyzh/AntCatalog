import { updateFormInput } from '../../../features/internalStateSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function QuarterMenu() {
    let internalState = useSelector(state => state.internalState);
    let internalStateDispatch = useDispatch();

    return (
        <select
            aria-label="Quarter"
            onChange={event => internalStateDispatch(updateFormInput({ quarter: event.target.value }))}
            value={internalState.formInput.quarter}
        >
            <option value="" disabled className="invalid-option">Quarter</option>
            <option value="Fall">Fall</option>
            <option value="Winter">Winter</option>
            <option value="Spring">Spring</option>
        </select>
    );
}
