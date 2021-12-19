import Autocomplete from '@mui/material/Autocomplete';
import { InternalContext } from '../../../contexts/InternalStateProvider';
import Paper from '@mui/material/Paper';
import { useContext, useEffect, useMemo, useState } from 'react';
import throttle from 'lodash/throttle';

export default function InstructorAutocomplete() {
    let [open, setOpen] = useState(false);
    let [instructorInput, setInstructorInput] = useState('');
    let [instructorList, setInstructorList] = useState([]);
    let { formInput, setFormInput } = useContext(InternalContext);
    
    const getResults = useMemo(() =>
        throttle((request, callback) => {
            fetch(`http://localhost:26997/complete/instructors?name=${encodeURIComponent(instructorInput)}`)
                .then(response => response.json())
                .then(data => {
                    setInstructorList(data.matches);
                    setOpen(true);
                })
                .catch(error => {
                    setInstructorList([]);
                    setOpen(false);
                });
        }, 500), [instructorInput]
    );
    
    useEffect(() => {
        if (instructorInput.trim().length >= 3) {
            getResults({ input: instructorInput }, results => {});
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
            onChange={(event, value) => {
                setFormInput({ ...formInput, instructor: (value ?? '')});
                setInstructorInput(value ?? '');
            }}
            onInputChange={(event, value) => setInstructorInput(value ?? '')}
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
                    lineHeight: '25px',
                    outline: 'none',
                    padding: '4px 18px'
                }
            }}
            value={formInput.instructor ?? ''}
        />
    );
}
