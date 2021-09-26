import { ListCheckbox } from '@icon-park/react';
import { Modal, ModalVariant } from '@patternfly/react-core';
import React, { useState } from 'react';
import styled from '@emotion/styled';

import '@icon-park/react/styles/index.css';

const CourseListButtonElement = styled.div`
	align-items: center;
	color: #aab3bc;
	cursor: pointer;
	display: flex;
	font-family: 'Aleo', 'Times New Roman', serif;
	font-size: 14px;
	gap: 2px;
	justify-content: center;
	margin-top: 2px;
	
    span {
	    color: #aab3bc;
    }
`;

const CourseList = () => {
    let [isOpen, setIsOpen] = useState(false);
    const columns = ['Term', 'Course Code', 'Department', 'Course Number', 'Course Title', 'Instructor'];
    
	return (
        <>
            <CourseListButtonElement onClick={() => setIsOpen(true)}>
                <ListCheckbox theme="outline" size="18" fill="#aab3bc"/>
                <span>Course List</span>
            </CourseListButtonElement>
            
            <Modal
                variant={ModalVariant.large}
                title="Course List"
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
            >
            
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
            
            </Modal>
        </>
	);
};

export default CourseList;
