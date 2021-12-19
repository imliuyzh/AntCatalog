import { InternalContext } from '../../../contexts/InternalStateProvider';
import { useContext } from 'react';

export default function CourseCodeInput() {
    let { formInput, setFormInput } = useContext(InternalContext);
    return (
        <input
            className="input-elements"
            id="course-code"
            onChange={event => setFormInput({ ...formInput, courseCode: event.target.value})}
            placeholder="Course Code"
            type="text"
            value={formInput.courseCode}
        />
    );
}
