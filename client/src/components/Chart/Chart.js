import { Chart, ChartAxis, ChartBar, ChartGroup, ChartVoronoiContainer } from '@patternfly/react-charts';
import { InternalContext } from '../../contexts/InternalStateProvider';
import { useContext } from 'react';
import { v4 } from 'uuid';

export default function GradeChart() {
	let { selectedCourses } = useContext(InternalContext);
	
	const initializeLegend = () => {
		let result = [];
		for (let course in selectedCourses) {
			result.push({
				name: `${selectedCourses[course].department}${selectedCourses[course].courseNumber} (${selectedCourses[course].term}/${selectedCourses[course].courseCode})`
			});
		}
		return result;
	};

	const initializeData = () => {
		let result = [];
		for (let course in selectedCourses) {
			let data = [
				{
					name: `${selectedCourses[course].department}${selectedCourses[course].courseNumber} (${selectedCourses[course].term}/${selectedCourses[course].courseCode})`,
					x: 'A',
					y: selectedCourses[course].gradeACount
				},
				{
					name: `${selectedCourses[course].department}${selectedCourses[course].courseNumber} (${selectedCourses[course].term}/${selectedCourses[course].courseCode})`,
					x: 'B',
					y: selectedCourses[course].gradeBCount
				},
				{
					name: `${selectedCourses[course].department}${selectedCourses[course].courseNumber} (${selectedCourses[course].term}/${selectedCourses[course].courseCode})`,
					x: 'C',
					y: selectedCourses[course].gradeCCount
				},
				{
					name: `${selectedCourses[course].department}${selectedCourses[course].courseNumber} (${selectedCourses[course].term}/${selectedCourses[course].courseCode})`,
					x: 'D',
					y: selectedCourses[course].gradeDCount
				},
				{
					name: `${selectedCourses[course].department}${selectedCourses[course].courseNumber} (${selectedCourses[course].term}/${selectedCourses[course].courseCode})`,
					x: 'F',
					y: selectedCourses[course].gradeFCount
				},
				{
					name: `${selectedCourses[course].department}${selectedCourses[course].courseNumber} (${selectedCourses[course].term}/${selectedCourses[course].courseCode})`,
					x: 'P',
					y: selectedCourses[course].gradePCount
				},
				{
					name: `${selectedCourses[course].department}${selectedCourses[course].courseNumber} (${selectedCourses[course].term}/${selectedCourses[course].courseCode})`,
					x: 'NP',
					y: selectedCourses[course].gradeNpCount
				}
			];
			result.push(<ChartBar data={data} key={v4()} />);
		}
		return result;
	};

	return (
		<Chart
			containerComponent={<ChartVoronoiContainer constrainToVisibleArea containerId={'chart-area'} labels={({ datum }) => `${datum.name}: ${datum.y}`} />}
			domainPadding={{ x: [15, 5] }}
			legendData={initializeLegend()}
			legendOrientation="vertical"
			legendPosition="bottom"
			padding={{
				bottom: 100,
				left: 40,
				right: 40,
				top: 0
			}}
		>
			<ChartAxis />
			<ChartAxis dependentAxis showGrid />
			<ChartGroup offset={11}>
				{initializeData()}
			</ChartGroup>
		</Chart>
	);
}