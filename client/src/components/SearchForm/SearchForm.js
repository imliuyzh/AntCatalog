import AggregateOption from './AggregateOption/AggregateOption';
import CourseCodeInput from './CourseCodeInput/CourseCodeInput';
import CourseNumberInput from './CourseNumberInput/CourseNumberInput';
import DepartmentMenu from './DepartmentMenu/DepartmentMenu';
import InstructorAutocomplete from './InstructorAutocomplete/InstructorAutocomplete';
import logo from '../../assets/images/logo.png';
import React from 'react';
import ResetButton from './ResetButton/ResetButton';
import QuarterMenu from './QuarterMenu/QuarterMenu';
import SearchButton from './SearchButton/SearchButton';
import styled from '@emotion/styled';

const SearchFormContainerElement = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;

    #search-form {
	    margin: 0 56px;
    }

    #logo {
	    width: 80%;
    }

    .form-group {
	    margin: 48px 0;
    }

    .form-group-with-less-bottom-margin {
	    margin: 48px 0 20px;
    }

    .select-menu {
	    align-items: center;
	    display: grid;
	    grid-template-areas: 'select';
    }

    .select-menu select {
	    appearance: none;
	    background-color: transparent;
	    border: 1.5px solid #aab3bc;
	    color: #aab3bc;
	    cursor: pointer;
	    font-family: FFKievitSlabWebProBook, 'Times New Roman', serif;
	    font-size: 14px;
	    line-height: 25px;
	    margin: 0;
	    padding: 4px 18px;
	    width: 100%;
    }
    
    @-moz-document url-prefix() {
        .select-menu select {
            text-indent: -2px;
        }
    }

    .select-menu select:focus {
	    outline: none;
    }

    .select-menu::after  {
	    background-color: #aab3bc;
	    clip-path: polygon(100% 0%, 0 0%, 50% 100%);
	    content: '';
	    height: 0.4em;
	    justify-self: end;
	    margin-right: 8px;
	    width: 0.7em;
    }

    select,
    .select-menu:after {
	    grid-area: select;
    }

    .group-elements {
	    margin: 8px 0;
    }

    input[type="text"],
    input[type="text"]:focus {
	    background-color: #ffffff;
	    border: 1.5px solid #aab3bc;
	    box-sizing: border-box;
	    color: #aab3bc;
	    font-family: FFKievitSlabWebProBook, 'Times New Roman', serif;
	    font-size: 14px;
	    line-height: 25px;
	    outline: none;
	    padding: 4px 18px;
	    width: 100%;
    }

    input::placeholder {
	    color: #aab3bc;
	    opacity: 1;
    }
`;

export default function SearchForm() {
	return (
        <SearchFormContainerElement>
            <img src={logo} id="logo" alt="AntCatalog Logo" />
            <form id="search-form">
                <div className="form-group select-menu">
                    <QuarterMenu />
                </div>

                <div className="form-group">
                    <div className="group-elements select-menu">
                        <DepartmentMenu />
                    </div>
                    <div className="group-elements">
                        <CourseNumberInput />
                    </div>
                    <div className="group-elements">
                        <CourseCodeInput />
                    </div>
                </div>

                <div className="form-group">
                    <div className="group-elements">
                        <InstructorAutocomplete />
                    </div>
                    <div className="group-elements">
                        <AggregateOption />
                    </div>
                </div>

                <div className="form-group-with-less-bottom-margin">
                    <SearchButton />
                    <ResetButton />
                </div>
            </form>
        </SearchFormContainerElement>
    );
}

