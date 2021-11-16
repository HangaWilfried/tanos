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
