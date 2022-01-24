import { bindActionCreators } from 'redux';
import { ReactComponent as ListIcon } from '../../assets/images/list.svg';
import { Modal, ModalVariant } from '@patternfly/react-core';
import { Pagination } from '@patternfly/react-core';
import React from 'react';
import styled from '@emotion/styled';
import { TableComposable, Tbody, Td, Th, Thead, Tr } from '@patternfly/react-table';
import { useDispatch, useSelector } from 'react-redux';
import { v4 } from 'uuid';
import * as internalStateActionCreators from '../../actions/internalStateActionCreators';
import * as searchResultActionCreators from '../../actions/searchResultActionCreators';
import * as selectedCoursesActionCreators from '../../actions/selectedCoursesActionCreators';

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

let CourseList = React.memo(() => {
    let internalState = useSelector(state => state.InternalState),
        searchResultState = useSelector(state => state.searchResult),
        selectedCoursesState = useSelector(state => state.selectedCourses);
    let internalStateDispatch = useDispatch(),
        searchResultDispatch = useDispatch(), 
        selectedCoursesDispatch = useDispatch();
    let { closeCourseList, showAlert, showCourseList, updateFormInput } = bindActionCreators(internalStateActionCreators, internalStateDispatch);
    let { replaceResults } = bindActionCreators(searchResultActionCreators, searchResultDispatch);
    let { addCourse } = bindActionCreators(selectedCoursesActionCreators, selectedCoursesDispatch);
    
    const handleOnClick = () => {
        if (searchResultState.isAggregateData) {
            showAlert('Course list is disabled for aggregated data');
        } else if (searchResultState.isAggregateData === null && searchResultState.data.length === 0) {
            showAlert('Please search for courses')
        } else if (searchResultState.data.length === 0) {
            showAlert('Empty course list')
        } else {
            showCourseList();
        }
    };

    const generateRequestParams = (newOffset) => {
        return {
            values: {
                term: (internalState.formInput.term.trim().length > 0) ? internalState.formInput.term : null,
                department: (internalState.formInput.department.trim().length > 0) ? internalState.formInput.department : null,
                courseNumber: (internalState.formInput.courseNumber.trim().length > 0) ? internalState.formInput.courseNumber : null,
                courseCode: (internalState.formInput.courseCode.trim().length > 0) ? internalState.formInput.courseCode : null,
                instructor: (internalState.formInput.instructor.trim().length > 0) ? internalState.formInput.instructor : null
            },
            options: {
                aggregate: false,
                offset: newOffset
            }
        };
    };

    const fetchPageData = (event, newOffset) => {
        event.preventDefault();
        fetch(`${window.ANTCATALOG_SERVICES_ENDPOINT}/api/search`, {
            body: JSON.stringify(generateRequestParams(newOffset)),
            headers: { 'Content-Type': 'application/json' },
            method: 'POST'
        })
            .then(response => response.json())
            .then(information => {
                if (information.data.length > 0) {
                    replaceResults(information.aggregate, information.data);
                    updateFormInput({ offset: newOffset });
                } else {
                    showAlert('No more courses!');
                }
            })
            .catch(error => {
                console.error(error);
                showAlert('An unexpected error occurs, try again');
            });
    };

    const isCourseSelected = (course) => `${course.term} ${course.courseCode}` in selectedCoursesState;

    const addNewCourse = (course, isSelected=true) => {
        let result = { ...selectedCoursesState };
        delete result[`${course.term} ${course.courseCode}`];
        if (isSelected) {
            result[`${course.term} ${course.courseCode}`] = course;
        }
        addCourse(result);
    };
    
	return (
        <>
            <CourseListButtonContainerElement onClick={handleOnClick}>
                <ListIcon fill="#aab3bc" id="list-icon" />
                <span>Course List (Last Search)</span>
            </CourseListButtonContainerElement>

            {
                (internalState.formInput.aggregate)
                    ? ''
                    :
                        <Modal
                            isOpen={internalState.showCourseList}
                            onClose={() => closeCourseList()}
                            title="Search"
                            variant={ModalVariant.large}
                        >
                            <TableComposable variant="compact">
                                <Thead>
                                    <Tr>
                                        <Th>{''}</Th>
                                        <Th>{'Term'}</Th>
                                        <Th>{'Course Code'}</Th>
                                        <Th>{'Department'}</Th>
                                        <Th>{'Course Number'}</Th>
                                        <Th>{'Course Title'}</Th>
                                        <Th>{'Instructor(s)'}</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {searchResultState.data.map((course, rowIndex) => (
                                        <Tr key={v4()}>
                                            <Td select={{
                                                isSelected: isCourseSelected(course),
                                                onSelect: (_, isSelected) => addNewCourse(course, isSelected),
                                                rowIndex
                                            }} />
                                            <Td dataLabel={'Term'}>{course.term}</Td>
                                            <Td dataLabel={'Course Code'}>{course.courseCode}</Td>
                                            <Td dataLabel={'Department'}>{course.department}</Td>
                                            <Td dataLabel={'Course Number'}>{course.courseNumber}</Td>
                                            <Td dataLabel={'Course Title'}>{course.courseTitle}</Td>
                                            <Td dataLabel={'Instructor(s)'}>{course.instructors.join(`/`)}</Td>
                                        </Tr>
                                    ))}
                                </Tbody>
                            </TableComposable>
                            <Pagination
                                dropDirection="up"
                                isCompact
                                onPreviousClick={(event, _) => fetchPageData(event, internalState.formInput.offset - PAGE_ITEM_LIMIT)}
                                onNextClick={(event, _) => fetchPageData(event, internalState.formInput.offset + PAGE_ITEM_LIMIT)}
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
                        </Modal>
            }
        </>
    );
});

export default CourseList;
