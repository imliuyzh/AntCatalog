import { bindActionCreators } from 'redux';
import { InternalContext } from '../../../contexts/InternalStateProvider';
import { ReactComponent as SearchIcon } from '../../../assets/images/search.svg';
import { useContext } from 'react';
import { useDispatch } from 'react-redux';
import styled from '@emotion/styled';
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
        width: 100%;
    }

    #search-icon {
        width: 24px;
    }
`;

export default function SearchButton() {
    let { formInput, openAlert, SERVICES_ENDPOINT, setFormInput, setShowCourseList } = useContext(InternalContext);
	let dispatch = useDispatch();
	let { replaceResults } = bindActionCreators(searchResultActionCreators, dispatch);

    const generateRequestParams = () => {
        return {
            values: {
                term: (formInput.term.trim().length > 0) ? formInput.term : null,
                department: (formInput.department.trim().length > 0) ? formInput.department : null,
                courseNumber: (formInput.courseNumber.trim().length > 0) ? formInput.courseNumber : null,
                courseCode: (formInput.courseCode.trim().length > 0) ? formInput.courseCode : null,
                instructor: (formInput.instructor.trim().length > 0) ? formInput.instructor : null
            },
            options: {
                aggregate: formInput.aggregate,
                offset: 0
            }
        };
    };

    const submitForm = async (event) => {
        event.preventDefault();
        if ((formInput.term.trim().length > 0 
                || formInput.department.trim().length > 0
                || formInput.courseNumber.trim().length > 0
                || formInput.courseCode.trim().length > 0
                || formInput.instructor.trim().length > 0)
                && [true, false].includes(formInput.aggregate)) {
            try {
                let response = await fetch(`${SERVICES_ENDPOINT}/api/search`, {
                    body: JSON.stringify(generateRequestParams()),
                    headers: { 'Content-Type': 'application/json' },
                    method: 'POST'
                });

                switch (response.status) {
                    case 200:
                        let information = await response.json();
                        replaceResults(information.aggregate, information.data);
                        setFormInput({ ...formInput, offset: 0 });
                        if (information.aggregate === false && information.data.length > 0) {
                            setShowCourseList(true);
                        } else if (information.aggregate === true && information.data.length > 0) {
                            setShowCourseList(false);
                        } else {
                            openAlert('Empty search results');
                        }
                        break;
                    case 422:
                        openAlert('Please ensure your search condition is valid');
                        break;
                    case 500: default:
                        openAlert('An expected error occurs, please report to GitHub issues');
                }
            } catch (error) {
                console.error(error);
                openAlert('An expected error occurs, try again');
            }
        } else {
            openAlert('At least one field must be non-empty');
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
