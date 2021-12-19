import { InternalContext } from '../../../contexts/InternalStateProvider';
import { useContext } from 'react';
import styled from '@emotion/styled';

const AggregateOptionElement = styled.div`
    display: inline-flex;
    margin: 0;

    input[type="checkbox"] {
	    margin: auto 3px auto 0;
    }

    label {
	    color: #aab3bc;
	    font-family: FFKievitSlabWebProBook, 'Times New Roman', serif;
	    font-size: 14px;
    }
`;

export default function AggregateOption() {
    let { formInput, setFormInput } = useContext(InternalContext);
    return (
        <AggregateOptionElement>
            <input
                checked={formInput.aggregate}
                id="aggregate-view"
                onChange={event => setFormInput({ ...formInput, aggregate: event.target.value})}
                type="checkbox"
            />
            <label htmlFor="aggregate-view">Aggregate View</label>
        </AggregateOptionElement>
    );
}
