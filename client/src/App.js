import CourseList from './components/CourseList/CourseList';
import GradeChart from './components/Chart/Chart';
import SearchForm from './components/SearchForm/SearchForm';

import './App.css';

export default function App() {
    return (
        <div id="content">
            <div id="search-and-course-list-area">
                <SearchForm />
                <CourseList />
            </div>
            <div id="chart-area">
                <GradeChart />
            </div>
        </div>
    );
}
