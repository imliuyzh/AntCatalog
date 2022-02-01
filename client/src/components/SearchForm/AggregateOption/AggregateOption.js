import { bindActionCreators } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/styled';
import * as internalStateActionCreators from '../../../actions/internalStateActionCreators';
import * as searchResultActionCreators from '../../../actions/searchResultActionCreators';
import * as selectedCoursesActionCreators from '../../../actions/selectedCoursesActionCreators';

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
    let internalState = useSelector(state => state.internalState);
    let internalStateDispatch = useDispatch(),
        searchResultDispatch = useDispatch(),
        selectedCoursesDispatch = useDispatch();
    let { updateFormInput } = bindActionCreators(internalStateActionCreators, internalStateDispatch);
    let { replaceResults } = bindActionCreators(searchResultActionCreators, searchResultDispatch);
    let { resetCourses } = bindActionCreators(selectedCoursesActionCreators, selectedCoursesDispatch);

    return (
        <AggregateOptionElement>
            <input
                checked={internalState.formInput.aggregate}
                id="aggregate-view"
                onChange={event => {
                    updateFormInput({ aggregate: event.target.checked });
                    resetCourses();
                    replaceResults(null, []);
                }}
                type="checkbox"
            />
            <label htmlFor="aggregate-view">Aggregate View</label>
        </AggregateOptionElement>
    );
}
