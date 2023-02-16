import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { moneySpentList, timeSpentList } from '../assets/data';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

function Chart() {

    const myState = useSelector(state => state.updateProperties);
    const [chartData, setChartData] = useState([]);
    const [dataIndex, setDataIndex] = useState(0);
    const [spentOn, setSpentOn] = useState('');

    const fillChartData = () => {
        let dataForChart = []

        myState.data.forEach((data) => {
            if(myState.property === 'time'){
                if(Object.keys(timeSpentList)[dataIndex] === data['timeSpentOn']){
                    dataForChart.push({
                        name: data['updatedOn'],
                        Hours: (data['time']/60).toFixed(2)
                    })
                }
            }
            else{
                if(Object.keys(moneySpentList)[dataIndex] === data['amountSpentOn']){
                    dataForChart.push({
                        name: data['updatedOn'],
                        Amount: data['amount']
                    })
                }
            }
        })
        dataForChart.reverse();
        setChartData(dataForChart);
    }

    const updateIndex = (inc) => {
        let newIndex = (dataIndex + inc + 8) % 8;
        setDataIndex(newIndex);
        fillChartData();

        if(myState.property === 'time'){
            let key = Object.keys(timeSpentList)[dataIndex];
            setSpentOn(timeSpentList[key]);
        } else{
            let key = Object.keys(moneySpentList)[dataIndex];
            setSpentOn(moneySpentList[key]);
        }
    }

    useEffect(() => {
        updateIndex(0);
        fillChartData();
    },[myState.data]);

    return (
        <div className='chart '>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    width={500}
                    height={300}
                    data={chartData}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 0,
                        bottom: 5,
                    }}
                    >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name"/>
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey={myState.property === 'time'? 'Hours': 'Amount'} stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
            <div className='chart-footer'>
                <button onClick={() => updateIndex(1)}><ChevronLeftIcon sx={{fontSize: 45}}/></button>
                <p>{spentOn}</p>
                <button onClick={() => updateIndex(-1)}><ChevronRightIcon sx={{fontSize: 45}}/></button>
            </div>
        </div>
    )
  }

export default Chart;