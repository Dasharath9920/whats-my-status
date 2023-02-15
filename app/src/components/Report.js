import React, {useState, useEffect} from 'react';
import { useSelector} from 'react-redux';
import { timeSpentList, moneySpentList, colors } from '../assets/data';
import { fineTuneTime, getCategorizedData, getColorKeyForAmount, getColorKeyForTime, getSafeZoneForAmountSpent, getSafeZoneForTimeSpent } from './helper';

function Report() {
  const myState = useSelector(state => state.updateProperties);
  const [property, setProperty] = useState(myState.property)
  const [data, setData] = useState(myState.data);
  const [graphData, setGraphData] = useState({});

  const setBarWidths = (type, quantity, id) => {
    let safeZone = myState.property === 'time'? getSafeZoneForTimeSpent(type, myState.timeFilter, myState.data): getSafeZoneForAmountSpent(type,myState.timeFilter, myState.data);
    let colorKey = myState.property === 'time'? getColorKeyForTime(type, myState.timeFilter, myState.data, quantity): getColorKeyForAmount(type,myState.timeFilter, myState.data, quantity);
    let width = Math.min(100,Math.max(2,Math.floor((quantity*100)/safeZone)));
    document.getElementById(id).style.width = width + '%';
    document.getElementById(id).style.backgroundColor = colors[colorKey];
  }

  const categorizeData = () => {
    let graphDt = getCategorizedData(myState.data, myState.property);
    setGraphData(graphDt);
    setTimeout(() => {
      Object.keys(graphDt).forEach((key,index) => setBarWidths(key, graphDt[key],`report-item-${index+1}`))
    })
  }

  useEffect(() => {
    setData(myState.data);
    setProperty(myState.property);

    categorizeData();
  },[myState.data])

  return (
    <div className='report-container'>
      {
        Object.keys(graphData).map((key, index) => {
          let quantity = graphData[key];

          if(property === 'time')
            quantity = fineTuneTime(quantity);
          else
            quantity = 'Rs. ' + quantity;

          return <div className='report-item' key={index}>
            <div className="report-item-header">
              <h3>{property === 'time'? timeSpentList[key]: moneySpentList[key]}</h3>
              <p>{quantity}</p>
            </div>
              <div className="bar-container">
                <div className="bar" id={`report-item-${index+1}`}></div>
              </div>
          </div>
        })
      }
    </div>
  )
}

export default Report;