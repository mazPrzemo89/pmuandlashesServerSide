
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

    for (let i=0;i<new Date(year,month,0).getDate();i++) {
        calendar.push({
            day: returnDate(month,i+1,year),
            dayOfWeek:returnDay(month,i+1,year),
            value: i+1,
            date: `${month}_${i}_${year}`,
            disabled: false,
            holiday: false
        })
    }

    return calendar
}