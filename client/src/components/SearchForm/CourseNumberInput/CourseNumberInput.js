import { InternalContext } from '../../../contexts/InternalStateProvider';
import { useContext } from 'react';

export default function CourseNumberInput() {
    let { formInput, setFormInput } = useContext(InternalContext);
    return (
        <input
            className="input-elements"
            id="course-number"
            onChange={event => setFormInput({ ...formInput, courseNumber: event.target.value})}
            placeholder="Course Number"
            type="text"
            value={formInput.courseNumber}
        />
    );
}
