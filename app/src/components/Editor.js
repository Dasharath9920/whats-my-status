import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function Editor() {

  const myState = useSelector(state => state.updateProperties);
  const [property, setProperty] = useState(myState.property);
  const [expand, setExpand] = useState(false);
  const [place, setPlace] = useState('');
  const [time, setTime] = useState();
  const [activity, setActivity] = useState('');
  const [amount, setAmount] = useState();
  
  const timeSpentOn = {
    WASTED_TIME: 'wasted time',
    OFFICE_WORK: 'office work',
    IMPROVING_SKILLS: 'improving skills',
    ROAMING_OUTSIDE: 'roaming outside',
    OUTSIDE_ON_WORK: 'went out for work',
    SLEEP: 'sleeping',
    WORKOUT: 'had a workout',
    SPORTS: 'playing games'
  }

  const moneySpentOn = {
    WASTED_TIME: 'wasted time',
    OFFICE_WORK: 'office work',
    IMPROVING_SKILLS: 'improving skills',
    ROAMING_OUTSIDE: 'roaming outside',
    OUTSIDE_ON_WORK: 'went out for work',
    SLEEP: 'sleeping',
    WORKOUT: 'had a workout',
    SPORTS: 'playing games'
  }

  const updateTimeSpent = (timeSpent) => {
    setPlace(timeSpent);
    setExpand(false);
  };

  const updateAmountSpent = (amountSpent) => {
    setActivity(amountSpent);
    setExpand(false);
  }

  const onSave = () => {
    let data = {};
    if(property === 'time'){
        data = {
            property: property,
            timeSpent: place,
            time: time,
        }
    }
    else{
        data = {
            property: property,
            amountSpent: activity,
            amount: amount,
        }
    }
    console.log('saving data: ',data)
  }

  useEffect(() => {
    setProperty(myState.property);
  },[myState.property]);

  return (
    <div className='editor'>
        {property === 'time' && 
            <div className='editor-time-container'>
                <div className="place-container">
                    <button onClick={() => setExpand(!expand)}>{place.length? timeSpentOn[place]: 'How did you spent your time'}<span>{!expand? <KeyboardArrowDownIcon sx={{fontSize: 40}}/>: <KeyboardArrowUpIcon sx={{fontSize: 40}}/> }</span></button>
                    {expand && 
                        <ul className='place-list'>
                            {Object.keys(timeSpentOn).map((timeSpent,index) => 
                                <li key={index} className='list-item' onClick={(e) => updateTimeSpent(timeSpent)}>{timeSpentOn[timeSpent]}</li>
                            )}
                        </ul>
                    }
                </div>

                <div className="time-container">
                    <p>Amount of Time spent </p>
                    <input type="number" placeholder='In Minutes' className='input-minutes' value={time} onChange={(e) => setTime(e.target.value)}/>
                </div>
            </div>
        }

        {property === 'money' && 
            <div className='editor-time-container'>
                <div className="place-container">
                    <button onClick={() => setExpand(!expand)}>{place.length? timeSpentOn[place]: 'How did you spend your money'}<span>{!expand? <KeyboardArrowDownIcon sx={{fontSize: 40}}/>: <KeyboardArrowUpIcon sx={{fontSize: 40}}/> }</span></button>
                    {expand && 
                        <ul className='place-list'>
                            {Object.keys(moneySpentOn).map((moneySpent,index) => 
                                <li key={index} className='list-item' onClick={(e) => updateAmountSpent(moneySpent)}>{moneySpentOn[moneySpent]}</li>
                            )}
                        </ul>
                    }
                </div>

                <div className="time-container">
                    <p>Amount spent </p>
                    <input type="number" placeholder='In Indian Rupees' className='input-minutes' value={time} onChange={(e) => setAmount(e.target.value)}/>
                </div>
            </div>
        }

        <div className="control-btns editor-btns">
            <button className='btn-discard'>Discard</button>
            <button className='btn-save' onClick={onSave}>Save</button>
        </div>
    </div>
  )
}

export default Editor;