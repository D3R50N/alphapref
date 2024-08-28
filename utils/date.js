function getDateInfo(timestamp) {
    const months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
    const days = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
    const date = new Date(timestamp);
    const day = days[date.getDay()];
    const month = months[date.getMonth()];
    const dayNum = date.getDate();
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    return {
        day: day,
        month,
        year,
        dayNum: dayNum.toString().padStart(2, "0"),
        monthNum: (date.getMonth() + 1).toString().padStart(2, "0"),
        hours: hours.toString().padStart(2, "0"),
        minutes: minutes.toString().padStart(2, "0"),
        seconds: seconds.toString().padStart(2, "0")
    };
}

function strDate(timestamp, withDay = false, withTime = false) {
    const date = getDateInfo(timestamp);
    // m${date.seconds}
    return `${withDay ? date.day + " " : ""}${date.dayNum} ${date.month} ${date.year}${withTime ? ` à ${date.hours}h${date.minutes}` : ""}`;
}

function dateFromStamp(timestamp) {
    const date = getDateInfo(timestamp);
    return `${date.dayNum}/${date.monthNum}/${date.year}`;
}

module.exports = { getDateInfo, strDate, dateFromStamp };