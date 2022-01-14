<template>
  <div class="w-full h-full top-0 left-0 absolute bg-zinc-600 flex flex-col items-center">
    <div class="bg-white w-3/4 h-full px-3 flex flex-col">
      <Header>
        <template #default>
          <header class="flex justify-between gap-x-10 mb-10 items-end shadow-2xl shadow-zinc-100 p-4">
            <nav>
              <h1 class="flex flex-col items-center">
                <span class="text-7xl font-medium font-sans">{{nextYear}}</span>
                <span class="font-extrabold text-lg">BIRTHDAYS APP</span>
              </h1>
            </nav>
            <div class="bg-zinc-500 rounded-md text-white font-bold font-sans text-sm px-4 py-2">
              {{countBirthdays}} birthdays
            </div>
          </header>
        </template>
      </Header>

      <main>
        <Form @submit="addNewBirthday"/>
      </main>

      <footer class="mt-10 mb-4">
        <Birth v-for="(birthday, index) in birthdays" :key="index">
          <template #default>
            <div class="font-medium shadow-2xl shadow-indigo-100 px-10 py-4 text-md capitalize flex flex-col items-start gap-y-4">
              <p class="text-indigo-500">{{birthday.fullName}}</p>
              <p class="flex flex-col">
            <span class="text-indigo-200">
              birthday : {{
                `
                  ${aboutBirthday(birthday.dateOfBirth).day} ${aboutBirthday(birthday.dateOfBirth).date}
                  ${aboutBirthday(birthday.dateOfBirth).month} ${aboutBirthday(birthday.dateOfBirth).year}
                `
              }}
            </span>
                <span class="text-pink-400">
              birth : {{
                    `
                  ${format(birthday.dateOfBirth).day} ${format(birthday.dateOfBirth).date}
                  ${format(birthday.dateOfBirth).month} ${format(birthday.dateOfBirth).year}
                `
                  }}
            </span>
              </p>
              <p class="text-xl text-cyan-500">less than {{getRemaining(aboutBirthday(birthday.dateOfBirth))}} days</p>
              <p class="flex gap-x-1">added
                <span>{{`${getTime().date} ${getTime().month} ${getTime().year}`}}</span>
                <span>{{`${getHours().hour}:${getHours().minute}`}}</span></p>
              <p @click="deleteBirthday" class="cursor-pointer text-white font-bold text-sm rounded-full bg-indigo-400 w-5 h-5 flex flex-col items-center px-2">x</p>
            </div>
          </template>
        </Birth>
      </footer>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onBeforeMount } from 'vue'

import Header from './components/Header.vue'
import Form from './components/Form.vue'
import Birth from './components/Birth.vue'

import { User } from './interface/User'

import { format, aboutBirthday, getRemaining, getTime, getHours } from './ManageDate/dateSetting'
import { setSave } from './LocalStorage/storage'

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
