import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ScheduleIcon from '@mui/icons-material/Schedule';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import actionTypes from '../reducers/actionTypes';

function DataList() {

    const myState = useSelector(state => state.updateProperties);
    const dispatch = useDispatch();
    const [property, setProperty] = useState(myState.property)
    const [data, setData] = useState(myState.data);

    const moneySpentList = {
        OUTSIDE_FOOD: 'outside food',
        ONLINE_SHOPPING: 'online shopping',
        SENT_HOME: 'sent home',
        HOUSEHOLD_EXPENSES: 'household expenses',
        ENTERTAINMENT: 'entertainment',
        DEBT: 'debt',
        TRAVEL_EXPENSES: 'travel expenses'
    }

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

  const editData = async (index) => {
    dispatch({
      type: actionTypes.UPDATE_CURRENT_DATA,
      currentData: {
        quantity: property === 'time'? data[index].time: data[index].amount,
        action: property === 'time'? data[index].timeSpentOn: data[index].amountSpentOn,
        id: data[index].id,
        editMode: true
      }
    })

    dispatch({
      type: actionTypes.UPDATE_ANALYTIC_MODE,
      analyticMode: false
    })
  }

  const deleteData = async (index) => {
    let content = {
      id: data[index].id,
      property: myState.property
    }

    await fetch(`delete/`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(content)
    })
    .then(async (response) => {
      console.log(await response.json());
      
      dispatch({
        type: actionTypes.FETCH_DATA,
        fetchData: true
      })
    })
    .catch(() => {
      console.log('something went wrong');
    })
  }

  useEffect(() => {
    setData(myState.data);
    setProperty(myState.property);
  },[myState.property, myState.data])

  return (
    <div className='statistics'>
        { 
            data.map((data,index) => {
              let investedIn = property === 'time'? timeSpentList[data['timeSpentOn']]: moneySpentList[data['amountSpentOn']];
              let quantity =  property==='time'? (data[property]/60).toFixed(2): data[property];

              if(property === 'time')
                quantity += ' hours';
              else
                quantity = 'Rs. ' + quantity;

              return <div className='analytic-item' key={index}>
                <div className='analytic-item-header'>
                  <p>{investedIn}</p>
                  <h3>{quantity}</h3>
                </div>
                <div className='analytic-item-quantity'>
                  <div className='analytic-item-time'>
                    <div className="updated-time"><ScheduleIcon sx={{fontSize: 16}}/> <span>{data['updatedOn']}</span></div>
                  </div>
                  <div className='analytic-item-status'></div>
                </div>
                <div className="analytic-item-btns">
                  <button onClick={() => editData(index)}><BorderColorIcon sx={{fontSize:13, color: 'green', marginRight: '2px'}}/> <span>edit</span></button>
                  <button onClick={() => deleteData(index)}><DeleteIcon sx={{fontSize:15, color: 'red', marginRight: '1px'}}/> <span>delete</span></button>
                </div>
              </div>
            })
        }
    </div>
)}

export default DataList;