import { Column } from '@ant-design/charts';
import CourseTooltip from './CourseTooltip/CourseTooltip';
import { InternalContext } from '../../contexts/InternalStateProvider';
import { useContext } from 'react';
import { useSelector } from 'react-redux';

export default function GradeChart() {
	let { selectedCourses } = useContext(InternalContext);
    let searchResultState = useSelector(state => state.searchResult);
	
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
		for (let course in selectedCourses) {
			result.push({
				name: `${selectedCourses[course].department} ${selectedCourses[course].courseNumber} (${selectedCourses[course].term}/${selectedCourses[course].courseCode})`,
				grade: 'A',
				title: `${selectedCourses[course].department} ${selectedCourses[course].courseNumber} (${selectedCourses[course].term})`,
				courseCode: selectedCourses[course].courseCode,
				amount: selectedCourses[course].gradeACount,
				instructors: selectedCourses[course].instructors.join(`/`),
				avgGPA: selectedCourses[course].gpaAvg
			});
			result.push({
				name: `${selectedCourses[course].department} ${selectedCourses[course].courseNumber} (${selectedCourses[course].term}/${selectedCourses[course].courseCode})`,
				grade: 'B',
				title: `${selectedCourses[course].department} ${selectedCourses[course].courseNumber} (${selectedCourses[course].term})`,
				courseCode: selectedCourses[course].courseCode,
				amount: selectedCourses[course].gradeBCount,
				instructors: selectedCourses[course].instructors.join(`/`),
				avgGPA: selectedCourses[course].gpaAvg
			});
			result.push({
				name: `${selectedCourses[course].department} ${selectedCourses[course].courseNumber} (${selectedCourses[course].term}/${selectedCourses[course].courseCode})`,
				grade: 'C',
				title: `${selectedCourses[course].department} ${selectedCourses[course].courseNumber} (${selectedCourses[course].term})`,
				courseCode: selectedCourses[course].courseCode,
				amount: selectedCourses[course].gradeCCount,
				instructors: selectedCourses[course].instructors.join(`/`),
				avgGPA: selectedCourses[course].gpaAvg
			});
			result.push({
				name: `${selectedCourses[course].department} ${selectedCourses[course].courseNumber} (${selectedCourses[course].term}/${selectedCourses[course].courseCode})`,
				grade: 'D',
				title: `${selectedCourses[course].department} ${selectedCourses[course].courseNumber} (${selectedCourses[course].term})`,
				courseCode: selectedCourses[course].courseCode,
				amount: selectedCourses[course].gradeDCount,
				instructors: selectedCourses[course].instructors.join(`/`),
				avgGPA: selectedCourses[course].gpaAvg
			});
			result.push({
				name: `${selectedCourses[course].department} ${selectedCourses[course].courseNumber} (${selectedCourses[course].term}/${selectedCourses[course].courseCode})`,
				grade: 'F',
				title: `${selectedCourses[course].department} ${selectedCourses[course].courseNumber} (${selectedCourses[course].term})`,
				courseCode: selectedCourses[course].courseCode,
				amount: selectedCourses[course].gradeFCount,
				instructors: selectedCourses[course].instructors.join(`/`),
				avgGPA: selectedCourses[course].gpaAvg
			});
			result.push({
				name: `${selectedCourses[course].department} ${selectedCourses[course].courseNumber} (${selectedCourses[course].term}/${selectedCourses[course].courseCode})`,
				grade: 'P',
				title: `${selectedCourses[course].department} ${selectedCourses[course].courseNumber} (${selectedCourses[course].term})`,
				courseCode: selectedCourses[course].courseCode,
				amount: selectedCourses[course].gradePCount,
				instructors: selectedCourses[course].instructors.join(`/`),
				avgGPA: selectedCourses[course].gpaAvg
			});
			result.push({
				name: `${selectedCourses[course].department} ${selectedCourses[course].courseNumber} (${selectedCourses[course].term}/${selectedCourses[course].courseCode})`,
				grade: 'NP',
				title: `${selectedCourses[course].department} ${selectedCourses[course].courseNumber} (${selectedCourses[course].term})`,
				courseCode: selectedCourses[course].courseCode,
				amount: selectedCourses[course].gradeNpCount,
				instructors: selectedCourses[course].instructors.join(`/`),
				avgGPA: selectedCourses[course].gpaAvg
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
}
