import { bindActionCreators } from 'redux';
import { InternalContext } from '../../../contexts/InternalStateProvider';
import { Search } from '@icon-park/react';
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
`;

export default function SearchButton() {
    let { formInput, openAlert, setFormInput, setShowCourseList } = useContext(InternalContext);
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
                let response = await fetch('http://localhost:26997/api/v1/search', {
                    body: JSON.stringify(generateRequestParams()),
                    headers: { 'Content-Type': 'application/json' },
                    method: 'POST'
                });
                let information = await response.json();
                replaceResults(information.aggregate, information.data);
                setFormInput({ ...formInput, offset: 0 });
                if (information.aggregate === false) {
                    setShowCourseList(true);
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
            <button
                id="search-button"
                onClick={event => submitForm(event)}
            >
                <Search
                    theme="outline"
                    size="18"
                    fill="#ffffff" 
                />
                Search
            </button>
        </SearchButtonElement>
    );
}
