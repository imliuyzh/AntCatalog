import Alert from '@mui/material/Alert';
import { bindActionCreators } from 'redux';
import Snackbar from '@mui/material/Snackbar';
import { useDispatch, useSelector } from 'react-redux';
import * as internalStateActionCreators from '../../actions/internalStateActionCreators';

export default function ErrorAlert() {
    let internalState = useSelector(state => state.InternalState);
	let internalStateDispatch = useDispatch();
    let { closeAlert } = bindActionCreators(internalStateActionCreators, internalStateDispatch);

    return (
        <Snackbar
            autoHideDuration={3000}
            onClose={() => closeAlert()}
            open={internalState.showAlert}
        >
            <Alert
                onClose={() => closeAlert()}
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