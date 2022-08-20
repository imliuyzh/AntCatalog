import CourseListButton from './CourseListButton/CourseListButton';
import CourseListModal from './CourseListModal/CourseListModal';
import { memo } from 'react';

const CourseList = memo(() => (
    <>
        <CourseListButton />
        <CourseListModal />
    </>
));

export default CourseList;
