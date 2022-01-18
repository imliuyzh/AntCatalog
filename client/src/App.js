import { css, Global } from "@emotion/react";
import ErrorPage from './pages/ErrorPage/ErrorPage';
import HomePage from './pages/HomePage/HomePage';
import { InternalStateProvider } from './contexts/InternalStateProvider';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

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
            <InternalStateProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/">
                            <Route index element={<HomePage />} />
                            <Route path="*" element={<ErrorPage />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </InternalStateProvider>
        </>
    );
}
