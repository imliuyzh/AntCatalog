import { bindActionCreators } from 'redux';
import { ReactComponent as ResetIcon } from '../../../assets/images/reset.svg';
import { useDispatch } from 'react-redux';
import styled from '@emotion/styled';
import * as internalStateActionCreators from '../../../actions/internalStateActionCreators';
import * as searchResultActionCreators from '../../../actions/searchResultActionCreators';
import * as selectedCoursesActionCreators from '../../../actions/selectedCoursesActionCreators';

const ResetButtonElement = styled.div`
    margin-bottom: 0;

    #reset-button {
        align-items: center;
        background-color: #efefef;
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
        transition: all 1s;
        width: 100%;
    }

    #reset-button:hover {
        transform: scale(1.03);
    }

    #reset-icon {
        width: 24px;
    }
`;

export default function ResetButton() {
    let internalStateDispatch = useDispatch(),
        searchResultDispatch = useDispatch(),
        selectedCoursesDispatch = useDispatch();
    let { updateFormInput } = bindActionCreators(internalStateActionCreators, internalStateDispatch);
    let { replaceResults } = bindActionCreators(searchResultActionCreators, searchResultDispatch);
    let { resetCourses } = bindActionCreators(selectedCoursesActionCreators, selectedCoursesDispatch);

    const reset = (event) => {
        event.preventDefault();
        updateFormInput({
            term: '',
            department: '',
            courseNumber: '',
            courseCode: '',
            instructor: '',
            aggregate: false,
            offset: 0
        });
        resetCourses();
        replaceResults(null, []);
    };

    return (
        <ResetButtonElement>
            <button id="reset-button" onClick={event => reset(event)}>
                <ResetIcon fill="#333538" id="reset-icon" />
                Reset
            </button>
        </ResetButtonElement>
    );
}
