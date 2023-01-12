import { Alert, AlertActionCloseButton, AlertGroup } from '@patternfly/react-core';
import { closeAlert } from '../../features/internalStateSlice';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';

const ErrorAlertContainerElement = styled.div`
    .pf-c-alert {
        --pf-c-alert--BackgroundColor: var(--pf-global--palette--red-100);
        --pf-c-alert__icon--Color: var(--pf-global--palette--white);
        --pf-c-alert__title--Color: var(--pf-global--palette--white);
    }

    .pf-c-alert__action > .pf-c-button {
        color: var(--pf-global--palette--white);
        transition: 0.2s all;
    }

    .pf-c-alert__action > .pf-c-button:hover {
        color: var(--pf-global--palette--red-300);
    }
`;

export default function ErrorAlert() {
    let internalState = useSelector(state => state.internalState);
    let internalStateDispatch = useDispatch();

    return internalState.showAlert
        ? (
            <AlertGroup isToast isLiveRegion>
                <ErrorAlertContainerElement>
                    <Alert
                        actionClose={<AlertActionCloseButton onClose={() => internalStateDispatch(closeAlert())} />}
                        onTimeout={() => internalStateDispatch(closeAlert())}
                        timeout={3000}
                        title={internalState.alertMessage}
                        variant="danger"
                    />
                </ErrorAlertContainerElement>
            </AlertGroup>
        )
        : null;
}
