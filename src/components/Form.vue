<template>
  <div class="mt-10">
    <span class="color">last name</span>
    <input type="text" v-model="lastName" class="form">
  </div>
  <div class="mt-10">
    <span class="color block">first name</span>
    <input type="text" v-model="firstName" class="form">
  </div>
  <div class="mt-10">
    <span class="color">date of birth</span>
    <input type="date" v-model="user.dateOfBirth" class="form">
  </div>
  <div class="mt-10">
    <button @click="submit" class="sm:w-full lg:w-96 2xl:w-96 md:w-96 my-5 rounded py-4 px-8 bg-green-600 text-white text-2xl">Submit</button>
  </div>
</template>

<script lang="ts">
import { reactive, ref, defineComponent } from 'vue'
import { User } from '@/interface/User'

export default defineComponent({
  name: 'Form',
  emits: ['submit'],
  setup: function (_, { emit }) {
    const lastName = ref<string>('')
    const firstName = ref<string>('')
    const user = reactive<User>({
      fullName: '',
      dateOfBirth: ''
    })
    const submit = () => {
      user.fullName = `${lastName.value} ${firstName.value}`
      emit('submit', user)
    }
    return {
      user,
      lastName,
      firstName,
      submit
    }
  }
})
</script>
