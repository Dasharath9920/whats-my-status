import actionTypes from "./actionTypes";

const initializer = {
    property: 'time',
    analyticMode: true,
    analyticType: 'data',
    timeFilter: 'All Time',
    currentData: {
        quantity: '',
        action: '',
        id: '',
        editMode: false
    },
    data: [],
    fetchData: true
};

const updateProperties = (state=initializer, action) => {
    switch(action.type){
        case actionTypes.UPDATE_ANALYTIC_MODE: {
            return {...state, analyticMode: action.analyticMode};
        }

        case actionTypes.UPDATE_PROPERTY: {
            return {...state, property: action.property};
        }

        case actionTypes.UPDATE_CURRENT_DATA: {
            return {...state, currentData: action.currentData};
        }

        case actionTypes.UPDATE_ANALYTIC_TYPE: {
            return {...state, analyticType: action.analyticType};
        }

        case actionTypes.UPDATE_TIME_FILTERS: {
            return {...state, timeFilter: action.timeFilter};
        }

        case actionTypes.UPDATE_DATA: {
            return {...state, data: action.data};
        }

        case actionTypes.FETCH_DATA: {
            return {...state, fetchData: action.fetchData};
        }

        default: 
            return state;
    }
}

export default updateProperties;