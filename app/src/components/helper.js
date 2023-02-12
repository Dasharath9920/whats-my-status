import { moneySpentList,timeFilters, timeSpentList } from "../assets/data";

export const fineTuneTime = (minutes) => {
    let years = Math.floor(minutes/525600);
    minutes %= 525600;
    let months = Math.floor(minutes/43800);
    minutes %= 43800;
    let days = Math.floor(minutes/1440);
    minutes %= 1440;
    let hours = Math.floor(minutes/60);
    minutes %= 60;
    minutes = Math.floor(minutes);

    let fineTuneTime = "";
    if(years)
        fineTuneTime += `${years} Year` + (years > 1? 's ': ' ');
    if(months)
        fineTuneTime += `${months} Month` + months > 1? 's ': ' ';
    if(days)
        fineTuneTime += `${days} Day` + days > 1? 's ': ' ';
    if(hours)
        fineTuneTime += `${hours} Hour` + (hours > 1? 's ': ' ');
    if(minutes && !years)
        fineTuneTime += `${minutes} Minute` + (minutes > 1? 's ': ' ');
    if(!fineTuneTime.length)
        fineTuneTime = "No time spent"
    
    return fineTuneTime;
}

export const getColorKeyForAmount = (amount) => {
    let colorKey = 0;
    if(amount <= 100)
        colorKey = 0;
    else if(amount <= 500)
        colorKey = 1;
    else if(amount <= 1000)
        colorKey = 2;
    else if(amount <= 5000)
        colorKey = 3;
    else if(amount <= 10000)
        colorKey = 4;
    else if(amount <= 20000)
        colorKey = 5;
    else if(amount <= 50000)
        colorKey = 6;
    else if(amount <= 100000)
        colorKey = 7;
    else
        colorKey = 8;
    return colorKey;
}

export const getColorKeyForTime = (minutes) => {
    let colorKey = 0;
    if(minutes <= 5)
        colorKey = 0;
    else if(minutes <= 10)
        colorKey = 1;
    else if(minutes <= 20)
        colorKey = 2;
    else if(minutes <= 30)
        colorKey = 3;
    else if(minutes <= 45)
        colorKey = 4;
    else if(minutes <= 60)
        colorKey = 5;
    else if(minutes <= 120)
        colorKey = 6;
    else if(minutes <= 240)
        colorKey = 7;
    else
        colorKey = 8;
    return colorKey;
}

export const getNumberOfDaysFromFirstEntry = (entries) => {
    let numberOfDays = 0;
    let today = new Date();
    entries.forEach((entry) => {
        let date = new Date(entry['updatedOn']);
        let diff = Math.ceil((today - date) / (60 * 60 * 24 * 1000));
        numberOfDays = Math.max(numberOfDays,diff);
    })
    return numberOfDays;
}

export const getNumberOfDaysFromTimeFilter = (timeFilter, entries) => {
    let days = 1;
    let maxDays = getNumberOfDaysFromFirstEntry(entries);
    switch(timeFilter){
        case timeFilters.TODAY:
            days = 1;
            break;
        case timeFilters.LAST_WEEK:
            days = 7;
            break;
        case timeFilters.LAST_MONTH: 
            days = 30;
            break;
        case timeFilters.THREE_MONTHS:
            days = 90;
            break;
        case timeFilters.SIX_MONTHS:
            days = 180;
            break;
        case timeFilters.LAST_YEAR:
            days = 365;
            break;
        default:
            days = maxDays;
    }

    return Math.min(days, maxDays);
}

export const getSafeZoneForTimeSpent = (type,timeFilter, entries) => {
    let safeZone = 100;
    let totalDays = Math.max(1,getNumberOfDaysFromTimeFilter(timeFilter, entries));
    switch(type){
        case timeSpentList.IMPROVING_SKILLS:
            safeZone = 120;
            break;
        case timeSpentList.OFFICE_WORK:
            safeZone = 240;
            break;
        case timeSpentList.OUTSIDE_ON_WORK:
            safeZone = 180;
            break;
        case timeSpentList.ROAMING_OUTSIDE:
            safeZone = 120;
            break;
        case timeSpentList.SLEEP:
            safeZone = 480;
            break;
        case timeSpentList.SPORTS:
            safeZone = 120;
            break;
        case timeSpentList.WASTED_TIME:
            safeZone = 60;
            break;
        default:
            safeZone = 30;
    }

    return safeZone * totalDays;
}

export const getSafeZoneForAmountSpent = (type, timeFilter, entries) => {
    let safeZone = 500;
    let totalDays = Math.max(1,getNumberOfDaysFromTimeFilter(timeFilter, entries));

    switch(type){
        case moneySpentList.DEBT:
            safeZone = 1300;
            break;
        case moneySpentList.ENTERTAINMENT:
        case moneySpentList.HOUSEHOLD_EXPENSES:
        case moneySpentList.OUTSIDE_FOOD:
        case moneySpentList.PERSONAL:
        case moneySpentList.TRAVEL_EXPENSES:
            safeZone = 100;
            break;
        case moneySpentList.ONLINE_SHOPPING:
            safeZone = 60;
            break;
        default:
            safeZone = 300;
    }

    return safeZone * totalDays * 2;
}