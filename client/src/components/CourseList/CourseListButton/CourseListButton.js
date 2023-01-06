import { ReactComponent as ListIcon } from '../../../assets/images/list.svg';
import { showAlert, showCourseList } from '../../../features/internalStateSlice';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';

const CourseListButtonContainerElement = styled.button`
    align-items: center;
    background-color: #ffffff;
    border: none;
    color: #aab3bc;
    cursor: pointer;
    display: flex;
    font-family: FFKievitSlabWebProBook, 'Times New Roman', serif;
    font-size: 14px;
    gap: 2px;
    justify-content: center;
    margin-top: 2px;
    outline: none;

    #list-icon {
        width: 24px;
    }

    span {
        color: #aab3bc;
    }
`;

export default function CourseListButton() {
    let internalState = useSelector(state => state.internalState),
        searchResultState = useSelector(state => state.searchResult);
    let internalStateDispatch = useDispatch();

    const handleOnClick = () => {
        if (searchResultState.isAggregateData) {
            internalStateDispatch(showAlert('Course list is disabled for aggregated data.'));
        } else if (searchResultState.isAggregateData !== true && searchResultState.data.length === 0) {
            internalStateDispatch(showAlert('Please search for courses.'));
        } else if (internalState.isFormModified) {
            internalStateDispatch(showAlert('Please search with new conditions in the form.'));
        } else if (searchResultState.data.length === 0) {
            internalStateDispatch(showAlert('Empty course list.'));
        } else {
            internalStateDispatch(showCourseList());
        }
    };

    return (
        <CourseListButtonContainerElement
            id="course-list-button"
            onClick={handleOnClick}
            type="button"
        >
            <ListIcon fill="#aab3bc" id="list-icon" />
            <span>Course List</span>
        </CourseListButtonContainerElement>
    );
}
