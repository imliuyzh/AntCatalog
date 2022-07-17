import AggregateOption from './AggregateOption/AggregateOption';
import CourseCodeInput from './CourseCodeInput/CourseCodeInput';
import CourseNumberInput from './CourseNumberInput/CourseNumberInput';
import DepartmentMenu from './DepartmentMenu/DepartmentMenu';
import InstructorAutocomplete from './InstructorAutocomplete/InstructorAutocomplete';
import QuarterMenu from './QuarterMenu/QuarterMenu';
import ResetButton from './ResetButton/ResetButton';
import SearchButton from './SearchButton/SearchButton';
import styled from '@emotion/styled';
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
        margin: 48px 0;
    }

    .form-group-with-less-bottom-margin {
        margin: 48px 0 20px;
    }

    .group-elements {
        margin: 8px 0;
    }
`;

export default function SearchForm() {
    return (
        <SearchFormContainerElement>
            <form id="search-form">
                <div className="form-group">
                    <div className="group-elements">
                        <YearMenu />
                    </div>
                    <div className="group-elements">
                        <QuarterMenu />
                    </div>
                </div>

                <div className="form-group">
                    <div className="group-elements">
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
