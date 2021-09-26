import { css, Global } from "@emotion/react";

import CourseList from './components/CourseList/CourseList';
import GradeChart from './components/Chart/Chart';
import SearchForm from './components/SearchForm/SearchForm';

import '@patternfly/react-core/dist/styles/base.css';

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
    return (
        <>
            <Global styles={GlobalStyles} />
            <div id="content">
                <div id="search-and-course-list-area">
                    <SearchForm />
                    <CourseList />
                </div>
            </div>
        </>
    );
}
