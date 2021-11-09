<template>
 <header>
   <nav>
     <h1>{{nextYear}} BIRTHDAYS APP</h1>
   </nav>
   <div>
     {{countBirthdays}} birthdays
   </div>
 </header>
  <main>
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
      <button @click="addNewBirthday">Submit</button>
    </div>
  </main>

  <footer>
    <div v-for="(birthday, index) in birthdays" :key="index">
      <p>{{birthday.fullName}}</p>
      <p>next birthday {{birthday.day}} {{birthday.dayOfMonth}} {{birthday.month}} {{birthday.year}}</p>
      <p>less than {{birthday.remaining}} days</p>
      <p @click="deleteBirthday">x</p>
    </div>
  </footer>
</template>

<script lang="ts">
  import {User, Info} from './interface/User'
  import {defineComponent, reactive, ref, computed} from 'vue'
  export default defineComponent({
    name: 'App',
    setup(){
      const daysOfWeek = ref<string[]>(['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'])
      const months = ref<string[]>(['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sept', 'oct', 'nov', 'dec'])
      const user = reactive<User>({
        lastName: 'Mendy',
        firstName: 'Edouard',
        dateOfBirth: '27-05-2000'
      })
      let hasBeenAdded = ref<boolean>(false)
      const birthdays = ref<Info[]>([]);

      const getRemaining = ():number => {
        const CONVERT_TO_DAYS = 24 * 3600000
        const {month, date} = manageDate(user.dateOfBirth)
        const time = new Date()
        const now =  new Date(`${time.getFullYear()},${time.getMonth()},${time.getDate()}`)
        const nextBirth = new Date(`${time.getFullYear()+1},${month},${date}`)
        return Math.floor((nextBirth - now) / CONVERT_TO_DAYS)
      }

      const newBirthday = ():Info => {
        const {month, day, date} = manageDate(user.dateOfBirth)
        return {
          fullName : `${user.lastName} ${user.firstName}`,
          day: daysOfWeek.value[day],
          month: months.value[month],
          dayOfMonth: date,
          year: new Date().getFullYear()+1,
          remaining: getRemaining()
        }
      }
      const addNewBirthday = ():void => {
        const {fullName, day, month, dayOfMonth, year, remaining} = newBirthday();
        hasBeenAdded.value = birthdays.value.some((item) => item.fullName === fullName)
        if(hasBeenAdded.value){
          alert('this already existed please make sure you are try registered the good birthday')
        }
        else{
          birthdays.value.push({fullName, day, month, dayOfMonth, year, remaining})
        }
      }
      const deleteBirthday = (index: number) => birthdays.value.splice(index, 1)
      const countBirthdays = computed(() => birthdays.value.length)
      const nextYear = computed(() => new Date().getFullYear()+1)

      const manageDate = (guessDate: string) => {
        const time = new Date(guessDate)
        const month = time.getMonth()
        const day = time.getDay()
        const date = time.getDate()
        return {
          month, day, date
        }
      }
      return{
        hasBeenAdded, user, countBirthdays, nextYear, birthdays, months, daysOfWeek,
        addNewBirthday, deleteBirthday, getRemaining
      }
    }
  })
</script>
