import { bindActionCreators } from 'redux';
import { InternalContext } from '../../contexts/InternalStateProvider';
import { ReactComponent as ListIcon } from '../../assets/images/list.svg';
import { Modal, ModalVariant } from '@patternfly/react-core';
import { Pagination } from '@patternfly/react-core';
import styled from '@emotion/styled';
import { TableComposable, Tbody, Td, Th, Thead, Tr } from '@patternfly/react-table';
import { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 } from 'uuid';
import * as searchResultActionCreators from '../../actions/searchResultActionCreators';

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

export default function CourseList() {
    let { formInput, openAlert, setFormInput, selectedCourses, SERVICES_ENDPOINT, setShowCourseList, setSelectedCourses, showCourseList } = useContext(InternalContext);
    let searchResultState = useSelector(state => state.searchResult);
	let dispatch = useDispatch();
	let { replaceResults } = bindActionCreators(searchResultActionCreators, dispatch);
    
    const handleOnClick = () => {
        if (searchResultState.isAggregateData) {
            openAlert('Course list is disabled for aggregated data');
        } else if (searchResultState.isAggregateData === null && searchResultState.data.length === 0) {
            openAlert('Please search for courses')
        } else if (searchResultState.data.length === 0) {
            openAlert('Empty course list')
        } else {
            setShowCourseList(true);
        }
    };

    const generateRequestParams = (newOffset) => {
        return {
            values: {
                term: (formInput.term.trim().length > 0) ? formInput.term : null,
                department: (formInput.department.trim().length > 0) ? formInput.department : null,
                courseNumber: (formInput.courseNumber.trim().length > 0) ? formInput.courseNumber : null,
                courseCode: (formInput.courseCode.trim().length > 0) ? formInput.courseCode : null,
                instructor: (formInput.instructor.trim().length > 0) ? formInput.instructor : null
            },
            options: {
                aggregate: false,
                offset: newOffset
            }
        };
    };

    const fetchPageData = (event, newOffset) => {
        event.preventDefault();
        fetch(`${SERVICES_ENDPOINT}/api/search`, {
            body: JSON.stringify(generateRequestParams(newOffset)),
            headers: { 'Content-Type': 'application/json' },
            method: 'POST'
        })
            .then(response => response.json())
            .then(information => {
                if (information.data.length > 0) {
                    replaceResults(information.aggregate, information.data);
                    setFormInput({ ...formInput, offset: newOffset });
                } else {
                    openAlert('No more courses!');
                }
            })
            .catch(error => {
                console.error(error);
                openAlert('An unexpected error occurs, try again');
            });
    };

    const isCourseSelected = (course) => `${course.term} ${course.courseCode}` in selectedCourses;

    const addCourse = (course, isSelected=true) => {
        setSelectedCourses(prevState => {
            let result = {...prevState};
            delete result[`${course.term} ${course.courseCode}`];
            if (isSelected) {
                result[`${course.term} ${course.courseCode}`] = course;
            }
            return result;
        });
    };
    
	return (
        <>
            <CourseListButtonContainerElement onClick={handleOnClick}>
                <ListIcon fill="#aab3bc" id="list-icon" />
                <span>Course List (Last Search)</span>
            </CourseListButtonContainerElement>

            {
                (formInput.aggregate)
                    ? ''
                    :
                        <Modal
                            isOpen={showCourseList}
                            onClose={() => setShowCourseList(false)}
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
                                                onSelect: (_, isSelected) => addCourse(course, isSelected),
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
                                onPreviousClick={(event, _) => fetchPageData(event, formInput.offset - PAGE_ITEM_LIMIT)}
                                onNextClick={(event, _) => fetchPageData(event, formInput.offset + PAGE_ITEM_LIMIT)}
                                page={parseInt((formInput.offset + PAGE_ITEM_LIMIT) / PAGE_ITEM_LIMIT)}
                                perPage={PAGE_ITEM_LIMIT}
                                perPageOptions={[{
                                    title: "15", 
                                    value: PAGE_ITEM_LIMIT
                                }]}
                                titles={{
                                    itemsPerPage: '',
                                    perPageSuffix: 'Max'
                                }}
                                toggleTemplate={() => `Page ${parseInt((formInput.offset + PAGE_ITEM_LIMIT) / PAGE_ITEM_LIMIT)}`}
                                variant="bottom"
                            />
                        </Modal>
            }
        </>
    );
}
