import Select from 'react-select';
import { styles1 } from '../../../utils/searchFormStyles';
import { updateFormInput } from '../../../features/internalStateSlice';
import { useDispatch } from 'react-redux';

const YEARS = [
    { value: 2022, label: '2022' },
    { value: 2021, label: '2021' },
    { value: 2020, label: '2020' },
    { value: 2019, label: '2019' },
    { value: 2018, label: '2018' },
    { value: 2017, label: '2017' },
    { value: 2016, label: '2016' },
    { value: 2015, label: '2015' },
    { value: 2014, label: '2014' },
    { value: 2013, label: '2013' }
];

export default function YearMenu({ inputRef }) {
    let internalStateDispatch = useDispatch();
    return (
        <Select
            aria-label="year-input"
            closeMenuOnSelect={false}
            isMulti
            onChange={(option) => internalStateDispatch(updateFormInput({ year: option.map(({ value }) => value) }))}
            options={YEARS}
            placeholder="Years"
            ref={inputRef}
            styles={styles1}
        />
    );
}
