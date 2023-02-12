import React, {useState, useEffect} from 'react';
import { useSelector} from 'react-redux';
import { timeSpentList, moneySpentList, colors } from '../assets/data';
import { fineTuneTime, getColorKeyForTime, getNumberOfDaysFromFirstEntry, getSafeZoneForAmountSpent, getSafeZoneForTimeSpent } from './helper';

function Report() {

  const myState = useSelector(state => state.updateProperties);
  const [property, setProperty] = useState(myState.property)
  const [data, setData] = useState(myState.data);
  const [graphData, setGraphData] = useState({});

  const setBarWidths = (type, quantity, id) => {
    let safeZone = myState.property === 'time'? getSafeZoneForTimeSpent(type, myState.timeFilter, myState.data): getSafeZoneForAmountSpent(type,myState.timeFilter, myState.data);

    let colorKey = Math.max(0,Math.min(9,Math.floor(quantity/safeZone*10-0.001)));
    let width = Math.min(100,Math.max(2,Math.floor((quantity*100)/safeZone)));
    
    if(myState.property === 'time'){
      if([timeSpentList.IMPROVING_SKILLS,timeSpentList.OFFICE_WORK,timeSpentList.SLEEP,timeSpentList.SPORTS,timeSpentList.WORKOUT].some(item => item === type)){
        colorKey = 9 - colorKey;
      }
    }
    else{
      if(moneySpentList.SENT_HOME === type || moneySpentList.DEBT === type){
        colorKey = 9 - colorKey;
      }
    }
    if(colorKey)
    colorKey--;
    
    document.getElementById(id).style.width = width + '%';
    document.getElementById(id).style.backgroundColor = colors[colorKey];
  }

  const categorizeData = () => {
    let graphDt = {};
    const key = myState.property + 'SpentOn';

    if(myState.property === 'time'){
      Object.keys(timeSpentList).forEach((item) => graphDt[timeSpentList[item]] = 0);
      myState.data.forEach((dataItem) => {
        graphDt[timeSpentList[dataItem[key]]] += dataItem[myState.property];
      })
    }
    else{
      Object.keys(moneySpentList).forEach((item) => graphDt[moneySpentList[item]] = 0);
      myState.data.forEach((dataItem) => {
        graphDt[moneySpentList[dataItem[key]]] += dataItem[myState.property];
      })
    }

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
              <h3>{key}</h3>
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