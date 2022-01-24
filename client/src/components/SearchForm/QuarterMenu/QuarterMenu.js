import { bindActionCreators } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import * as internalStateActionCreators from '../../../actions/internalStateActionCreators';

export default function QuarterMenu() {
    let internalState = useSelector(state => state.InternalState);
    let internalStateDispatch = useDispatch();
    let { updateFormInput } = bindActionCreators(internalStateActionCreators, internalStateDispatch);

    return (
        <select
            onChange={event => updateFormInput({ term: event.target.value })}
            value={internalState.formInput.term}
        >
            <option value="" disabled className="invalid-option">Term</option>
            <option value="Spring 2021">2021 Spring Quarter</option>
            <option value="Winter 2021">2021 Winter Quarter</option>
            <option value="Fall 2020">2020 Fall Quarter</option>
            <option value="Spring 2020">2020 Spring Quarter</option>
            <option value="Winter 2020">2020 Winter Quarter</option>
            <option value="Fall 2019">2019 Fall Quarter</option>
            <option value="Spring 2019">2019 Spring Quarter</option>
            <option value="Winter 2019">2019 Winter Quarter</option>
            <option value="Fall 2018">2018 Fall Quarter</option>
            <option value="Spring 2018">2018 Spring Quarter</option>
            <option value="Winter 2018">2018 Winter Quarter</option>
            <option value="Fall 2017">2017 Fall Quarter</option>
            <option value="Spring 2017">2017 Spring Quarter</option>
            <option value="Winter 2017">2017 Winter Quarter</option>
            <option value="Fall 2016">2016 Fall Quarter</option>
            <option value="Spring 2016">2016 Spring Quarter</option>
            <option value="Winter 2016">2016 Winter Quarter</option>
            <option value="Fall 2015">2015 Fall Quarter</option>
            <option value="Spring 2015">2015 Spring Quarter</option>
            <option value="Winter 2015">2015 Winter Quarter</option>
            <option value="Fall 2014">2014 Fall Quarter</option>
            <option value="Spring 2014">2014 Spring Quarter</option>
            <option value="Winter 2014">2014 Winter Quarter</option>
            <option value="Fall 2013">2013 Fall Quarter</option>
        </select>
    );
}
