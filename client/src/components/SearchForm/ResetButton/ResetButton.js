import { ReactComponent as ResetIcon } from '../../../assets/images/reset.svg';
import styled from '@emotion/styled';

const ResetButtonElement = styled.div`
    margin-bottom: 0;

    #reset-button {
        align-items: center;
        background-color: #efefef;
        border: none;
        color: #333538;
        cursor: pointer;
        display: flex;
        font-family: RedHatText, Arial, sans-serif;
        font-size: 14px;
        gap: 5px;
        justify-content: center;
        margin: 8px 0;
        padding: 8px 0;
        width: 100%;
    }

    #reset-icon {
        width: 24px;
    }
`;

export default function ResetButton() {
    return (
        <ResetButtonElement>
            <button id="reset-button" onClick={() => window.location.reload()} type="button">
                <ResetIcon fill="#333538" id="reset-icon" />
                Reset
            </button>
        </ResetButtonElement>
    );
}
