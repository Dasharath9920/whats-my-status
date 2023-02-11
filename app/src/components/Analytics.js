import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import DataList from './DataList';
import { analyticTypes } from '../assets/data';
import Graph from './Graph';
import Report from './Report';

function Analytics() {

  const myState = useSelector(state => state.updateProperties);
  const [analyticType, setAnalyticType] = useState(myState.analyticType);

  const setAnalytics = (analyticType) => {
      setAnalyticType(analyticType);
      analyticTypes.forEach(type => document.getElementById(type).style.borderBottomColor = 'transparent');
      document.getElementById(analyticType).style.borderBottomColor = 'orange';
  }

  useEffect(() => {
    setAnalytics(myState.analyticType);
  },[])

  return (
    <div className='analytics'>
        <div className="control-btns analytic-btns">
          <button id='data' onClick={() => setAnalytics('data')}>DATA</button>
          <button id='graph' onClick={() => setAnalytics('graph')}>GRAPH</button>
          <button id='report' onClick={() => setAnalytics('report')}>REPORT</button>
        </div>

        { analyticType === 'data' &&
          <DataList />
        }

        { analyticType === 'graph' && 
          <Graph />
        }

        { analyticType === 'report' &&
          <Report />
        }
    </div>
  )
}

export default Analytics;