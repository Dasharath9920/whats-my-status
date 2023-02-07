import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function Editor() {

  const myState = useSelector(state => state.updateProperties);
  const [property, setProperty] = useState(myState.property);
  const [expand, setExpand] = useState(false);
  const [place, setPlace] = useState('');
  
  const timeSpentOn = {
    WASTED_TIME: 'wasted time',
    OFFICE_WORK: 'office work',
    IMPROVEd_SKILLS: 'improving skills',
    ROAMING_OUTSIDE: 'roaming outside',
    OUTSIDE_ON_WORK: 'went out for work',
    SLEEP: 'sleeping',
    WORKOUT: 'had a workout',
    SPORTS: 'playing games'
  }

  const updateTimeFilter = (timeSpent) => {
    setPlace(timeSpent);
  };

  useEffect(() => {
    setProperty(myState.property);
  },[myState.property]);

  return (
    <div className='editor'>
        {property === 'time' && 
            <div className='editor-time-container'>
                <div className="place-container">
                    <button onClick={() => setExpand(!expand)}>How did you spent your time <span>{!expand? <KeyboardArrowDownIcon sx={{fontSize: 40}}/>: <KeyboardArrowUpIcon sx={{fontSize: 40}}/> }</span></button>
                    {expand && 
                        <ul className='time-list'>
                            {Object.keys(timeSpentOn).map((timeSpent,index) => 
                                <li key={index} className='list-item' onClick={(e) => updateTimeFilter(timeSpent)}>{timeSpentOn[timeSpent]}</li>
                            )}
                        </ul>
                    }
                </div>

                <div className="time-container">
                    <label htmlFor="fromTime" className='time-label'>From </label>
                    <input type="datetime-local" id='fromTime' name='fromTime' className='date-time-block'/>
                </div>

                <div className="time-container">
                    <label htmlFor="toTime" className='time-label'>To </label>
                    <input type="datetime-local" id='toTime' name='toTime' className='date-time-block'/>
                </div>
            </div>
        }

        <div className="control-btns editor-btns">
            <button className='btn-discard'>Discard</button>
            <button className='btn-save'>Save</button>
        </div>
    </div>
  )
}

export default Editor;