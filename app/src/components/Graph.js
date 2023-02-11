import React, {useState, useEffect} from 'react';
import { useSelector} from 'react-redux';
import { timeSpentList, moneySpentList, colors } from '../assets/data';
import { fineTuneTime } from './helper';

function Graph() {

  const myState = useSelector(state => state.updateProperties);
  const [property, setProperty] = useState(myState.property)
  const [data, setData] = useState(myState.data);
  const [graphData, setGraphData] = useState({});

  const setBarWidths = (quantity, id, maxQuantity) => {
    if(myState.property === 'time')
      quantity /= 60;

    let ratio = Math.floor(quantity/maxQuantity*10-0.001);
    let width = Math.floor((400*quantity)/maxQuantity);

    document.getElementById(id).style.width = width + 'px';
    document.getElementById(id).style.backgroundColor = colors[ratio];
  }

  const categorizeData = () => {
    let graphDt = {}, maxQuantity = 0;
    const key = myState.property + 'SpentOn';

    if(myState.property === 'time'){
      Object.keys(timeSpentList).forEach((item) => graphDt[timeSpentList[item]] = 0);
      myState.data.forEach((dataItem) => {
        graphDt[timeSpentList[dataItem[key]]] += dataItem[myState.property];
      })
      Object.keys(graphDt).forEach((key) => maxQuantity = Math.max(maxQuantity,graphDt[key]/60));
    }
    else{
      Object.keys(moneySpentList).forEach((item) => graphDt[moneySpentList[item]] = 0);
      myState.data.forEach((dataItem) => {
        graphDt[moneySpentList[dataItem[key]]] += dataItem[myState.property];
      })
      Object.keys(graphDt).forEach((key) => maxQuantity = Math.max(maxQuantity,graphDt[key]));
    }

    setGraphData(graphDt);
    setTimeout(() => {
      Object.keys(graphDt).forEach((key,index) => setBarWidths(graphDt[key],`graph-item-${index+1}`,maxQuantity))
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