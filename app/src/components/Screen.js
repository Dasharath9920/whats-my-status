import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import actionTypes from '../reducers/actionTypes';

function Screen() {

  const myState = useSelector(state => state.updateProperties);
  const dispatch = useDispatch();

  const [expand, setExpand] = useState(false);
  const [analyticType, setAnalyticType] = useState(myState.analyticType);
  const [analyticMode, setAnalyticMode] = useState(myState.analyticMode);

  const timeOptions = {
    TODAY: 'Today',
    LAST_WEEK: 'Last Week',
    ONE_MONTH: '1 Month',
    THREE_MONTHS: '3 Months',
    SIX_MONTHS: '6 Months',
    LAST_YEAR: 'Last Year',
    ALL_TIME: 'All Time'
  }

  const setAnalytics = (analyticType) => {
    setAnalyticType(analyticType);
  }

  useEffect(() => {
    setAnalyticMode(myState.analyticMode);
  },[myState.analyticMode])

  return (
    <div className='screen'>
        <div className="control-btns">
            <button onClick={() => setAnalytics('data')}>Data</button>
            <button onClick={() => setAnalytics('graph')}>Graph</button>
        </div>

        <div className="time-period">
            <button onClick={() => setExpand(!expand)}>Time Period <span>{!expand? <KeyboardArrowDownIcon sx={{fontSize: 40}}/>: <KeyboardArrowUpIcon sx={{fontSize: 40}}/> }</span></button>
            {expand && 
                <ul className='time-list'>
                    {Object.keys(timeOptions).map((timePeriod,index) => <li key={index} className='list-item'>{timeOptions[timePeriod]}</li>)}
                </ul>
            }
        </div>
        <div className="analytics">
            {analyticMode && <h1>Analytics screen</h1> }
            {!analyticMode && <h1>Non analytics screen</h1> }
        </div>
    </div>
  )
}

export default Screen;