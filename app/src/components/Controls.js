import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import actionTypes from '../reducers/actionTypes';
import AddIcon from '@mui/icons-material/Add';
import EqualizerIcon from '@mui/icons-material/Equalizer';

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

  useEffect(() => {
    setAnalyticMode(myState.analyticMode);
  },[myState.analyticMode])

  return (
    <div className='controls'>
        <div className="control-btns">
            <button onClick={() => setPropertyType('time')}>Time</button>
            <button onClick={() => setPropertyType('amount')}>amount</button>
        </div>
        <button className='btn-analytics' onClick={setAnalyticModes}>{analyticMode? <AddIcon sx={{fontSize: 30}}/>: <EqualizerIcon sx={{fontSize: 30}}/>}</button>
    </div>
  )
}

export default Controls;