import { ReactComponent as ResetIcon } from '../../../assets/images/reset.svg';
import { resetCourses } from '../../../features/selectedCoursesSlice';
import { resetFormInput } from '../../../features/internalStateSlice';
import { resetResult } from '../../../features/searchResultSlice';
import styled from '@emotion/styled';
import { useDispatch } from 'react-redux';

const ResetButtonElement = styled.div`
    margin-bottom: 0;

    #reset-button {
        align-items: center;
        background-color: #f1f3f5;
        border: none;
        color: #333538;
        cursor: pointer;
        display: flex;
        font-family: RedHatText, Arial, sans-serif;
        font-size: 14px;
        gap: 5px;
        justify-content: center;
        margin: 8px 0;
        padding: 8px 0;
        width: 100%;
    }

    #reset-icon {
        width: 24px;
    }
`;

export default function ResetButton({ yearInput, quarterInput, departmentInput, courseNumberInput, courseCodeInput, instructorInput }) {
    let internalStateDispatch = useDispatch(),
        searchResultDispatch = useDispatch(),
        selectedCoursesDispatch = useDispatch();

    const reset = (event) => {
        event.preventDefault();

        yearInput.current.clearValue();
        quarterInput.current.clearValue();
        departmentInput.current.clearValue();
        courseNumberInput.current.clearValue();
        courseCodeInput.current.clearValue();
        instructorInput.current.clearValue();

        internalStateDispatch(resetFormInput());
        searchResultDispatch(resetResult());
        selectedCoursesDispatch(resetCourses());
    };

    return (
        <ResetButtonElement>
            <button id="reset-button" onClick={event => reset(event)} type="button">
                <ResetIcon fill="#333538" id="reset-icon" />
                <span>Reset</span>
            </button>
        </ResetButtonElement>
    );
}
