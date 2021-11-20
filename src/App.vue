<template>
  <main class="flex flex-col content-center text-yellow-600 gap-48">
    <div class="bg-gray-700 px-28 py-32 flex flex-col items-stretch gap-9">
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

    <div>
      <Form @submit="addNewBirthday"/>
    </div>

    <div class="flex flex-col gap-y-1">
      <p class="grid grid-cols-6 gap-x-10 border-gray-700 bg-gray-700 pl-2 pr-5 py-2 text-center items-center">
        <span>Name</span>
        <span>Date of Birth</span>
        <span>Date of Birthday</span>
        <span>Remaining Days To Birthday</span>
        <span>Added</span>
        <span>Delete</span>
      </p>
      <Birth v-for="(birthday, index) in birthdays" :key="index">
        <template #default>
          <p class="grid grid-cols-6 gap-x-10 border-gray-700 bg-gray-700 pl-2 pr-4 py-2 text-center items-center">
            <span>{{birthday.fullName}}</span>
            <span>
              {{
                `
                  ${format(birthday.dateOfBirth).day} ${format(birthday.dateOfBirth).date}
                  ${format(birthday.dateOfBirth).month} ${format(birthday.dateOfBirth).year}
                `
              }}
            </span>
            <span>
              {{
                `
                  ${aboutBirthday(birthday.dateOfBirth).day} ${aboutBirthday(birthday.dateOfBirth).date}
                  ${aboutBirthday(birthday.dateOfBirth).month} ${aboutBirthday(birthday.dateOfBirth).year}
            `
              }}
            </span>
            <span>{{getRemaining(aboutBirthday(birthday.dateOfBirth))}}</span>
            <span>{{`${getTime().date} ${getTime().month} ${getTime().year}`}} At {{`${getHours().hour}:${getHours().minute}`}}</span>
            <span @click="deleteBirthday">x</span>
          </p>
        </template>
      </Birth>
    </div>
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
