import { bindActionCreators } from 'redux';
import Box from '@mui/material/Box';
import DataGrid from 'react-data-grid';
import { InputContext } from '../../contexts/InputStateProvider';
import { ListCheckbox } from '@icon-park/react';
import Modal from '@mui/material/Modal';
import React, { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/styled';
import * as searchResultActionCreators from '../../actions/searchResultActionCreators';

import '@icon-park/react/styles/index.css';

const CourseListButtonElement = styled.button`
	align-items: center;
	background-color: transparent;
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
	
    span {
	    color: #aab3bc;
    }
`;

const columns = [
    {
        key: 'term',
        name: 'Term',
    },
    {
        key: 'courseCode',
        name: 'Course Code',
    },
    {
        key: 'department',
        name: 'Department',
    },
    {
        key: 'courseNumber',
        name: 'Course Number',
    },
    {
        key: 'courseTitle',
        name: 'Course Title',
    },
    {
        key: 'instructors',
        name: 'Instructors',
    },
];

const CourseList = ({ openAlert }) => {
    let { formInput, setFormInput } = useContext(InputContext);
    let searchResultState = useSelector(state => state.searchResult);
	let dispatch = useDispatch();
	let { addResults } = bindActionCreators(searchResultActionCreators, dispatch);
	
    let [isOpen, setIsOpen] = useState(false),
        [isLoading, setIsLoading] = useState(false);
    
    const handleOnClick = () => {
        if (searchResultState.isAggregateData) {
            openAlert('Course List Disabled for Aggregate Data.');
        } else if (searchResultState.isAggregateData === null && searchResultState.data.length === 0) {
            openAlert('Please Search for Courses First.')
        } else if (searchResultState.data.length === 0) {
            openAlert('Empty Course List.')
        } else {
            setIsOpen(true);
        }
    };
    
    const generateRequestParams = () => {
        setFormInput({ ...formInput, offset: formInput.offset + 25});
        return {
            values: {
                term: (formInput.term.trim().length > 0) ? formInput.term : null,
                department: (formInput.department.trim().length > 0) ? formInput.department : null,
                courseNumber: (formInput.courseNumber.trim().length > 0) ? formInput.courseNumber : null,
                courseCode: (formInput.courseCode.trim().length > 0) ? formInput.courseCode : null,
                instructor: (formInput.instructor.trim().length > 0) ? formInput.instructor : null
            },
            options: {
                aggregate: formInput.aggregate,
                offset: formInput.offset
            }
        };
    };
    
    const handleScroll = async ({ currentTarget }) => {
        if (isLoading && (currentTarget.scrollTop + 10 >= currentTarget.scrollHeight - currentTarget.clientHeight)) {
            setIsLoading(true);
            
            let response = await fetch('http://localhost:26997/api/v1/search', {
                body: JSON.stringify(generateRequestParams()),
                headers: { 'Content-Type': 'application/json' },
                method: 'POST'
            });
            let information = await response.json();
            information.data.forEach(course => course.instructors = course.instructors.join('/'));
            addResults(information.aggregate, information.data);
            
            setIsLoading(false);
        }
    };
    
	return (
        <>
            <CourseListButtonElement onClick={handleOnClick}>
                <ListCheckbox theme="outline" size="18" fill="#aab3bc"/>
                <span>Course List</span>
            </CourseListButtonElement>
            
            <Modal
                onClose={() => setIsOpen(false)}
                open={isOpen}
            >
                <Box sx={{
                    bgcolor: '#ffffff',
                    border: 'none',
                    boxShadow: 24,
                    height: '90%',
                    left: '50%',
                    p: 3,
                    position: 'absolute',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '80%',
                }}>
                    <DataGrid
                        className="fill-grid"
                        columns={columns}
                        rowHeight={40}
                        rowKeyGetter={row => `${row.term} ${row.courseCode}`}
                        rows={searchResultState.data}
                        onRowsChange={() => {}}
                        onScroll={handleScroll}
                    />
                </Box>
            </Modal>
        </>
	);
};//onRowsScrollEnd={}

export default CourseList;
