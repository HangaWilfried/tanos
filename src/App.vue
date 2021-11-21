<template>
  <main class="flex flex-col content-center text-green-400 gap-0">
    <div class="bg-gray-700 py-32 flex flex-col items-center gap-9">
      <Header>
        <template #default>
          <h1 class="flex flex-row gap-2 text-3xl font-bold">
            <span>{{nextYear}}</span>
            <span>BIRTHDAYS APP</span>
          </h1>
          <h4 class="flex flex-row gap-2 text-5xl font-thin italic">
            <span>{{countBirthdays}}</span>
            <span>added</span>
          </h4>
        </template>
      </Header>
    </div>

    <div class="bg-green-100 p-10">
      <Form @submit="addNewBirthday"/>
    </div>
    <div class="largeScreen">
      <p class="largeScreenPara">
        <span class="largeScreenSpan">Name</span>
        <span class="largeScreenSpan">Date Of Birth</span>
        <span class="largeScreenSpan">Date Of Birthday</span>
        <span class="largeScreenSpan">Remaining Days To Birthday</span>
        <span class="largeScreenSpan">Added</span>
        <span class="largeScreenSpan">Delete</span>
      </p>
    </div>
    <Birth v-for="(birthday, index) in birthdays" :key="index">
      <template #default>
        <div class="largeScreen">
          <p class="largeScreenPara">
            <span class="largeScreenSpan">{{birthday.fullName}}</span>
            <span class="largeScreenSpan">{{`${format(birthday.dateOfBirth).day} ${format(birthday.dateOfBirth).date} ${format(birthday.dateOfBirth).month} ${format(birthday.dateOfBirth).year}`}}</span>
            <span class="largeScreenSpan">{{`${aboutBirthday(birthday.dateOfBirth).day} ${aboutBirthday(birthday.dateOfBirth).date} ${aboutBirthday(birthday.dateOfBirth).month} ${aboutBirthday(birthday.dateOfBirth).year}`}}</span>
            <span class="largeScreenSpan">{{getRemaining(aboutBirthday(birthday.dateOfBirth))}}</span>
            <span class="largeScreenSpan">{{`${getTime().date} ${getTime().month} ${getTime().year}`}} At {{`${getHours().hour}:${getHours().minute}`}}</span>
            <span  class="largeScreenSpan" @click="deleteBirthday">x</span>
          </p>
        </div>

        <div class="smallScreen">
          <div class="smallScreenDiv">
            <p class="smallScreenPara">
              <span class="text-gray-700">Name</span>
              <span class="font-bold">{{birthday.fullName}}</span>
            </p>
            <p class="smallScreenPara">
              <span class="text-gray-700">Date of birth</span>
              <span class="font-bold">{{`${format(birthday.dateOfBirth).day} ${format(birthday.dateOfBirth).date} ${format(birthday.dateOfBirth).month} ${format(birthday.dateOfBirth).year}`}}</span>
            </p>
            <p class="smallScreenPara">
              <span class="text-gray-700">Date of birthday</span>
              <span class="font-bold">{{`${aboutBirthday(birthday.dateOfBirth).day} ${aboutBirthday(birthday.dateOfBirth).date} ${aboutBirthday(birthday.dateOfBirth).month} ${aboutBirthday(birthday.dateOfBirth).year}`}}</span>
            </p>
            <p class="smallScreenPara">
              <span class="text-gray-700">Remaining days to birthday</span>
              <span class="font-bold">{{getRemaining(aboutBirthday(birthday.dateOfBirth))}}</span>
            </p>
            <p class="smallScreenPara">
              <span class="text-gray-700">Added</span>
              <span class="font-bold">{{`${getTime().date} ${getTime().month} ${getTime().year}`}} At {{`${getHours().hour}:${getHours().minute}`}}</span>
            </p>
            <p class="smallScreenPara">
              <span class="text-gray-700">Delete</span>
              <span class="text-green-500 font-bold text-2xl" @click="deleteBirthday">x</span>
            </p>
          </div>
        </div>
      </template>
    </Birth>
  </main>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onBeforeMount } from 'vue'

import Header from './components/Header.vue'
import Form from './components/Form.vue'
import Birth from './components/Birth.vue'

import { User } from './interface/User'

import { format, aboutBirthday, getRemaining, getTime, getHours } from './utils/date'
import { setSave } from './utils/storage'

export default defineComponent({

  name: 'App',

  components: { Header, Form, Birth },

  setup () {
    const hasBeenAdded = ref<boolean>(false)
    const birthdays = ref<User[]>([])

    const addNewBirthday = ({ fullName, dateOfBirth }: User): void => {
      hasBeenAdded.value = birthdays.value.some((item) => item.fullName === fullName)
      if (fullName === '' || dateOfBirth === '') {
        alert('fill in the empty fields')
      } else if (hasBeenAdded.value) {
        alert('this already existed please make sure you are try registered the good birthday')
      } else {
        birthdays.value.push({ fullName, dateOfBirth })
        setSave('value', birthdays.value)
      }
    }

    const deleteBirthday = (index: number) => {
      birthdays.value.splice(index, 1)
      setSave('value', birthdays.value)
    }

    const countBirthdays = computed(():number => birthdays.value.length)

    const nextYear = computed(():number => new Date().getFullYear() + 1)

    onBeforeMount(() => {
      if (localStorage.getItem('value')) {
        birthdays.value = JSON.parse(localStorage.getItem('value') || '[]')
      } else {
        localStorage.setItem('value', '[]')
      }
    })

    return {
      birthdays,
      countBirthdays,
      nextYear,
      addNewBirthday,
      deleteBirthday,
      format,
      aboutBirthday,
      getRemaining,
      getHours,
      getTime
    }
  }
})
</script>
