import CourseListButton from './CourseListButton/CourseListButton';
import CourseListModal from './CourseListModal/CourseListModal';
import { useSelector } from 'react-redux';
import * as React from 'react';

const CourseList = React.memo(() => {
    let internalState = useSelector(state => state.internalState);
    return (
        <>
            <CourseListButton />
            { internalState.formInput.aggregate ? null : <CourseListModal /> }
        </>
    );
});

export default CourseList;
