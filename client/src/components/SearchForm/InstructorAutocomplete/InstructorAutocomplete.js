import Autocomplete from '@mui/material/Autocomplete';
import Paper from '@mui/material/Paper';
import throttle from 'lodash/throttle';
import { updateFormInput } from '../../../features/internalStateSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo, useState } from 'react';

export default function InstructorAutocomplete() {
    let [open, setOpen] = useState(false);
    let [instructorInput, setInstructorInput] = useState('');
    let [instructorList, setInstructorList] = useState([]);

    let internalState = useSelector(state => state.internalState);
    let internalStateDispatch = useDispatch();

    const getResults = useMemo(() =>
        throttle((_request, _response) => {
            fetch(`${window.ANTCATALOG_SERVICES_ENDPOINT}/instructors?name=${encodeURIComponent(instructorInput)}`)
                .then(response => response.json())
                .then(data => {
                    setInstructorList(data.matches);
                    setOpen(true);
                })
                .catch(_ => {
                    setInstructorList([]);
                    setOpen(false);
                });
        }, 500),
        [instructorInput]
    );

    useEffect(() => {
        if (instructorInput.trim().length >= 2) {
            getResults({ input: instructorInput }, _ => {});
            return () => false;
        } else {
            setInstructorList([]);
            setOpen(false);
            return undefined;
        }
   }, [getResults, instructorInput]);

    return (
        <Autocomplete
            filterOptions={x => x}
            fullWidth
            id="instructor"
            inputValue={instructorInput}
            onChange={(_, value) => {
                internalStateDispatch(updateFormInput({ instructor: value ?? '' }));
                setInstructorInput(value ?? '');
            }}
            onInputChange={(_, value) => setInstructorInput(value ?? '')}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            open={open}
            options={instructorList}
            PaperComponent={({ children }) =>
                <Paper
                    sx={{
                        color: '#aab3bc',
                        fontFamily: `FFKievitSlabWebProBook, 'Times New Roman', serif`,
                        fontSize: '14px',
                        padding: '6px 14px'
                    }}
                >
                        {children}
                </Paper>
            }
            renderInput={params => (
                <div ref={params.InputProps.ref}>
                    <input type='text' {...params.inputProps} placeholder='Instructor' />
                </div>
            )}
            sx={{
                '& input': {
                    bgcolor: '#ffffff',
                    border: '1.5px solid #aab3bc',
                    boxSizing: 'border-box',
                    color: '#aab3bc',
                    fontFamily: `FFKievitSlabWebProBook, 'Times New Roman', serif`,
                    fontSize: '14px',
                    lineHeight: '1rem',
                    outline: 'none',
                    padding: '4px 18px'
                }
            }}
            value={internalState.formInput.instructor ?? ''}
        />
    );
}
