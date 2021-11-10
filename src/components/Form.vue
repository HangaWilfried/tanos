<template>
  <div>
    <span>first name</span>
    <input type="text" v-model="user.firstName">
  </div>
  <div>
    <span>last name</span>
    <input type="text" v-model="user.lastName">
  </div>
  <div>
    <span>date of birth</span>
    <input type="date" v-model="user.dateOfBirth">
  </div>
  <div>
    <button @click="submit">Submit</button>
  </div>
</template>

<script lang="ts">
import {reactive, defineComponent} from 'vue'
import {Info, User} from '../interface/User'

export default defineComponent({
  name: "Form",
  emits: ['submit'],
  setup: function (_, {emit}) {
    const daysOfWeek:string[] = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
    const months:string[] = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sept', 'oct', 'nov', 'dec']
    const user = reactive<User>({
      lastName: '',
      firstName: '',
      dateOfBirth: ''
    })
    const getRemaining = (): number => {
      const CONVERT_TO_DAYS = 24 * 3600000
      const {month, date} = manageDate(user.dateOfBirth)
      const time = new Date()
      const now = new Date(`${time.getFullYear()},${time.getMonth()},${time.getDate()}`)
      const nextBirth = new Date(`${time.getFullYear() + 1},${month},${date}`)
      return Math.floor((nextBirth.valueOf() - now.valueOf()) / CONVERT_TO_DAYS)
    }
    const newBirthday = (): Info => {
      const {month, day, date} = manageDate(user.dateOfBirth)
      return {
        fullName: `${user.lastName} ${user.firstName}`,
        day: daysOfWeek[day],
        month: months[month],
        dayOfMonth: date,
        year: new Date().getFullYear() + 1,
        remaining: getRemaining()
      }
    }
    const submit = () => {
      emit('submit', newBirthday())
    }

    const manageDate = (guessDate: string) => {
      const time = new Date(guessDate)
      const month = time.getMonth()
      const day = time.getDay()
      const date = time.getDate()
      return {
        month, day, date
      }
    }
    return {
      user,
      submit
    }
  }
})
</script>
