import { bindActionCreators } from 'redux';
import { InternalContext } from '../../../contexts/InternalStateProvider';
import { Refresh } from '@icon-park/react';
import { useContext } from 'react';
import { useDispatch } from 'react-redux';
import styled from '@emotion/styled';
import * as searchResultActionCreators from '../../../actions/searchResultActionCreators';

const ResetButtonElement = styled.div`
    margin-bottom: 0;

    #reset-button {
        align-items: center;
        background-color: #aab3bc;
        border: none;
        color: #333538;
        cursor: pointer;
        display: flex;
        font-family: RedHatText, Arial, sans-serif;
        font-size: 14px;
        gap: 2px;
        justify-content: center;
	    margin: 8px 0;
        padding: 8px 0;
        width: 100%;
    }
`;

export default function ResetButton() {
    let { setFormInput } = useContext(InternalContext);
	let dispatch = useDispatch();
	let { replaceResults } = bindActionCreators(searchResultActionCreators, dispatch);

    const reset = (event) => {
        event.preventDefault();
        setFormInput({
            term: '',
            department: '',
            courseNumber: '',
            courseCode: '',
            instructor: '',
            aggregate: false,
            offset: 0
        });
        replaceResults(null, []);
    };

    return (
        <ResetButtonElement>
            <button
                id="reset-button"
                onClick={event => reset(event)}
            >
                <Refresh
                    theme="outline"
                    size="18"
                    fill="#000000" 
                />
                Reset
            </button>
        </ResetButtonElement>
    );
}
