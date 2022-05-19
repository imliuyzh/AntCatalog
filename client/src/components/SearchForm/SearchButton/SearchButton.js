import { closeCourseList, showAlert, showCourseList, updateFormInput } from '../../../features/internalStateSlice';
import { ReactComponent as SearchIcon } from '../../../assets/images/search.svg';
import { replaceResult } from '../../../features/searchResultSlice';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';

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
        width: 100%;
    }

    #search-icon {
        width: 24px;
    }
`;

export default function SearchButton() {
    let internalState = useSelector(state => state.internalState);
    let internalStateDispatch = useDispatch(), searchResultDispatch = useDispatch();

    const generateRequestParams = () => {
        return {
            values: {
                year: (internalState.formInput.year.trim().length > 0) ? parseInt(internalState.formInput.year) : null,
                quarter: (internalState.formInput.quarter.trim().length > 0) ? internalState.formInput.quarter : null,
                department: (internalState.formInput.department.trim().length > 0) ? internalState.formInput.department : null,
                courseNumber: (internalState.formInput.courseNumber.trim().length > 0) ? internalState.formInput.courseNumber : null,
                courseCode: (internalState.formInput.courseCode.trim().length > 0) ? parseInt(internalState.formInput.courseCode) : null,
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
        try {
            let response = await fetch(`${window.ANTCATALOG_SERVICES_ENDPOINT}/courses`, {
                body: JSON.stringify(generateRequestParams()),
                headers: { 'Content-Type': 'application/json' },
                method: 'POST'
            });

            switch (response.status) {
                case 200:
                    let information = await response.json();
                    searchResultDispatch(replaceResult({
                        isAggregateData: information.aggregate,
                        data: information.data
                    }));
                    internalStateDispatch(updateFormInput({ offset: 0 }));
                    if (information.aggregate === false && information.data.length > 0) {
                        internalStateDispatch(showCourseList());
                    } else if (information.aggregate === true && information.data.length > 0) {
                        internalStateDispatch(closeCourseList());
                    } else {
                        internalStateDispatch(showAlert('Empty search results'));
                    }
                    break;
                case 422:
                    internalStateDispatch(showAlert('Please ensure your search condition is valid'));
                    break;
                case 500: default:
                    internalStateDispatch(showAlert('An unexpected error occurs, please report to GitHub issues'));
            }
        } catch (error) {
            console.error(error);
            internalStateDispatch(showAlert('An unexpected error occurs, try again'));
        }
    };

    return (
        <SearchButtonElement>
            <button id="search-button" onClick={async (event) => await submitForm(event)} type="submit">
                <SearchIcon fill="#ffffff" id="search-icon" />
                Search
            </button>
        </SearchButtonElement>
    );
}
