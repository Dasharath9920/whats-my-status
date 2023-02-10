import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ScheduleIcon from '@mui/icons-material/Schedule';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import actionTypes from '../reducers/actionTypes';

function Analytics() {

  const myState = useSelector(state => state.updateProperties);
  const dispatch = useDispatch();
  const [analyticType, setAnalyticType] = useState(myState.analyticType);
  const [timeFilter, setTimeFilter] = useState(myState.timeFilter);
  const [property, setProperty] = useState(myState.property)
  let [data, setData] = useState([]);

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

  const analyticTypes = ['data','graph','report'];

  const moneySpentList = {
    OUTSIDE_FOOD: 'outside food',
    ONLINE_SHOPPING: 'online shopping',
    SENT_HOME: 'sent home',
    HOUSEHOLD_EXPENSES: 'household expenses',
    ENTERTAINMENT: 'entertainment',
    DEBT: 'debt',
    TRAVEL_EXPENSES: 'travel expenses'
  }

  const fetchData = async () => {
    const response = await fetch(`allData/${myState.property}/${myState.timeFilter}/`);
    let data = await response.json();
    setData(data);
  }

  const setAnalytics = (analyticType) => {
    setAnalyticType(analyticType);
    analyticTypes.forEach(type => document.getElementById(type).style.borderBottomColor = 'transparent');
    document.getElementById(analyticType).style.borderBottomColor = 'orange';
  }

  const editData = async (index) => {
    dispatch({
      type: actionTypes.UPDATE_CURRENT_DATA,
      currentData: {
        quantity: property === 'time'? data[index].time: data[index].amount,
        action: property === 'time'? data[index].timeSpentOn: data[index].amountSpentOn,
        id: data[index].id
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
    .then(() => {
      console.log('data deleted successfully');
    })
    .catch(() => {
      console.log('something went wrong');
    })
  }

  useEffect(() => {
    setAnalytics(myState.analyticType);
    setTimeFilter(myState.timeFilter);
    setProperty(myState.property);
  },[myState.analyticType, myState.timeFilter, myState.property]);

  useEffect(() => {
    fetchData();
  },[myState.timeFilter, myState.property])

  return (
    <div className='analytics'>
        <div className="control-btns analytic-btns">
          <button id='data' onClick={() => setAnalytics('data')}>DATA</button>
          <button id='graph' onClick={() => setAnalytics('graph')}>GRAPH</button>
          <button id='report' onClick={() => setAnalytics('report')}>REPORT</button>
        </div>
        <div className='statistics'>
          {
            data.map((data,index) => {
              let investedIn = property === 'time'? timeSpentList[data['timeSpentOn']]: moneySpentList[data['amountSpentOn']];
              let quantity =  (data[property]/60).toFixed(2);

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
    </div>
  )
}

export default Analytics;