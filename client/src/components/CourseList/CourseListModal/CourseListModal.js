import { addCourse, removeCourse } from '../../../features/selectedCoursesSlice';
import { closeCourseList, showAlert, updateFormInput, updateIsFormModified } from '../../../features/internalStateSlice';
import generateRequestParams from '../../../utils/generateRequestParams';
import { Modal, ModalVariant, Pagination } from '@patternfly/react-core';
import normalizeCourseCode from '../../../utils/normalizeCourseCode';
import { replaceResult } from '../../../features/searchResultSlice';
import { TableComposable, Tbody, Td, Th, Thead, Tr } from '@patternfly/react-table';
import { useDispatch, useSelector } from 'react-redux';

const PAGE_ITEM_LIMIT = 15;

export default function CourseListModal() {
    let internalState = useSelector(state => state.internalState),
        searchResultState = useSelector(state => state.searchResult),
        selectedCoursesState = useSelector(state => state.selectedCourses);
    let internalStateDispatch = useDispatch(),
        searchResultDispatch = useDispatch(),
        selectedCoursesDispatch = useDispatch();

    const fetchPageData = async (event, newOffset) => {
        try {
            event.preventDefault();
            let response = await fetch(`${window.ANTCATALOG_SERVICES_ENDPOINT}/courses`, {
                body: JSON.stringify(generateRequestParams(internalState.formInput, newOffset)),
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
                        internalStateDispatch(updateIsFormModified(false));
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
                page={parseInt(((internalState.formInput.offset + PAGE_ITEM_LIMIT) / PAGE_ITEM_LIMIT).toString())}
                perPage={PAGE_ITEM_LIMIT}
                perPageOptions={[{
                    title: "15",
                    value: PAGE_ITEM_LIMIT
                }]}
                titles={{
                    itemsPerPage: '',
                    perPageSuffix: 'Max'
                }}
                toggleTemplate={() => `Page ${parseInt(((internalState.formInput.offset + PAGE_ITEM_LIMIT) / PAGE_ITEM_LIMIT).toString())}`}
                variant="bottom"
            />
        </Modal>
    );
}
