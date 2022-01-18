import CourseList from '../../components/CourseList/CourseList';
import GradeChart from '../../components/GradeChart/GradeChart';
import EmptyChart from '../../components/EmptyChart/EmptyChart';
import ErrorAlert from '../../components/ErrorAlert/ErrorAlert';
import { InternalContext } from '../../contexts/InternalStateProvider';
import Logo from '../../assets/images/logo.png';
import SearchForm from '../../components/SearchForm/SearchForm';
import styled from '@emotion/styled';
import { useContext, useEffect } from 'react';
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

    @media (max-width: 1023px) {
        body {
            padding: 48px 0;
        }

        #chart-area {
            width: 100%;
        }
    }
`;

export default function HomePage() {
	let { formInput, selectedCourses } = useContext(InternalContext);
    let searchResultState = useSelector(state => state.searchResult);
    useEffect(() => document.title = 'AntCatalog', []);

    return (
        <HomePageContainerElement>
            <ErrorAlert />
            <main id="content">
                <section id="search-area">
                    <img src={Logo} id="logo" alt="AntCatalog Logo" onClick={(_) => window.location.reload()} />
                    <SearchForm />
                    <CourseList />
                </section>
                <section id="chart-area">
                    {
                        (([null, false].includes(formInput.aggregate) && Object.keys(selectedCourses).length <= 0)
                                || (formInput.aggregate === true && searchResultState.data.length <= 0))
                            ? <EmptyChart />
                            : <GradeChart />
                    }
                </section>
            </main>
        </HomePageContainerElement>
    );
}