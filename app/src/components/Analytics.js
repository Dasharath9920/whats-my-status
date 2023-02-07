import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';

function Analytics() {

  const myState = useSelector(state => state.updateProperties);
  const [mode, setMode] = useState(myState.analyticType);
  const [timeFilter, setTimeFilter] = useState(myState.timeFilter);

  var data = [];

  const getData = () => {
    
  }

  useEffect(() => {
    setMode(myState.analyticType);
    setTimeFilter(myState.timeFilter);

  },[myState.analyticType, myState.timeFilter]);



  return (
    <div className='analytics'>
        {mode}
    </div>
  )
}

export default Analytics;