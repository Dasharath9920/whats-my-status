import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import actionTypes from '../reducers/actionTypes';

function Controls() {

  const myState = useSelector(state => state.updateProperties);
  const dispatch = useDispatch();

  const [analyticMode, setAnalyticMode] = useState(true);

  const setPropertyType = (propertyType) => {
    dispatch({
        type: actionTypes.UPDATE_PROPERTY,
        property: propertyType
    })
  }

  const setAnalyticModes = () => {
    let mode = !analyticMode;
    setAnalyticMode(mode);

    dispatch({
        type: actionTypes.UPDATE_ANALYTIC_MODE,
        analyticMode: mode
    })
  }

  return (
    <div className='controls'>
        <div className="control-btns">
            <button onClick={() => setPropertyType('time')}>Time</button>
            <button onClick={() => setPropertyType('money')}>Money</button>
        </div>
        <button className='btn-analytics' onClick={setAnalyticModes}>{!analyticMode? 'View Analytics': 'Add Activity'}</button>
    </div>
  )
}

export default Controls;