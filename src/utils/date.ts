import { Birth, Info } from '../interface/User'

const daysOfWeek:string[] = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
const months:string[] = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sept', 'oct', 'nov', 'dec']

export const aboutBirthday = (date:string):Info => {
  const guessTime = new Date(date)
  const birthdayDate = new Date(`${new Date().getFullYear() + 1} ${guessTime.getMonth() + 1} ${guessTime.getDate()}`)
  return {
    year: birthdayDate.getFullYear(),
    month: months[birthdayDate.getMonth()],
    date: birthdayDate.getDate(),
    day: daysOfWeek[birthdayDate.getDay()]
  }
}
export const format = (guessDate:string):Info => {
  const guessTime = new Date(guessDate)
  return {
    day: daysOfWeek[guessTime.getDay().valueOf()],
    date: guessTime.getDate(),
    month: months[guessTime.getMonth()],
    year: guessTime.getFullYear()
  }
}
export const getRemaining = (birthdayInfo:Info):number => {
  const DAYS_CONVERSION = 24 * 3600000
  const { year, month, date } = birthdayInfo
  const time = new Date()
  const now = new Date(`${time.getFullYear()},${time.getMonth() + 1},${time.getDate()}`)
  const birthday = new Date(`${year},${month},${date}`)

  return (birthday.valueOf() - now.valueOf()) / DAYS_CONVERSION
}

export const formatNumber = (guessNumber:number):number|string => guessNumber < 10 ? `0${guessNumber}` : guessNumber


export const getTime = ():Birth => {
  const time = new Date()
  return {
    date: formatNumber(time.getDate()),
    month: months[time.getMonth()],
    year: time.getFullYear()
  }
}

export const getHours = ():Object => {
  const time = new Date()
  return {
    hour: formatNumber(time.getHours()),
    minute: formatNumber(time.getMinutes())
  }
}
