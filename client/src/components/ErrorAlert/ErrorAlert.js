import { Alert, AlertActionCloseButton, AlertGroup } from '@patternfly/react-core';
import { closeAlert } from '../../features/internalStateSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function ErrorAlert() {
    let internalState = useSelector(state => state.internalState);
    let internalStateDispatch = useDispatch();

    return internalState.showAlert
        ? (
            <AlertGroup isToast isLiveRegion>
                <Alert
                    actionClose={<AlertActionCloseButton onClose={() => internalStateDispatch(closeAlert())} />}
                    isLiveRegion
                    title={internalState.alertMessage}
                    tooltipPosition='bottom-start'
                    variant="danger"
                />
            </AlertGroup>
        )
        : '';
}
