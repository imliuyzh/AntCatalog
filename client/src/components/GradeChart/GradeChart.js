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
                    name: `${selectedCoursesState[course].department} ${selectedCoursesState[course].courseNumber} `
                        + `(${selectedCoursesState[course].quarter} ${selectedCoursesState[course].year}/${selectedCoursesState[course].courseCode})`,
                    grade,
                    title: `${selectedCoursesState[course].department} ${selectedCoursesState[course].courseNumber} `
                        + `(${selectedCoursesState[course].quarter} ${selectedCoursesState[course].year})`,
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
        color: ['#0066cc', '#8bc1f7', '#002f5d', '#2b9af3', '#519de9', '#004b95', '#004080', '#002952', '#001223'],
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
        theme: {
            components: {
                tooltip: {
                    domStyles: {
                        "course-code-container": { lineHeight: 1.5 },
                        "course-code-label": { marginRight: 5 },
                        "course-grade-count": { lineHeight: 1.5 },
                        "course-grade-label": { marginRight: 5 },
                        "course-information-container": {
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '4px',
                            margin: '5px 0 0 16px'
                        },
                        "g2-tooltip-list-item": {
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            marginBottom: 4,
                        },
                        "gpa-container": { lineHeight: 1.5 },
                        "gpa-label": { marginRight: 5 },
                        "instructors-container": { lineHeight: 1.5 },
                        "instructors-label": { marginRight: 5 },
                        "tooltip-container": { padding: searchResultState.isAggregateData ? '2px 2px 12px' : '16px 2px' },
                        "tooltip-headline": {
                            alignItems: 'center',
                            display: 'flex',
                            lineHeight: 1.5
                        },
                    }
                }
            }
        },
        tooltip: { customContent: (title, items) => <CourseTooltip isAggregateData={searchResultState.isAggregateData} items={items} title={title} /> },
        xField: 'grade',
        yField: 'amount',
    };

    return <Column {...config} />;
});

export default GradeChart;
