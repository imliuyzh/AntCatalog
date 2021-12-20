import ErrorAlert from './components/ErrorAlert/ErrorAlert';
import { css, Global } from "@emotion/react";
import CourseList from './components/CourseList/CourseList';
import GradeChart from './components/Chart/Chart';
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
        height: 100vh;
        justify-content: center;
        width: 100vw;
    }

    #search-and-course-list-area {
        display: flex;
        flex-direction: column;
        height: 80%;
        justify-content: center;
        width: 450px;
    }

    #chart-area {
        height: 50vh;
        width: 720px;
    }

    @media (max-width: 1279px) {
        body {
            padding: 48px 0;
        }
    }
`;

export default function App() {
    return (
        <>
            <Global styles={GlobalStyles} />
            <InternalStateProvider>
                <ErrorAlert />
                <div id="content">
                    <div id="search-and-course-list-area">
                        <SearchForm />
                        <CourseList />
                    </div>
                    <div id="chart-area">
                        <GradeChart />
                    </div>
                </div>
            </InternalStateProvider>
        </>
    );
}
