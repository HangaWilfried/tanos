import {format, aboutBirthday, getHours, getRemaining, getTime, formatNumber} from '@/utils/date'

const daysOfWeek:string[] = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
const months:string[] = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sept', 'oct', 'nov', 'dec']

test('details the date of birth', () => {
  expect(format('2000-05-27')).toEqual({ month: 'may', year: 2000, date: 27, day: 'sat' })
})

test('details about the birthday date', () => {
  expect(aboutBirthday('2000-05-27')).toEqual({ month: 'may', year: 2022, date: 27, day: 'fri' })
})

test('check if a number is less than 10 will be format in *0number*', () => {
  expect(formatNumber(1)).toMatch('01')
})

test('check the correct current Time', () => {
  jest.spyOn(Date.prototype, 'getHours').mockImplementation(() => 13)
  jest.spyOn(Date.prototype, 'getMinutes').mockImplementation(() => 12)
  expect(getHours()).toEqual({ hour: 13, minute: 12 })
})

test('get the remaining days to one birthday', () => {
  expect(getRemaining({ month: 'jan', year: 2022, date: 1, day: 'sat' })).toBe(46)
})

test('check the correct current date', ()=>{
    jest.spyOn(Date.prototype, 'getDate').mockImplementation(() => 25)
    jest.spyOn(Date.prototype, 'getMonth').mockImplementation(() => 11)
    jest.spyOn(Date.prototype, 'getFullYear').mockImplementation(() => 2021)
    expect(getTime()).toEqual({ date: 25, month: 'dec', year: 2021 })
})
