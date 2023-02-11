import './App.css';
import Screen from './components/Screen';
import Controls from './components/Controls';
import {useSelector, useDispatch} from 'react-redux';
import actionTypes from './reducers/actionTypes';
import { useEffect } from 'react';

function App() {

  const myState = useSelector(state => state.updateProperties);
  const dispatch = useDispatch();

  const fetchData = async () => {
    const response = await fetch(`allData/${myState.property}/${myState.timeFilter}/`);
    let data = await response.json();
    
    dispatch({
      type: actionTypes.UPDATE_DATA,
      data: data
    })
  }

  useEffect(() => {
    if(myState.fetchData){
      fetchData();

      dispatch({
        type: actionTypes.FETCH_DATA,
        fetchData: false
      })
    }
  },[myState.fetchData])

  return (
    <div className="App">
      <Screen />
      <Controls />
    </div>
  );
}

export default App;
