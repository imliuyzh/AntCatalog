import Select from 'react-select';
import { styles1 } from '../../../utils/SearchForm/utils';
import { updateFormInput } from '../../../features/internalStateSlice';
import { useDispatch } from 'react-redux';

const QUARTER = [
    { value: 'Fall', label: 'Fall' },
    { value: 'Winter', label: 'Winter' },
    { value: 'Spring', label: 'Spring' },
    { value: 'Summer', label: 'Summer' },
];

export default function QuarterMenu({ inputRef }) {
    let internalStateDispatch = useDispatch();
    return (
        <Select
            closeMenuOnSelect={false}
            isMulti
            onChange={(option) => internalStateDispatch(updateFormInput({ quarter: option.map(({ value }) => value) }))}
            options={QUARTER}
            placeholder="Quarter"
            ref={inputRef}
            styles={styles1}
        />
    );
}
