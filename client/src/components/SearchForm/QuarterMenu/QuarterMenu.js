import Select from 'react-select';
import { styles1 } from '../../../utils/searchFormStyles';
import { updateFormInput } from '../../../features/internalStateSlice';
import { useDispatch } from 'react-redux';
import * as React from 'react';

const QUARTERS = [
    { value: 'Fall', label: 'Fall' },
    { value: 'Winter', label: 'Winter' },
    { value: 'Spring', label: 'Spring' },
    { value: 'Summer', label: 'Summer' },
];

const QuarterMenu = React.forwardRef((_, ref) => {
    let internalStateDispatch = useDispatch();
    return (
        <Select
            aria-label="quarter-input"
            closeMenuOnSelect={false}
            isMulti
            onChange={(option) => internalStateDispatch(updateFormInput({ quarter: option.map(({ value }) => value) }))}
            options={QUARTERS}
            placeholder="Quarters"
            ref={ref}
            styles={styles1}
        />
    );
});

export default QuarterMenu;
