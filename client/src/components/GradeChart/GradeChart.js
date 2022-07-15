import { Column } from '@ant-design/charts';
import CourseTooltip from './CourseTooltip/CourseTooltip';
import { useSelector } from 'react-redux';
import * as React from 'react';

const GradeChart = React.memo(() => {
    let searchResultState = useSelector(state => state.searchResult),
        selectedCoursesState = useSelector(state => state.selectedCourses);

    const formatAggregateCoursesData = () => {
        return ['A', 'B', 'C', 'D', 'F', 'P', 'NP'].map(grade => ({
            name: `Aggregate Data`,
            grade,
            amount: searchResultState.data[0][`grade${grade}Count`],
            avgGPA: searchResultState.data[0].gpaAvg
        }));
    };

    const formatSelectedCoursesData = () => {
        let result = [];
        for (let course in selectedCoursesState) {
            for (let grade of ['A', 'B', 'C', 'D', 'F', 'P', 'NP']) {
                result.push({
                    name: `${selectedCoursesState[course].department} ${selectedCoursesState[course].courseNumber} (${selectedCoursesState[course].quarter} ${selectedCoursesState[course].year}/${selectedCoursesState[course].courseCode})`,
                    grade,
                    title: `${selectedCoursesState[course].department} ${selectedCoursesState[course].courseNumber} (${selectedCoursesState[course].quarter} ${selectedCoursesState[course].year})`,
                    courseCode: selectedCoursesState[course].courseCode,
                    amount: selectedCoursesState[course][`grade${grade}Count`],
                    instructors: selectedCoursesState[course].instructors.join(`/`),
                    avgGPA: selectedCoursesState[course].gpaAvg
                });
            }
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
        tooltip: { customContent: (title, items) => <CourseTooltip isAggregateData={searchResultState.isAggregateData} items={items} title={title} /> },
        xField: 'grade',
        yField: 'amount',
    };

    return <Column {...config} />;
});

export default GradeChart;
