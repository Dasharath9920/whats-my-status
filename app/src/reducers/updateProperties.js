import actionTypes from "./actionTypes";

const initializer = {
    property: 'time',
    analyticMode: true,
    analyticType: 'data',
    timeFilter: 'Today'
};

const updateProperties = (state=initializer, action) => {
    switch(action.type){
        case actionTypes.UPDATE_ANALYTIC_MODE: {
            return {...state, analyticMode: action.analyticMode};
        }

        case actionTypes.UPDATE_PROPERTY: {
            return {...state, property: action.property};
        }

        case actionTypes.UPDATE_ANALYTIC_TYPE: {
            return {...state, analyticType: action.analyticType};
        }

        case actionTypes.UPDATE_TIME_FILTERS: {
            return {...state, timeFilter: action.timeFilter};
        }

        default: 
            return state;
    }
}

export default updateProperties;