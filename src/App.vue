<template>
  <div class="sm:flex sm:flex-col sm:gap-0 sm:m-0 sm:content-center
  md:grid md:grid-cols-2 md:items-stretch md:gap-2 md:m-2
 lg:grid lg:grid-cols-2 lg:items-stretch lg:gap-2 lg:m-2
 2xl:grid 2xl:grid-cols-2 2xl:items-stretch 2xl:gap-2 2xl:m-2">
    <Header>
      <template #default>
        <header class="md:col-start-1 md:row-start-1 md:self-stretch
        lg:col-start-1 lg:row-start-1 lg:self-stretch
        2xl:col-start-1 2xl:row-start-1 2xl:self-stretch
        border border-black bg-gray-900 text-white text-sm p-20">
          <nav>
            <h1 class="text-white text-5xl font-bold italic">{{nextYear}} BIRTHDAYS APP</h1>
          </nav>
          <div class="text-white text-7xl my-32 font-thin">
            {{countBirthdays}} added
          </div>
        </header>
      </template>
    </Header>

    <main class="sm:p-5 sm:flex sm:flex-col bg-gray-100
 md:items-center md:px-64 md:py-10 md:col-start-2 md:col-end-3 md:row-start-1
 lg:items-center lg:px-64 lg:py-10 lg:col-start-2 lg:col-end-3 lg:row-start-1
 2xl:items-center 2xl:px-64 2xl:py-10 2xl:col-start-2 2xl:col-end-3 2xl:row-start-1">
      <Form @submit="addNewBirthday"/>
    </main>
  </div>
  <div class="sm:flex sm:flex-col sm:content-center lg:mx-2 lg:mt-20
xl:mx-2 lg:mt-20
md:mx-2 lg:mt-20">
    <table class="border border-collapse bg-white lg:w-full
sm:overflow-x-scroll
xl:w-full
md:w-full">
      <tr>
        <th class="title">Name</th>
        <th class="title">Date of Birth</th>
        <th class="title">Date of Birthday</th>
        <th class="title">Remaining Days To Birthday</th>
        <th class="title">Added</th>
        <th class="title">Delete</th>
      </tr>
      <Birth v-for="(birthday, index) in birthdays" :key="index">
        <template #default>
          <tr>
            <td class="cell text-yellow-700">{{birthday.fullName}}</td>
            <td class="cell text-blue-500">
              {{
                `
                  ${format(birthday.dateOfBirth).day} ${format(birthday.dateOfBirth).date}
                  ${format(birthday.dateOfBirth).month} ${format(birthday.dateOfBirth).year}
                `
              }}
            </td>
            <td class="cell text-green-800">
              {{
                `
                  ${aboutBirthday(birthday.dateOfBirth).day} ${aboutBirthday(birthday.dateOfBirth).date}
                  ${aboutBirthday(birthday.dateOfBirth).month} ${aboutBirthday(birthday.dateOfBirth).year}
                `
              }}
            </td>
            <td class="cell text-purple-600">{{getRemaining(aboutBirthday(birthday.dateOfBirth))}}</td>
            <td class="cell text-gray-900">{{`${getTime().date} ${getTime().month} ${getTime().year}`}} At {{`${getHours().hour}:${getHours().minute}`}}</td>
            <td class="cell"><div @click="deleteBirthday" class="text-white text-center rounded-full sm:ml-5 sm:bg-red-500 sm:w-6 sm:h-6 lg:text-2xs lg:ml-32 lg:bg-red-500 lg:w-7 lg:h-7
md:text-2xs md:m-auto md:bg-red-500 md:w-7 md:h-7
2xl:text-2xs 2xl:m-auto 2xl:bg-red-500 2xl:w-7 2xl:h-7">x</div></td>
          </tr>
        </template>
      </Birth>
    </table>
  </div>
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
