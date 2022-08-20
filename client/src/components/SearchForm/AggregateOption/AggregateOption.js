import { resetCourses } from '../../../features/selectedCoursesSlice';
import { resetResult } from '../../../features/searchResultSlice';
import { updateFormInput } from '../../../features/internalStateSlice';
import { useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/styled';

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

    const handleOnChange = (event) => {
        internalStateDispatch(updateFormInput({ aggregate: event.target.checked }));
        searchResultDispatch(resetResult());
        selectedCoursesDispatch(resetCourses());
    };

    return (
        <AggregateOptionElement>
            <input
                checked={internalState.formInput.aggregate}
                id="aggregate-view"
                onChange={handleOnChange}
                type="checkbox"
            />
            <label htmlFor="aggregate-view">Aggregate View</label>
        </AggregateOptionElement>
    );
}
