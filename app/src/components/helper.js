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