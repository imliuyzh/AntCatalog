import './App.css';

import SearchForm from './components/SearchForm/SearchForm';

export default function App() {
    return (
        <div id="content">
            <div id="search-and-course-list-area">
                <SearchForm />
            </div>
            <div id="chart-area"></div>
        </div>
    );
}
