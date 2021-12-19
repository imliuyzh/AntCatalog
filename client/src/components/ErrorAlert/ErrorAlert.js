import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { InternalContext } from '../../contexts/InternalStateProvider';
import { useContext } from 'react';

export default function ErrorAlert() {
    let { alertMessage, showAlert, setShowAlert } = useContext(InternalContext);
    return (
        <Snackbar
            autoHideDuration={3000}
            onClose={() => setShowAlert(false)}
            open={showAlert}
        >
            <Alert
                onClose={() => setShowAlert(false)}
                severity='error'
                sx={{
                    fontFamily: 'RedHatText, Arial, sans-serif',
                    width: '100%'
                }}
            >
                {alertMessage}
            </Alert>
        </Snackbar>
    );
}