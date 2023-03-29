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
  }

  useEffect(() => {
    setAnalytics(myState.analyticType);
  },[])

  return (
    <div className='analytics'>
        <div className="control-btns analytic-btns">
          <button onClick={() => setAnalytics('data')}>DATA</button>
          <button onClick={() => setAnalytics('graph')}>GRAPH</button>
          <button onClick={() => setAnalytics('report')}>REPORT</button>
        </div>
        <div className={`analytics-border-bottom analytics-border-bottom-slider ` + (analyticType === 'data'? 'first-option': analyticType === 'graph'? 'second-option': 'third-option')}></div>

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