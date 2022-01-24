import { Column } from '@ant-design/charts';
import CourseTooltip from './CourseTooltip/CourseTooltip';
import React from 'react';
import { useSelector } from 'react-redux';

let GradeChart = React.memo(() => {
    let searchResultState = useSelector(state => state.searchResult),
        selectedCoursesState = useSelector(state => state.selectedCourses);
	
    const formatAggregateCoursesData = () => {
        let result = [
            {
                name: `Aggregate Data`,
                grade: 'A',
                amount: searchResultState.data[0].gradeACount,
                avgGPA: searchResultState.data[0].gpaAvg
            },
            {
                name: `Aggregate Data`,
                grade: 'B',
                amount: searchResultState.data[0].gradeBCount,
                avgGPA: searchResultState.data[0].gpaAvg
            },
            {
                name: `Aggregate Data`,
                grade: 'C',
                amount: searchResultState.data[0].gradeCCount,
                avgGPA: searchResultState.data[0].gpaAvg
            },
            {
                name: `Aggregate Data`,
                grade: 'D',
                amount: searchResultState.data[0].gradeDCount,
                avgGPA: searchResultState.data[0].gpaAvg
            },
            {
                name: `Aggregate Data`,
                grade: 'F',
                amount: searchResultState.data[0].gradeFCount,
                avgGPA: searchResultState.data[0].gpaAvg
            },
            {
                name: `Aggregate Data`,
                grade: 'P',
                amount: searchResultState.data[0].gradePCount,
                avgGPA: searchResultState.data[0].gpaAvg
            },
            {
                name: `Aggregate Data`,
                grade: 'NP',
                amount: searchResultState.data[0].gradeNpCount,
                avgGPA: searchResultState.data[0].gpaAvg
            },
        ];
        return result;
    };

	const formatSelectedCoursesData = () => {
		let result = [];
		for (let course in selectedCoursesState) {
			result.push({
				name: `${selectedCoursesState[course].department} ${selectedCoursesState[course].courseNumber} (${selectedCoursesState[course].term}/${selectedCoursesState[course].courseCode})`,
				grade: 'A',
				title: `${selectedCoursesState[course].department} ${selectedCoursesState[course].courseNumber} (${selectedCoursesState[course].term})`,
				courseCode: selectedCoursesState[course].courseCode,
				amount: selectedCoursesState[course].gradeACount,
				instructors: selectedCoursesState[course].instructors.join(`/`),
				avgGPA: selectedCoursesState[course].gpaAvg
			});
			result.push({
				name: `${selectedCoursesState[course].department} ${selectedCoursesState[course].courseNumber} (${selectedCoursesState[course].term}/${selectedCoursesState[course].courseCode})`,
				grade: 'B',
				title: `${selectedCoursesState[course].department} ${selectedCoursesState[course].courseNumber} (${selectedCoursesState[course].term})`,
				courseCode: selectedCoursesState[course].courseCode,
				amount: selectedCoursesState[course].gradeBCount,
				instructors: selectedCoursesState[course].instructors.join(`/`),
				avgGPA: selectedCoursesState[course].gpaAvg
			});
			result.push({
				name: `${selectedCoursesState[course].department} ${selectedCoursesState[course].courseNumber} (${selectedCoursesState[course].term}/${selectedCoursesState[course].courseCode})`,
				grade: 'C',
				title: `${selectedCoursesState[course].department} ${selectedCoursesState[course].courseNumber} (${selectedCoursesState[course].term})`,
				courseCode: selectedCoursesState[course].courseCode,
				amount: selectedCoursesState[course].gradeCCount,
				instructors: selectedCoursesState[course].instructors.join(`/`),
				avgGPA: selectedCoursesState[course].gpaAvg
			});
			result.push({
				name: `${selectedCoursesState[course].department} ${selectedCoursesState[course].courseNumber} (${selectedCoursesState[course].term}/${selectedCoursesState[course].courseCode})`,
				grade: 'D',
				title: `${selectedCoursesState[course].department} ${selectedCoursesState[course].courseNumber} (${selectedCoursesState[course].term})`,
				courseCode: selectedCoursesState[course].courseCode,
				amount: selectedCoursesState[course].gradeDCount,
				instructors: selectedCoursesState[course].instructors.join(`/`),
				avgGPA: selectedCoursesState[course].gpaAvg
			});
			result.push({
				name: `${selectedCoursesState[course].department} ${selectedCoursesState[course].courseNumber} (${selectedCoursesState[course].term}/${selectedCoursesState[course].courseCode})`,
				grade: 'F',
				title: `${selectedCoursesState[course].department} ${selectedCoursesState[course].courseNumber} (${selectedCoursesState[course].term})`,
				courseCode: selectedCoursesState[course].courseCode,
				amount: selectedCoursesState[course].gradeFCount,
				instructors: selectedCoursesState[course].instructors.join(`/`),
				avgGPA: selectedCoursesState[course].gpaAvg
			});
			result.push({
				name: `${selectedCoursesState[course].department} ${selectedCoursesState[course].courseNumber} (${selectedCoursesState[course].term}/${selectedCoursesState[course].courseCode})`,
				grade: 'P',
				title: `${selectedCoursesState[course].department} ${selectedCoursesState[course].courseNumber} (${selectedCoursesState[course].term})`,
				courseCode: selectedCoursesState[course].courseCode,
				amount: selectedCoursesState[course].gradePCount,
				instructors: selectedCoursesState[course].instructors.join(`/`),
				avgGPA: selectedCoursesState[course].gpaAvg
			});
			result.push({
				name: `${selectedCoursesState[course].department} ${selectedCoursesState[course].courseNumber} (${selectedCoursesState[course].term}/${selectedCoursesState[course].courseCode})`,
				grade: 'NP',
				title: `${selectedCoursesState[course].department} ${selectedCoursesState[course].courseNumber} (${selectedCoursesState[course].term})`,
				courseCode: selectedCoursesState[course].courseCode,
				amount: selectedCoursesState[course].gradeNpCount,
				instructors: selectedCoursesState[course].instructors.join(`/`),
				avgGPA: selectedCoursesState[course].gpaAvg
			});
		}
		return result;
	};

	const config = {
		autoHide: true,
		color: ['#0066cc', '#8bc1f7', '#002f5d', '#519de9', '#004b95'],
		data: (searchResultState.isAggregateData) ? formatAggregateCoursesData() : formatSelectedCoursesData(),
		isGroup: true,
		label: {
			autoHide: true,
			layout: [{ type: 'interval-adjust-position' }, { type: 'interval-hide-overlap' }, { type: 'adjust-color' }],
		},
		legend: (searchResultState.isAggregateData)
			? false
			: {
				layout: 'horizontal',
				position: 'bottom',
			},
		locale: 'en-US',
		marginRatio: 0,
		padding: 'auto',
		seriesField: 'name',
		tooltip: { customContent: (title, items) => <CourseTooltip isAggregateData={searchResultState.isAggregateData} items={items} title={title} />},
		xField: 'grade',
		yField: 'amount',
	};

	return <Column {...config} />;
});

export default GradeChart;
