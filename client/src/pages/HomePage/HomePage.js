import CourseList from '../../components/CourseList/CourseList';
import GradeChart from '../../components/Chart/GradeChart';
import ErrorAlert from '../../components/ErrorAlert/ErrorAlert';
import Logo from '../../assets/images/logo.png';
import SearchForm from '../../components/SearchForm/SearchForm';
import styled from '@emotion/styled';
import { useEffect } from 'react';

const HomePageContainerElement = styled.div`
    #content {
        align-items: center;
        display: flex;
        flex-wrap: wrap;
        height: 100vh;
        justify-content: center;
    }

    #logo {
	    width: 80%;
    }

    #search-area {
        align-items: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 64px 0;
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

export default function HomePage() {
    useEffect(() => document.title = 'AntCatalog', []);
    return (
        <HomePageContainerElement>
            <ErrorAlert />
            <main id="content">
                <section id="search-area">
                    <img src={Logo} id="logo" alt="AntCatalog Logo" />
                    <SearchForm />
                    <CourseList />
                </section>
                <section id="chart-area">
                    <GradeChart />
                </section>
            </main>
        </HomePageContainerElement>
    );
}