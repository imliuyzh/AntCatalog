import CourseListButton from './CourseListButton/CourseListButton';
import CourseListModal from './CourseListModal/CourseListModal';
import * as React from 'react';

const CourseList = React.memo(() => (
    <>
        <CourseListButton />
        <CourseListModal />
    </>
));

export default CourseList;
