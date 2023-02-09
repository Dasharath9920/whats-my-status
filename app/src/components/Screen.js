import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import actionTypes from '../reducers/actionTypes';
import Analytics from './Analytics';
import Editor from './Editor';

function Screen() {

  const myState = useSelector(state => state.updateProperties);
  const dispatch = useDispatch();

  const [expand, setExpand] = useState(false);
  const [analyticMode, setAnalyticMode] = useState(myState.analyticMode);
  const [timeFilter, setTimeFilter] = useState(myState.timeFilter);

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
    dispatch({
      type: actionTypes.UPDATE_ANALYTIC_TYPE,
      analyticType: analyticType
    });
  }

  const updateTimeFilter = (filterType) => {
    let filter = timeOptions[filterType];
    setTimeFilter(filter);
    setExpand(false);

    dispatch({
      type: actionTypes.UPDATE_TIME_FILTERS,
      timeFilter: filter
    });
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

        <div className="filter-data-container">
          <label htmlFor="filter">Filter: </label>
          <div onClick={() => setExpand(!expand)} >{timeFilter}</div>
          <span>{!expand? <KeyboardArrowDownIcon sx={{fontSize: 30}}/>: <KeyboardArrowUpIcon sx={{fontSize: 30}}/> }</span>
            {expand && 
              <ul className='time-list'>
                  {Object.keys(timeOptions).map((timePeriod,index) => 
                    <li key={index} className='list-item' onClick={(e) => updateTimeFilter(timePeriod)}>{timeOptions[timePeriod]}</li>
                  )}
              </ul>
            }
        </div>

        <div className="analytic-container">
          {analyticMode && <Analytics /> }

          {!analyticMode && <Editor />}
        </div>
    </div>
  )
}

export default Screen;