<template>
  <div class="grid grid-cols-2 items-stretch gap-2 m-2">
    <Header>
      <template #default>
        <header class="col-start-1 row-start-1 border border-black bg-gray-900 text-white text-sm p-20 self-stretch">
          <nav>
            <h1 class="text-white text-5xl font-bold italic">{{nextYear}} BIRTHDAYS APP</h1>
          </nav>
          <div class="text-white text-7xl my-32 font-thin">
            {{countBirthdays}} added
          </div>
        </header>
      </template>
    </Header>

    <main class="col-start-2 col-end-3 row-start-1 flex flex-col gap-2 items-center bg-gray-100 px-64 py-10">
      <Form @submit="addNewBirthday"/>
    </main>
  </div>
  <div class="mx-2 mt-20">
    <table class="border border-collapse bg-white w-full">
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
            <td class="cell"><div @click="deleteBirthday" class="ml-32 bg-red-500 text-white text-2xs rounded-full w-7 h-7 text-center">x</div></td>
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
