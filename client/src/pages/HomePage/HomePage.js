import EmptyChart from '../../components/EmptyChart/EmptyChart';
import ErrorAlert from '../../components/ErrorAlert/ErrorAlert';
import Logo from '../../assets/images/logo.png';
import { lazy, Suspense, useEffect } from 'react';
import SearchForm from '../../components/SearchForm/SearchForm';
import styled from '@emotion/styled';
import { useSelector } from 'react-redux';

const HomePageContainerElement = styled.div`
    #content {
        align-items: center;
        display: flex;
        flex-wrap: wrap;
        height: 100vh;
        justify-content: center;
    }

    #logo {
        cursor: pointer;
        width: 80%;
    }

    #left-area {
        align-items: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 64px 0;
        width: 450px;
    }

    #course-list-button {
        margin: 20px 0 0;
    }

    #right-area {
        padding: 24px 16px;
        max-width: 800px;
        width: 50vw;
    }

    @media (max-width: 1023px) {
        body {
            padding: 48px 0;
        }

        #right-area {
            width: 100%;
        }
    }
`;

const CourseList = lazy(() => import('../../components/CourseList/CourseList'));
const GradeChart = lazy(() => import('../../components/GradeChart/GradeChart'));

export default function HomePage() {
    let internalState = useSelector(state => state.internalState),
        searchResultState = useSelector(state => state.searchResult),
        selectedCoursesState = useSelector(state => state.selectedCourses);

    useEffect(() => document.title = 'AntCatalog', []);

    const noDataExist = (isAggregate) => isAggregate !== true
        ? Object.keys(selectedCoursesState).length <= 0
        : searchResultState.data.length <= 0;

    return (
        <HomePageContainerElement>
            <ErrorAlert />
            <main id="content">
                <section id="left-area">
                    <img src={Logo} id="logo" alt="AntCatalog Logo" onClick={() => window.location.reload()} />
                    <SearchForm />
                    <Suspense fallback={null}>
                        <CourseList />
                    </Suspense>
                </section>
                <section id="right-area">
                    {noDataExist(internalState.formInput.aggregate)
                        ? <EmptyChart />
                        : <Suspense fallback={<EmptyChart />}><GradeChart /></Suspense>}
                </section>
            </main>
        </HomePageContainerElement>
    );
}
