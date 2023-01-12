import { Alert, AlertActionCloseButton, AlertGroup } from '@patternfly/react-core';
import { closeAlert } from '../../features/internalStateSlice';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';

const ErrorAlertContainerElement = styled.div`
    .pf-c-alert {
        --pf-c-alert--BackgroundColor: #c9190b;
        --pf-c-alert--BorderTopColor: #c9190b;
        --pf-c-alert__icon--Color: #ffffff;
        --pf-c-alert__title--Color: #ffffff;
    }

    .pf-c-alert__action > .pf-c-button {
        color: #ffffff;
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
