import normalizeCourseCode from '../../../utils/normalizeCourseCode';
import styled from '@emotion/styled';
import { v4 } from 'uuid';

const CourseInformationContainerElement = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin: 5px 0 0 16px;
`;

export default function CourseTooltip({ isAggregateData, items, title }) {
    return (
        <>
            { (isAggregateData) ? '' : <h5 style={{ marginTop: 16 }}>{title}</h5> }
            <ul style={{ paddingLeft: 0 }}>
                {items?.map(({ data, color }) => 
                    <li
                        className="g2-tooltip-list-item"
                        key={v4()}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            marginBottom: 4,
                        }}
                    >
                        <div style={{
                            alignItems: 'center',
                            display: 'flex'
                        }}>
                            <span className="g2-tooltip-marker" style={{ backgroundColor: color }}></span>
                            <span>{(isAggregateData) ? data.grade : data.title}</span>
                        </div>
                        <CourseInformationContainerElement>
                            <div>
                                <span style={{ marginRight: 5 }}>Amount:</span>
                                <span className="g2-tooltip-list-item-value">{data.amount}</span>
                            </div>
                            {
                                (isAggregateData)
                                    ? ''
                                    : <div>
                                          <span style={{ marginRight: 5 }}>Course Code:</span>
                                          <span className="g2-tooltip-list-item-value">{normalizeCourseCode(data.courseCode)}</span>
                                      </div>
                            }
                            <div>
                                <span style={{ marginRight: 5 }}>GPA:</span>
                                <span className="g2-tooltip-list-item-value">{data.avgGPA.toFixed(2)}/4</span>
                            </div>
                            {
                                (isAggregateData)
                                    ? ''
                                    : <div>
                                          <span style={{ marginRight: 5 }}>Instructor(s):</span>
                                          <span className="g2-tooltip-list-item-value">{data.instructors}</span>
                                      </div>
                            }
                        </CourseInformationContainerElement>
                    </li>
                )}
            </ul>
        </>
    );
}