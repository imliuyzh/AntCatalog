import makeAnimated from 'react-select/animated';
import Select from 'react-select';
import { styles1 } from '../../../utils/searchFormStyles';
import { updateFormInput } from '../../../features/internalStateSlice';
import { useDispatch } from 'react-redux';
import * as React from 'react';

const years = Array.from(new Array(10), (_, index) => ({
    label: `${2022 - index}`,
    value: 2022 - index
}));

const animatedComponents = makeAnimated();

const YearMenu = React.forwardRef((_, ref) => {
    let internalStateDispatch = useDispatch();
    return (
        <Select
            aria-label="year-input"
            closeMenuOnSelect={false}
            components={animatedComponents}
            isMulti
            noOptionsMessage={() => "No options."}
            onChange={(option) => internalStateDispatch(updateFormInput({ year: option.map(({ value }) => value) }))}
            options={years}
            placeholder="Years"
            ref={ref}
            styles={styles1}
        />
    );
});

export default YearMenu;
