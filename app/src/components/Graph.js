import React, {useState, useEffect} from 'react';
import { useSelector} from 'react-redux';
import { timeSpentList, moneySpentList, colors } from '../assets/data';
import { fineTuneTime, getColorKeyForTime } from './helper';

function Graph() {

  const myState = useSelector(state => state.updateProperties);
  const [property, setProperty] = useState(myState.property)
  const [data, setData] = useState(myState.data);
  const [graphData, setGraphData] = useState({});

  const setBarWidths = (type, quantity, id, maxQuantity) => {

    let colorKey = Math.max(0,Math.floor(quantity/maxQuantity*10-0.001));
    let width = Math.max(2,Math.floor((quantity*100)/maxQuantity));
    if(property === 'time'){
      if([timeSpentList.IMPROVING_SKILLS,timeSpentList.OFFICE_WORK,timeSpentList.SLEEP,timeSpentList.SPORTS,timeSpentList.WORKOUT].some(item => item === type)){
        colorKey = 9-colorKey;
      }
    }
    if(colorKey)
      colorKey--;

    document.getElementById(id).style.width = width + '%';
    document.getElementById(id).style.backgroundColor = colors[colorKey];
  }

  const categorizeData = () => {
    let graphDt = {}, maxQuantity = 0;
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
    Object.keys(graphDt).forEach((key) => maxQuantity = Math.max(maxQuantity,graphDt[key]));

    setGraphData(graphDt);
    setTimeout(() => {
      Object.keys(graphDt).forEach((key,index) => setBarWidths(key, graphDt[key],`graph-item-${index+1}`,Math.max(1,maxQuantity)))
    })
  }

  useEffect(() => {
    setData(myState.data);
    setProperty(myState.property);

    categorizeData();
  },[myState.data])

  return (
    <div className='graph-container'>
      {
        Object.keys(graphData).map((key, index) => {
          let quantity = graphData[key];

          if(property === 'time')
            quantity = fineTuneTime(quantity);
          else
            quantity = 'Rs. ' + quantity;

          return <div className='graph-item' key={index}>
            <div className="graph-item-header">
              <h3>{key}</h3>
              <p>{quantity}</p>
            </div>
              <div className="bar-container">
                <div className="bar" id={`graph-item-${index+1}`}></div>
              </div>
          </div>
        })
      }
    </div>
  )
}

export default Graph;