import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';

function Analytics() {

  const myState = useSelector(state => state.updateProperties);
  const [analyticType, setAnaleyticType] = useState(myState.analyticType);
  const [timeFilter, setTimeFilter] = useState(myState.timeFilter);
  const [property, setProperty] = useState(myState.property)
  let [data, setData] = useState([]);

  const fetchData = async () => {
    const response = await fetch(`allData/${myState.property}/${myState.timeFilter}/`);
    let data = await response.json();
    setData(data);
    console.log("data: ",data)
  }

  useEffect(() => {
    setAnaleyticType(myState.analyticType);
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
            let investedIn = property === 'time'? data['timeSpentOn']: data['amountSpentOn'];
            let _property = property[0].toUpperCase() + property.substr(1);
            let quantity =  (data[property]/60).toFixed(2);

            if(property == 'time')
              quantity += ' hours';
            else
              quantity = 'Rs.' + quantity;

            return <div className='analytic-item' key={index}>
              <h5>{investedIn}</h5>
              <div>
                <p>{_property}: {quantity}</p>
              </div>
            </div>
          })
        }
    </div>
  )
}

export default Analytics;