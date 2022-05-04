import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { css, Global } from "@emotion/react";
import ErrorPage from './pages/ErrorPage/ErrorPage';
import HomePage from './pages/HomePage/HomePage';

const GlobalStyles = css`
    ::selection {
        background: #ffd200;
        color: #000000;
    }
`;

export default function App() {
    return (
        <>
            <Global styles={GlobalStyles} />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="*" element={<ErrorPage />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}
