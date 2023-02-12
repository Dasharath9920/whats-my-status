import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getCategorizedData } from './helper';

function Chart() {

    const myState = useSelector(state => state.updateProperties);
    const [chartData, setChartData] = useState([]);

    const fillChartData = () => {
        let data = getCategorizedData(myState.data, myState.property);
        let dataForChart = []

        Object.keys(data).forEach((key) => {
            if(myState.property === 'time'){
                dataForChart.push({
                    name: key,
                    Hours: myState.property === 'time'? data[key]/60: data[key]
                })
            }
            else{
                dataForChart.push({
                    name: key,
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
    )
  }

export default Chart;