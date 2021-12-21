import { bindActionCreators } from 'redux';
import { InternalContext } from '../../../contexts/InternalStateProvider';
import { useContext } from 'react';
import { useDispatch } from 'react-redux';
import styled from '@emotion/styled';
import * as searchResultActionCreators from '../../../actions/searchResultActionCreators';

const AggregateOptionElement = styled.div`
    display: inline-flex;
    margin: 0;

    input[type="checkbox"] {
	    margin: auto 3px auto 0;
    }

    label {
	    color: #aab3bc;
	    font-family: FFKievitSlabWebProBook, 'Times New Roman', serif;
	    font-size: 14px;
    }
`;

export default function AggregateOption() {
    let { formInput, setFormInput, setSelectedCourses } = useContext(InternalContext);
	let dispatch = useDispatch();
	let { replaceResults } = bindActionCreators(searchResultActionCreators, dispatch);

    return (
        <AggregateOptionElement>
            <input
                checked={formInput.aggregate}
                id="aggregate-view"
                onChange={event => {
                    setFormInput({ ...formInput, aggregate: event.target.checked});
                    setSelectedCourses({});
                    replaceResults(null, []);
                }}
                type="checkbox"
            />
            <label htmlFor="aggregate-view">Aggregate View</label>
        </AggregateOptionElement>
    );
}
