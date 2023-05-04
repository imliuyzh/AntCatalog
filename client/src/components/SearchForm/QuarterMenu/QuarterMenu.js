import makeAnimated from 'react-select/animated';
import Select from 'react-select';
import { styles1 } from '../../../utils/searchFormStyles';
import { updateFormInput } from '../../../features/internalStateSlice';
import { useDispatch } from 'react-redux';
import * as React from 'react';

const quarters = ['Fall', 'Winter', 'Spring', 'Summer'].map((quarter) => ({
    label: quarter,
    value: quarter
}));

const animatedComponents = makeAnimated();

const QuarterMenu = React.forwardRef((_, ref) => {
    let internalStateDispatch = useDispatch();
    return (
        <Select
            aria-label="quarter-input"
            closeMenuOnSelect={false}
            components={animatedComponents}
            isMulti
            noOptionsMessage={() => "No options."}
            onChange={(option) => internalStateDispatch(updateFormInput({ quarter: option.map(({ value }) => value) }))}
            options={quarters}
            placeholder="Quarters"
            ref={ref}
            styles={styles1}
        />
    );
});

export default QuarterMenu;
