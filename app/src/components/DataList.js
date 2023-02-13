import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ScheduleIcon from '@mui/icons-material/Schedule';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import actionTypes from '../reducers/actionTypes';
import { moneySpentList, timeSpentList, colors } from '../assets/data';
import { fineTuneTime, getColorKeyForAmount, getColorKeyForTime } from './helper';

function DataList() {

  const myState = useSelector(state => state.updateProperties);
  const dispatch = useDispatch();
  const [property, setProperty] = useState(myState.property)
  const [data, setData] = useState(myState.data);

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
    if(!window.confirm('Are you sure you want to delete'))
        return;

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

    setTimeout(() => {
      myState.data.forEach((dataItem,index) => {
          let id = `data-item-status-${index}`;
          let colorKey = 0;
          if(myState.property === 'amount'){
            colorKey = getColorKeyForAmount(dataItem['amount']);
          }
          else{
            colorKey = getColorKeyForTime(dataItem['time'])
          }

          document.getElementById(id).style.backgroundColor = colors[colorKey];
        })
      })
  },[myState.property, myState.data])

  return (
    <div className='statistics'>
        { 
            data.map((data,index) => {
              let investedIn = property === 'time'? timeSpentList[data['timeSpentOn']]: moneySpentList[data['amountSpentOn']];
              let quantity =  property==='time'? (data[property]/60).toFixed(2): data[property];
              let date = new Date(data['updatedOn']);

              if(property === 'time')
                quantity = fineTuneTime(data[property]);
              else
                quantity = 'Rs. ' + quantity;

              return <div className='analytic-item' key={index}>
                <div className='analytic-item-header'>
                  <p>{investedIn}</p>
                  <h3>{quantity}</h3>
                </div>
                <div className='analytic-item-quantity'>
                  <div className='analytic-item-time'>
                    <div className="updated-time"><ScheduleIcon sx={{fontSize: 16, marginBottom: 0.3}}/> <span>{date.toDateString()}</span></div>
                  </div>
                  <div className='analytic-item-status' id={`data-item-status-${index}`}></div>
                </div>
                <div className="analytic-item-btns">
                  <button onClick={() => editData(index)}><BorderColorIcon sx={{fontSize:13, color: 'green', marginRight: '2px'}}/> <span>edit</span></button>
                  <button onClick={() => deleteData(index)}><DeleteIcon sx={{fontSize:15, color: 'red', marginRight: '1px'}}/> <span>delete</span></button>
                </div>
              </div>
            })
        }
        {
            !data.length && <h4 className='empty-data'>No results found     . Click add Icon below to add new Entry.</h4>
        }
    </div>
)}

export default DataList;