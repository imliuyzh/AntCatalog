import ErrorAlert from './components/ErrorAlert/ErrorAlert';
import { css, Global } from "@emotion/react";
import CourseList from './components/CourseList/CourseList';
import GradeChart from './components/Chart/GradeChart';
import { InternalStateProvider } from './contexts/InternalStateProvider';
import SearchForm from './components/SearchForm/SearchForm';

const GlobalStyles = css`
    ::selection {
        background: #ffd200;
        color: #000000;
    }

    #content {
        align-items: center;
        display: flex;
        flex-wrap: wrap;
        gap: 24px;
        height: 100vh;
        justify-content: center;
        width: 100vw;
    }

    #search-area {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 450px;
    }

    #chart-area {
        padding: 24px 16px;
        width: 50vw;
    }

    @media (max-width: 1279px) {
        body {
            padding: 48px 0;
        }

        #chart-area {
            width: 100%;
        }
    }
`;

export default function App() {
    return (
        <>
            <Global styles={GlobalStyles} />
            <InternalStateProvider>
                <ErrorAlert />
                <main id="content">
                    <section id="search-area">
                        <SearchForm />
                        <CourseList />
                    </section>
                    <section id="chart-area">
                        <GradeChart />
                    </section>
                </main>
            </InternalStateProvider>
        </>
    );
}
