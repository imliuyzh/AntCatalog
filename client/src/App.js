import Alert from '@mui/material/Alert';
import { css, Global } from "@emotion/react";
import { React, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';

import CourseList from './components/CourseList/CourseList';
import GradeChart from './components/Chart/Chart';
import { InputStateProvider } from './contexts/InputStateProvider';
import SearchForm from './components/SearchForm/SearchForm';

const GlobalStyles = css`    
    body {
        box-sizing: border-box;
        font-family: FFKievitSlabWebProBook, 'Times New Roman', serif;
        margin: 0;
        padding: 0;
    }

    ::selection {
        background: #ffd200;
        color: #000000;
    }

    #content {
        align-items: center;
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        height: 100vh;
        justify-content: center;
        width: 100vw;
    }

    #search-and-course-list-area {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 450px;
    }
    
    .pf-c-modal-box > .pf-c-button + * {
        margin: 0;
    }
    
    .pf-c-button .pf-m-plain {
        color: #ffffff;
        z-index: 100;
    }

    @media (max-width: 1279px) {
        body {
            box-sizing: border-box;
            font-family: FFKievitSlabWebProBook, 'Times New Roman', serif;
            margin: 0;
            padding: 48px 0;
        }
    }
`;

export default function App() {
    let [isAlertEnabled, enableAlert] = useState(false);
    let [alertMessage, setAlertMessage] = useState('');
    
    const openAlert = (message) => {
        enableAlert(true);
        setAlertMessage(message);
    };
    
    return (
        <>
            <Global styles={GlobalStyles} />
            <Snackbar open={isAlertEnabled} autoHideDuration={3000} onClose={() => enableAlert(false)}>
                <Alert
                    onClose={() => enableAlert(false)}
                    severity='error'
                    sx={{
                        fontFamily: 'RedHatText, Arial, sans-serif',
                        width: '100%'
                    }}
                >
                    {alertMessage}
                </Alert>
            </Snackbar>
            <InputStateProvider>
                <div id="content">
                    <div id="search-and-course-list-area">
                        <SearchForm openAlert={openAlert} />
                        <CourseList openAlert={openAlert} />
                    </div>
                </div>
            </InputStateProvider>
        </>
    );
}
