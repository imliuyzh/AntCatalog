export default function CourseTooltip({ isAggregateData, items, title }) {
    return (
        <div className="tooltip-container">
            { isAggregateData ? null : <h5>{title}</h5> }
            <ul>
                {items?.map(({ data, color }, index) => 
                    <li className="g2-tooltip-list-item" key={`tooltip-item-${index}`}>
                        <div className="tooltip-headline">
                            <span className="g2-tooltip-marker" style={{ backgroundColor: color }}></span>
                            <span>{(isAggregateData) ? data.grade : data.title}</span>
                        </div>
                        <div className="course-information-container">
                            <div className="course-grade-count">
                                <span className="course-grade-label">Amount: </span>
                                <span className="g2-tooltip-list-item-value">{data.amount}</span>
                            </div>
                            {
                                (isAggregateData)
                                    ? null
                                    : <div className="course-code-container">
                                          <span className="course-code-label">Course Code: </span>
                                          <span className="g2-tooltip-list-item-value">
                                            {`${'0'.repeat(5 - data.courseCode.toString().length)}${data.courseCode}`}
                                          </span>
                                      </div>
                            }
                            <div className="gpa-container">
                                <span className="gpa-label">GPA: </span>
                                <span className="g2-tooltip-list-item-value">{data.avgGPA.toFixed(2)}/4</span>
                            </div>
                            {
                                (isAggregateData)
                                    ? null
                                    : <div className="instructors-container">
                                          <span className="instructors-label">Instructor(s): </span>
                                          <span className="g2-tooltip-list-item-value">{data.instructors}</span>
                                      </div>
                            }
                        </div>
                    </li>
                )}
            </ul>
        </div>
    );
}
