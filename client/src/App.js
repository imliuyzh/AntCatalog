import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { css, Global } from "@emotion/react";
import HomePage from './pages/HomePage/HomePage';
import { lazy, Suspense } from 'react';

const GlobalStyles = css`
    ::selection {
        background: #ffd200;
        color: #000000;
    }
`;

const ErrorPage = lazy(() => import('./pages/ErrorPage/ErrorPage'));

export default function App() {
    return (
        <>
            <Global styles={GlobalStyles} />
            <BrowserRouter>
                <Routes>
                    <Route
                        element={<HomePage />}
                        path="/"
                    />
                    <Route
                        element={
                            <Suspense fallback={null}>
                                <ErrorPage />
                            </Suspense>
                        }
                        path="*"
                    />
                </Routes>
            </BrowserRouter>
        </>
    );
}
