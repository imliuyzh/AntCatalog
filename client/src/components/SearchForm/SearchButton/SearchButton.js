import { bindActionCreators } from 'redux';
import { ReactComponent as SearchIcon } from '../../../assets/images/search.svg';
import { useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/styled';
import * as internalStateActionCreators from '../../../actions/internalStateActionCreators';
import * as searchResultActionCreators from '../../../actions/searchResultActionCreators';

const SearchButtonElement = styled.div`
    margin-bottom: 0;

    #search-button {
        align-items: center;
        background-color: #0064a4;
        border: none;
        color: #ffffff;
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

    #search-button:hover {
        transform: scale(1.03);
    }

    #search-icon {
        width: 24px;
    }
`;

export default function SearchButton() {
    let internalState = useSelector(state => state.internalState);
    let internalStateDispatch = useDispatch(), searchResultDispatch = useDispatch();
    let { closeCourseList, showAlert, showCourseList, updateFormInput } = bindActionCreators(internalStateActionCreators, internalStateDispatch);
    let { replaceResults } = bindActionCreators(searchResultActionCreators, searchResultDispatch);

    const generateRequestParams = () => {
        return {
            values: {
                term: (internalState.formInput.term.trim().length > 0) ? internalState.formInput.term : null,
                department: (internalState.formInput.department.trim().length > 0) ? internalState.formInput.department : null,
                courseNumber: (internalState.formInput.courseNumber.trim().length > 0) ? internalState.formInput.courseNumber : null,
                courseCode: (internalState.formInput.courseCode.trim().length > 0) ? internalState.formInput.courseCode : null,
                instructor: (internalState.formInput.instructor.trim().length > 0) ? internalState.formInput.instructor : null
            },
            options: {
                aggregate: internalState.formInput.aggregate,
                offset: 0
            }
        };
    };

    const submitForm = async (event) => {
        event.preventDefault();
        if ((internalState.formInput.term.trim().length > 0
                || internalState.formInput.department.trim().length > 0
                || internalState.formInput.courseNumber.trim().length > 0
                || internalState.formInput.courseCode.trim().length > 0
                || internalState.formInput.instructor.trim().length > 0)
                && [true, false].includes(internalState.formInput.aggregate)) {
            try {
                let response = await fetch(`${window.ANTCATALOG_SERVICES_ENDPOINT}/api/search`, {
                    body: JSON.stringify(generateRequestParams()),
                    headers: { 'Content-Type': 'application/json' },
                    method: 'POST'
                });

                switch (response.status) {
                    case 200:
                        let information = await response.json();
                        replaceResults(information.aggregate, information.data);
                        updateFormInput({ offset: 0 });
                        if (information.aggregate === false && information.data.length > 0) {
                            showCourseList();
                        } else if (information.aggregate === true && information.data.length > 0) {
                            closeCourseList();
                        } else {
                            showAlert('Empty search results');
                        }
                        break;
                    case 422:
                        showAlert('Please ensure your search condition is valid');
                        break;
                    case 500: default:
                        showAlert('An expected error occurs, please report to GitHub issues');
                }
            } catch (error) {
                console.error(error);
                showAlert('An expected error occurs, try again');
            }
        } else {
            showAlert('At least one field must be non-empty');
        }
    };

    return (
        <SearchButtonElement>
            <button id="search-button" onClick={event => submitForm(event)}>
                <SearchIcon fill="#ffffff" id="search-icon" />
                Search
            </button>
        </SearchButtonElement>
    );
}
