<template>
  <div class="grid grid-cols-2 grid-row-2 gap-6 my-10 mx-20">
    <Header>
      <template #default>
        <header class="text-red-600 bg-blue-100 py-5 px-20 mb-20 rounded-12 row-start-2 row-end-4">
          <nav>
            <h1>{{nextYear}} BIRTHDAYS APP</h1>
          </nav>
          <div>
            {{countBirthdays}} birthdays
          </div>
        </header>
      </template>
    </Header>

    <main class="row-span-1 cols-span-1">
      <Form @submit="addNewBirthday"/>
    </main>

    <table class="row-start-1 row-end-4 cols-span-1">
      <tr>
        <th>Name</th>
        <th>Date of Birth</th>
        <th>Date of Birthday</th>
        <th>Remaining Days To Birthday</th>
        <th>Adding</th>
        <th>Delete</th>
      </tr>
      <Birth v-for="(birthday, index) in birthdays" :key="index">
        <template #default>
          <tr>
            <td class="text-blue-600">{{birthday.fullName}}</td>
            <td class="text-green-400">
              {{
                `
                  ${format(birthday.dateOfBirth).day} ${format(birthday.dateOfBirth).date}
                  ${format(birthday.dateOfBirth).month} ${format(birthday.dateOfBirth).year}
                `
              }}
            </td>
            <td class="text-gray-400">
              {{
                `
                  ${aboutBirthday(birthday.dateOfBirth).day} ${aboutBirthday(birthday.dateOfBirth).date}
                  ${aboutBirthday(birthday.dateOfBirth).month} ${aboutBirthday(birthday.dateOfBirth).year}
                `
              }}
            </td>
            <td class="text-yellow-800">{{getRemaining(aboutBirthday(birthday.dateOfBirth))}}</td>
            <td class="text-gray-500">{{`${getTime().date}${getTime().month}${getTime().year}`}} At {{`${getHours().hour}:${getHours().minute}`}}</td>
            <td><span @click="deleteBirthday" class="rounded-full h-8 w-8 bg-red-400"></span></td>
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
