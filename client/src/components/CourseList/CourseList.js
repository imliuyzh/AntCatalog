import React, { useState } from 'react';
import { ListCheckbox } from '@icon-park/react';

import '@icon-park/react/styles/index.css';

import './CourseList.css'

const CourseList = () => {
	return (
		<div id="course-list">
			<ListCheckbox theme="outline" size="18" fill="#aab3bc"/>
			<span>Course List</span>
		</div>
	);
};

export default CourseList;