import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { useDispatch, useSelector } from 'react-redux';
import { closeAlert } from '../../features/internalStateSlice';

export default function ErrorAlert() {
    let internalState = useSelector(state => state.internalState);
    let internalStateDispatch = useDispatch();

    return (
        <Snackbar
            autoHideDuration={3000}
            onClose={() => internalStateDispatch(closeAlert())}
            open={internalState.showAlert}
        >
            <Alert
                onClose={() => internalStateDispatch(closeAlert())}
                severity='error'
                sx={{
                    fontFamily: 'RedHatText, Arial, sans-serif',
                    width: '100%'
                }}
            >
                {internalState.alertMessage}
            </Alert>
        </Snackbar>
    );
}
