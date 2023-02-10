import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import ScheduleIcon from '@mui/icons-material/Schedule';

function Analytics() {

  const myState = useSelector(state => state.updateProperties);
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

  useEffect(() => {
    setAnalyticType(myState.analyticType);
    setTimeFilter(myState.timeFilter);
    setProperty(myState.property);
  },[myState.analyticType, myState.timeFilter, myState.property]);

  useEffect(() => {
    fetchData();
  },[myState.timeFilter, myState.property])

  return (
    <div className='analytics'>
        {
          data.map((data,index) => {
            let investedIn = property === 'time'? timeSpentList[data['timeSpentOn']]: moneySpentList[data['amountSpentOn']];
            let _property = property[0].toUpperCase() + property.substr(1);
            let quantity =  (data[property]/60).toFixed(2);

            if(property === 'time')
              quantity += ' hours';
            else
              quantity = 'Rs. ' + quantity;

            return <div className='analytic-item' key={index}>
              <p>{investedIn}</p>
              <div className='analytic-item-quantity'>
                 <div className='analytic-item-time'>
                  <h3>{_property} {quantity}</h3>
                  <div className="updated-time"><ScheduleIcon sx={{fontSize: 16}}/> <span>{data['updatedOn']}</span></div>
                 </div>
                 <div className='analytic-item-status'></div>
              </div>
            </div>
          })
        }
    </div>
  )
}

export default Analytics;