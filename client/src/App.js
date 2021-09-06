import { bindActionCreators } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import searchResultActionCreators from './actions/searchResultActionCreators';

import './App.css';

function App() {
    let searchResultState = useSelector(state => state.searchResult);
    let dispatch = useDispatch();
    let { addResults, replaceResults } = bindActionCreators(searchResultActionCreators, dispatch);
    
    return ();
}

/*      <button onClick={() => depositMoney(1000)}>Deposit</button>
      <button onClick={() => withdrawMoney(1000)}>Withdraw</button>*/

export default App;
