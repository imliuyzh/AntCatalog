import { addCourse, removeCourse } from '../../features/selectedCoursesSlice';
import { closeCourseList, showAlert, showCourseList, updateFormInput } from '../../features/internalStateSlice';
import { Modal, ModalVariant } from '@patternfly/react-core';
import normalizeCourseCode from '../../utils/normalizeCourseCode';
import { Pagination } from '@patternfly/react-core';
import { ReactComponent as ListIcon } from '../../assets/images/list.svg';
import { replaceResult } from '../../features/searchResultSlice';
import styled from '@emotion/styled';
import { TableComposable, Tbody, Td, Th, Thead, Tr } from '@patternfly/react-table';
import { useDispatch, useSelector } from 'react-redux';
import * as React from 'react';

const PAGE_ITEM_LIMIT = 15;

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

const CourseList = React.memo(() => {
    let internalState = useSelector(state => state.internalState),
        searchResultState = useSelector(state => state.searchResult),
        selectedCoursesState = useSelector(state => state.selectedCourses);
    let internalStateDispatch = useDispatch(),
        searchResultDispatch = useDispatch(),
        selectedCoursesDispatch = useDispatch();

    const handleOnClick = () => {
        if (searchResultState.isAggregateData) {
            internalStateDispatch(showAlert('Course list is disabled for aggregated data.'));
        } else if (searchResultState.isAggregateData === null && searchResultState.data.length === 0) {
            internalStateDispatch(showAlert('Please search for courses.'));
        } else if (searchResultState.data.length === 0) {
            internalStateDispatch(showAlert('Empty course list.'));
        } else {
            internalStateDispatch(showCourseList());
        }
    };

    const generateRequestParams = (newOffset) => {
        return {
            values: {
                year: (internalState.formInput.year.length > 0) ? internalState.formInput.year : null,
                quarter: (internalState.formInput.quarter.length > 0) ? internalState.formInput.quarter : null,
                department: (internalState.formInput.department.length > 0) ? internalState.formInput.department : null,
                courseNumber: (internalState.formInput.courseNumber.length > 0) ? internalState.formInput.courseNumber : null,
                courseCode: (internalState.formInput.courseCode.length > 0) ? internalState.formInput.courseCode : null,
                instructor: (internalState.formInput.instructor.length > 0) ? internalState.formInput.instructor : null
            },
            options: {
                aggregate: false,
                offset: newOffset
            }
        };
    };

    const fetchPageData = async (event, newOffset) => {
        try {
            event.preventDefault();
            let response = await fetch(`${window.ANTCATALOG_SERVICES_ENDPOINT}/courses`, {
                body: JSON.stringify(generateRequestParams(newOffset)),
                headers: { 'Content-Type': 'application/json' },
                method: 'POST'
            });
            
            switch (response.status) {
                case 200:
                    let information = await response.json();
                    if (information.data.length > 0) {
                        searchResultDispatch(replaceResult({
                            isAggregateData: information.aggregate,
                            data: information.data
                        }));
                        internalStateDispatch(updateFormInput({ offset: newOffset }));
                    } else {
                        internalStateDispatch(showAlert('No more courses!'));
                    }
                    break;
                case 429:
                    internalStateDispatch(showAlert('Please slow down, you are going too fast!'));
                    break;
                case 500: default:
                    internalStateDispatch(showAlert('An unexpected error occurs, please report to GitHub issues.'));
            }
        } catch (error) {
            console.error(error);
            internalStateDispatch(showAlert('An unexpected error occurs, try again.'));
        }
    };

    const isCourseSelected = (course) => `${course.year} ${course.quarter} ${course.courseCode}` in selectedCoursesState;

    const addOrRemoveCourse = (course, isSelected=true) => {
        let targetCourse = `${course.year} ${course.quarter} ${course.courseCode}`;
        if (isSelected) {
            selectedCoursesDispatch(addCourse({ targetCourse, course }));
        } else {
            selectedCoursesDispatch(removeCourse(targetCourse));
        }
    };

    return (
        <>
            <CourseListButtonContainerElement onClick={handleOnClick} type="button">
                <ListIcon fill="#aab3bc" id="list-icon" />
                <span>Course List (Last Search)</span>
            </CourseListButtonContainerElement>

            {(internalState.formInput.aggregate)
                ? ''
                :
                    <Modal
                        isOpen={internalState.showCourseList}
                        onClose={() => internalStateDispatch(closeCourseList())}
                        title="Search"
                        variant={ModalVariant.large}
                    >
                        <TableComposable variant="compact">
                            <Thead>
                                <Tr>
                                    <Th></Th>
                                    <Th>Year</Th>
                                    <Th>Quarter</Th>
                                    <Th>Course Code</Th>
                                    <Th>Department</Th>
                                    <Th>Course Number</Th>
                                    <Th>Course Title</Th>
                                    <Th>Instructor(s)</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {searchResultState.data.map((course, rowIndex) => (
                                    <Tr key={`course-list-item-${rowIndex}`}>
                                        <Td select={{
                                            isSelected: isCourseSelected(course),
                                            onSelect: (_, isSelected) => addOrRemoveCourse(course, isSelected),
                                            rowIndex
                                        }} />
                                        <Td dataLabel="Year">{course.year}</Td>
                                        <Td dataLabel="Quarter">{course.quarter}</Td>
                                        <Td dataLabel="Course Code">{normalizeCourseCode(course.courseCode)}</Td>
                                        <Td dataLabel="Department">{course.department}</Td>
                                        <Td dataLabel="Course Number">{course.courseNumber}</Td>
                                        <Td dataLabel="Course Title">{course.courseTitle}</Td>
                                        <Td dataLabel="Instructor(s)">{course.instructors.join(`/`)}</Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </TableComposable>
                        <Pagination
                            dropDirection="up"
                            isCompact
                            onPreviousClick={async (event, _) => await fetchPageData(event, internalState.formInput.offset - PAGE_ITEM_LIMIT)}
                            onNextClick={async (event, _) => await fetchPageData(event, internalState.formInput.offset + PAGE_ITEM_LIMIT)}
                            page={parseInt((internalState.formInput.offset + PAGE_ITEM_LIMIT) / PAGE_ITEM_LIMIT)}
                            perPage={PAGE_ITEM_LIMIT}
                            perPageOptions={[{
                                title: "15",
                                value: PAGE_ITEM_LIMIT
                            }]}
                            titles={{
                                itemsPerPage: '',
                                perPageSuffix: 'Max'
                            }}
                            toggleTemplate={() => `Page ${parseInt((internalState.formInput.offset + PAGE_ITEM_LIMIT) / PAGE_ITEM_LIMIT)}`}
                            variant="bottom"
                        />
                    </Modal>}
        </>
    );
});

export default CourseList;
