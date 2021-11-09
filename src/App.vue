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
      <p>next birthday {{nextBirthday}}</p>
      <p>less than {{remaining}} days</p>
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
      const birthdays = ref<Info[]>([])

      const newBirthday = ():Info => {
        const {month, day, date} = manageDate(user.dateOfBirth)
        return {
          fullName : `${user.lastName} ${user.firstName}`,
          day: daysOfWeek.value[day],
          month: months.value[month],
          dayOfMonth: date
        }
      }
      const addNewBirthday = (fn: ):void => {
        const obj= newBirthday();
        hasBeenAdded.value = birthdays.value.some((item) => item.fullName === obj.fullName)
        if(hasBeenAdded){
          alert('this already existed please make sure you are try registered the good birthday')
        }
        else{
          birthdays.value.push(obj)
        }
        console.log(birthdays.value)
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
        addNewBirthday, deleteBirthday
      }
    }
  })
</script>
