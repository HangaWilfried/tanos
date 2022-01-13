<template>
  <div class="w-full h-full top-0 left-0 absolute bg-zinc-600 text-white text-xl font-sans font-bold flex flex-col items-center justify-center">
    <Header>
      <template #default>
        <header class="flex justify-between gap-x-10 mb-10 items-end">
          <nav>
            <h1 class="flex flex-col items-center">
              <span>{{nextYear}}</span>
              <span class="font-extrabold">BIRTHDAYS APP</span>
            </h1>
          </nav>
          <div class="bg-white rounded-md text-zinc-500 text-sm px-4 py-2">
            {{countBirthdays}} birthdays
          </div>
        </header>
      </template>
    </Header>

    <main class="flex flex-col gap-y-4">
      <Form @submit="addNewBirthday"/>
    </main>

    <footer>
      <Birth v-for="(birthday, index) in birthdays" :key="index">
        <template #default>
          <div>
            <p>{{birthday.fullName}}</p>
            <p>
            <span>
              birthday: {{
                `
                  ${aboutBirthday(birthday.dateOfBirth).day} ${aboutBirthday(birthday.dateOfBirth).date}
                  ${aboutBirthday(birthday.dateOfBirth).month} ${aboutBirthday(birthday.dateOfBirth).year}
                `
              }}
            </span>
              <span>
              birth: {{
                  `
                  ${format(birthday.dateOfBirth).day} ${format(birthday.dateOfBirth).date}
                  ${format(birthday.dateOfBirth).month} ${format(birthday.dateOfBirth).year}
                `
                }}
            </span>
            </p>
            <p>less than {{getRemaining(aboutBirthday(birthday.dateOfBirth))}} days</p>
            <p>added
              <span>{{`${getTime().date}${getTime().month}${getTime().year}`}}</span>
              <span>{{`${getHours().hour}:${getHours().minute}`}}</span></p>
            <p @click="deleteBirthday">x</p>
          </div>
        </template>
      </Birth>
    </footer>
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
