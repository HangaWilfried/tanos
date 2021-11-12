<template>
  <Header>
    <template #default>
      <header>
        <nav>
          <h1>{{nextYear}} BIRTHDAYS APP</h1>
        </nav>
        <div>
          {{countBirthdays}} birthdays
        </div>
      </header>
    </template>
  </Header>

  <main>
    <Form @submit="addNewBirthday"/>
  </main>

  <footer>
    <Birth v-for="(birthday, index) in birthdays" :key="index">
      <template #default>
        <div>
          <p>{{birthday.fullName}}</p>
          <p>next birthday {{birthday.day}} {{birthday.dayOfMonth}} {{birthday.month}} {{birthday.year}}</p>
          <p>less than {{birthday.remaining}} days</p>
          <p @click="deleteBirthday">x</p>
        </div>
      </template>
    </Birth>
  </footer>
</template>

<script lang="ts">
  import Header from './components/Header.vue'
  import Form from './components/Form.vue'
  import Birth from './components/Birth.vue'

  import {Info} from './interface/User'
  import {defineComponent, reactive, ref, computed} from 'vue'
  export default defineComponent({
    name: 'App',
    components: {Header, Form, Birth},
    setup(){
      let hasBeenAdded = ref<boolean>(false)
      const birthdays = ref<Info[]>([]);
      const addNewBirthday = ({fullName, day, month, dayOfMonth, year, remaining}:Info):void => {
        console.log(birthdays.value)
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

      return{
        hasBeenAdded,  birthdays, countBirthdays, nextYear,
        addNewBirthday, deleteBirthday
      }
    }
  })
</script>
