import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { legendDataForAmount, legendDataForTime } from '../assets/data';
import { getCategorizedData } from './helper';

function Chart() {

    const myState = useSelector(state => state.updateProperties);
    const [chartData, setChartData] = useState([]);
    let spentOn = myState.property === 'time'? legendDataForTime: legendDataForAmount;;

    const fillChartData = () => {
        let data = getCategorizedData(myState.data, myState.property);
        let dataForChart = []

        Object.keys(data).forEach((key,index) => {
            if(myState.property === 'time'){
                dataForChart.push({
                    name: Object.keys(spentOn)[index],
                    Hours: myState.property === 'time'? data[key]/60: data[key]
                })
            }
            else{
                dataForChart.push({
                    name: Object.keys(spentOn)[index],
                    Amount: myState.property === 'time'? data[key]/60: data[key]
                })
            }
        })

        setChartData(dataForChart);
    }

    useEffect(() => {
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
                    <Legend />
                    <Line type="monotone" dataKey={myState.property === 'time'? 'Hours': 'Amount'} stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
            <div className='legend-container'>
                {
                    Object.keys(spentOn).map((key,index) => {
                        return <div className="legend-item">
                            <h4>{key} - &nbsp;</h4>
                            <p>{spentOn[key]}</p>
                        </div>
                    })
                }
            </div>
        </div>
    )
  }

export default Chart;