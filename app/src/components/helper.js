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
        fineTuneTime += `${years} Years `;
    if(months)
        fineTuneTime += `${months} Months `;
    if(days)
        fineTuneTime += `${days} Days `;
    if(hours)
        fineTuneTime += `${hours} Hours `;
    if(minutes && !years)
        fineTuneTime += `${minutes} Minutes`;
    if(!fineTuneTime.length)
        fineTuneTime = "No time spent"
    
    return fineTuneTime;
}