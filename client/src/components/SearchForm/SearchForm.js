import AggregateOption from './AggregateOption/AggregateOption';
import CourseCodeInput from './CourseCodeInput/CourseCodeInput';
import CourseNumberInput from './CourseNumberInput/CourseNumberInput';
import DepartmentMenu from './DepartmentMenu/DepartmentMenu';
import InstructorAutocomplete from './InstructorAutocomplete/InstructorAutocomplete';
import QuarterMenu from './QuarterMenu/QuarterMenu';
import ResetButton from './ResetButton/ResetButton';
import SearchButton from './SearchButton/SearchButton';
import styled from '@emotion/styled';
import { useRef } from 'react';
import YearMenu from './YearMenu/YearMenu';

const SearchFormContainerElement = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;

    #search-form {
        padding: 0 56px;
        width: 100%;
    }

    .form-group {
        margin: 48px 0 0;
    }

    .group-elements {
        margin: 8px 0;
    }
`;

export default function SearchForm() {
    let yearInput = useRef(null), quarterInput = useRef(null),
        departmentInput = useRef(null), courseNumberInput = useRef(null),
        courseCodeInput = useRef(null), instructorInput= useRef(null);

    return (
        <SearchFormContainerElement>
            <form id="search-form">
                <div className="form-group">
                    <div className="group-elements">
                        <YearMenu ref={yearInput} />
                    </div>
                    <div className="group-elements">
                        <QuarterMenu ref={quarterInput} />
                    </div>
                </div>

                <div className="form-group">
                    <div className="group-elements">
                        <DepartmentMenu ref={departmentInput} />
                    </div>
                    <div className="group-elements">
                        <CourseNumberInput ref={courseNumberInput} />
                    </div>
                    <div className="group-elements">
                        <CourseCodeInput ref={courseCodeInput} />
                    </div>
                </div>

                <div className="form-group">
                    <div className="group-elements">
                        <InstructorAutocomplete ref={instructorInput} />
                    </div>
                    <div className="group-elements">
                        <AggregateOption />
                    </div>
                </div>

                <div className="form-group">
                    <SearchButton />
                    <ResetButton
                        yearInput={yearInput}
                        quarterInput={quarterInput}
                        departmentInput={departmentInput}
                        courseNumberInput={courseNumberInput}
                        courseCodeInput={courseCodeInput}
                        instructorInput={instructorInput}
                    />
                </div>
            </form>
        </SearchFormContainerElement>
    );
}
