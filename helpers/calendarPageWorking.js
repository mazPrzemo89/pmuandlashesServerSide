

const returnDate = (month,day_iterator,year) => {
    const dateString = month + ' ' + day_iterator + ' ' + year
    const todaysDate = new Date(dateString)
    return todaysDate.getDate()
}

const returnDay = (month,day_iterator,year) => {
    const dateString = month + ' ' + day_iterator + ' ' + year
    const todaysDate = new Date(dateString)
    return todaysDate.getDay()
}


exports.fillCalendar = (month, year) => {
    const calendar = []

    for (let i=1;i<33;i++) {
        calendar.push({
            day: returnDate(month,i,year),
            dayOfWeek:returnDay(month,i,year),
            value: i,
            date: `${month}_${i}_${year}`,
            disabled: false
        })
    }
   
    //if month is 30 days   
    if (calendar[30].day === 1) {
        calendar.pop([30])
    }
    
    //if month is 29 days   
    if (calendar[29].day === 1) {
        calendar.pop([28])
        calendar.pop([29])
    }

     //if month is 28 days
    if(calendar[28].day === 1) {
        calendar.pop([28])
        calendar.pop([29])
        calendar.pop([30])
    }

    calendar.pop([0])
    return calendar
}