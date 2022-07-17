import { Button, Modal, ModalVariant } from '@patternfly/react-core';
import { closeAlert } from '../../features/internalStateSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function ErrorAlert() {
    let internalState = useSelector(state => state.internalState);
    let internalStateDispatch = useDispatch();

    return (
        <Modal
            actions={[<Button key="confirm" onClick={() => internalStateDispatch(closeAlert())} variant="primary">OK</Button>]}
            isOpen={internalState.showAlert}
            onClose={() => internalStateDispatch(closeAlert())}
            showClose
            title="Error"
            variant={ModalVariant.small}
        >
            {internalState.alertMessage} 
        </Modal>
    );
}
