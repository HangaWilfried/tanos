import {Info} from '../interface/User'

export const aboutBirthday = (date:string):Info => {
    const daysOfWeek:string[] = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
    const months:string[] = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sept', 'oct', 'nov', 'dec']
    const guessTime = new Date(date)

    const guessMonth = guessTime.getMonth()+1
    const guessDate = guessTime.getDate()

    const refereeTime = new Date()
    const birthdayDate = new Date(`${refereeTime.getFullYear()+1} ${guessMonth} ${guessDate}`)
    return {
        year: birthdayDate.getFullYear(),
        month: months[birthdayDate.getMonth()],
        date: birthdayDate.getDate(),
        day: daysOfWeek[birthdayDate.getDay()]
    }
}
export const format = (guessDate:string) => {
    const daysOfWeek:string[] = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
    const months:string[] = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sept', 'oct', 'nov', 'dec']
    const guessTime = new Date(guessDate)
    const date = guessTime.getDate()
    const month = months[guessTime.getMonth()]
    const year = guessTime.getFullYear()
    const day = daysOfWeek[guessTime.getDay().valueOf()]
    return {day, date, month, year}
}
export const getRemaining = (obj:Info) => {
    const DAYS_CONVERSION = 24 * 3600000
    const {year, month, date} = obj
    const time = new Date()
    const currentMonth = time.getMonth()+1
    const currentYear = time.getFullYear()
    const currentDate = time.getDate()
    const now = new Date(`${currentYear},${currentMonth},${currentDate}`)
    const birthday = new Date(`${year},${month},${date}`)

    return (birthday.valueOf() - now.valueOf())/DAYS_CONVERSION
}

const formatNumber = (guessNumber:number) => {
    return guessNumber < 10 ? `0${guessNumber}`: guessNumber
}

export const getTime = () => {
    const months:string[] = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sept', 'oct', 'nov', 'dec']
    const time = new Date()
    return{
        date: formatNumber(time.getDate()),
        month: months[time.getMonth()],
        year: time.getFullYear()
    }
}

export const getHours = () => {
    const time = new Date()
    return {
        hour: formatNumber(time.getHours()),
        minute: formatNumber(time.getMinutes())
    }
}
