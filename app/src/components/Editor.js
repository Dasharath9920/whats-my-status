import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import actionTypes from '../reducers/actionTypes';

function Editor() {

  const myState = useSelector(state => state.updateProperties);
  const dispatch = useDispatch();

  const [property, setProperty] = useState(myState.property);
  const [expand, setExpand] = useState(false);
  
  const [timeSpentOn, setTimeSpentOn] = useState('');
  const [time, setTime] = useState();
  const [amount, setAmount] = useState();
  const [amountSpentOn, setAmountSpentOn] = useState('');

  const timeSpentList = {
    WASTED_TIME: 'wasted time',
    OFFICE_WORK: 'office work',
    IMPROVING_SKILLS: 'improving skills',
    ROAMING_OUTSIDE: 'roaming outside',
    OUTSIDE_ON_WORK: 'went out for work',
    SLEEP: 'sleeping',
    WORKOUT: 'had a workout',
    SPORTS: 'playing games'
  }

  const moneySpentList = {
    OUTSIDE_FOOD: 'outside food',
    ONLINE_SHOPPING: 'online shopping',
    SENT_HOME: 'sent home',
    HOUSEHOLD_EXPENSES: 'household expenses',
    ENTERTAINMENT: 'entertainment',
    DEBT: 'debt',
    TRAVEL_EXPENSES: 'travel expenses'
  }

  const updateTimeSpent = (timeSpent) => {
    setTimeSpentOn(timeSpent);
    setExpand(false);
  };

  const updateAmountSpent = (amountSpent) => {
    setAmountSpentOn(amountSpent);
    setExpand(false);
  }

  const resetInputs = () => {
    setAmount('');
    setTime('');
    setAmountSpentOn('');
    setTimeSpentOn('');
  }

  const onDiscard = () => {
    resetInputs();

    dispatch({
        type: actionTypes.UPDATE_ANALYTIC_MODE,
        analyticMode: true
    })
  }

  const onSave = async () => {
    let data = {};
    if(property === 'time'){
        if(!timeSpentOn?.length || !time){
            window.alert('Enter all fields');
            return;
        }
        data = {
            property: property,
            timeSpentOn: timeSpentOn,
            time: time,
        }
    }
    else{
        if(!amountSpentOn?.length || !amount){
            window.alert('Enter all fields');
            return;
        }
        data = {
            property: property,
            amountSpentOn: amountSpentOn,
            amount: amount,
        }
    }

    if(myState.currentData.editMode){
        data['id'] = myState.currentData.id;
    }

    await fetch(`/${property}/upload/`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(() => {
        resetInputs();

        dispatch({
            type: actionTypes.UPDATE_ANALYTIC_MODE,
            analyticMode: true
        })
    });

  }

  useEffect(() => {
    if(!myState.currentData.editMode)
        return;

    if(myState.property === 'time'){
        updateTimeSpent(myState.currentData.action);
        setTime(myState.currentData.quantity);
    }
    else{
        updateAmountSpent(myState.currentData.action);
        setAmount(myState.currentData.quantity);
    }
  },[myState.currentData]);

  useEffect(() => {
    if(myState.currentData.editMode)
        return;

    setProperty(myState.property);
    resetInputs();
  },[myState.property, myState.analyticMode]);

  return (
    <div className='editor'>
        {property === 'time' && 
            <div className='editor-time-container'>
                <div className="place-container">
                    <button onClick={() => setExpand(!expand)}>{timeSpentOn? timeSpentList[timeSpentOn]: 'How did you spent your time'}<span>{!expand? <KeyboardArrowDownIcon sx={{fontSize: 40}}/>: <KeyboardArrowUpIcon sx={{fontSize: 40}}/> }</span></button>
                    {expand && 
                        <ul className='place-list'>
                            {Object.keys(timeSpentList).map((timeSpent,index) => 
                                <li key={index} className='list-item' onClick={(e) => updateTimeSpent(timeSpent)}>{timeSpentList[timeSpent]}</li>
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

        {property === 'amount' && 
            <div className='editor-time-container'>
                <div className="place-container">
                    <button onClick={() => setExpand(!expand)}>{amountSpentOn? moneySpentList[amountSpentOn]: 'How did you spend your amount'}<span>{!expand? <KeyboardArrowDownIcon sx={{fontSize: 40}}/>: <KeyboardArrowUpIcon sx={{fontSize: 40}}/> }</span></button>
                    {expand && 
                        <ul className='place-list'>
                            {Object.keys(moneySpentList).map((moneySpent,index) => 
                                <li key={index} className='list-item' onClick={(e) => updateAmountSpent(moneySpent)}>{moneySpentList[moneySpent]}</li>
                            )}
                        </ul>
                    }
                </div>

                <div className="time-container">
                    <p>Amount spent </p>
                    <input type="number" placeholder='In Indian Rupees' className='input-minutes' value={amount} onChange={(e) => setAmount(e.target.value)}/>
                </div>
            </div>
        }

        <div className="control-btns editor-btns">
            <button className='btn-discard' onClick={onDiscard}>Discard</button>
            <button className='btn-save' onClick={onSave}>Save</button>
        </div>
    </div>
  )
}

export default Editor;