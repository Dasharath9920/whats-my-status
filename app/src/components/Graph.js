import React, { PureComponent, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Chart from './Chart';

function Graph() {
  const myState = useSelector(state => state.updateProperties);

  return (
    <div className='graph-container'>
        <Chart />
    </div>
  )
}

export default Graph;