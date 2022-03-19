import { bindActionCreators } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import * as internalStateActionCreators from '../../../actions/internalStateActionCreators';

export default function YearMenu() {
    let internalState = useSelector(state => state.internalState);
    let internalStateDispatch = useDispatch();
    let { updateFormInput } = bindActionCreators(internalStateActionCreators, internalStateDispatch);

    return (
        <select
            onChange={event => updateFormInput({ year: event.target.value })}
            value={internalState.formInput.year}
        >
            <option value="" disabled className="invalid-option">Year</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
            <option value="2020">2020</option>
            <option value="2019">2019</option>
            <option value="2018">2018</option>
            <option value="2017">2017</option>
            <option value="2016">2016</option>
            <option value="2015">2015</option>
            <option value="2014">2014</option>
            <option value="2013">2013</option>
        </select>
    );
}
