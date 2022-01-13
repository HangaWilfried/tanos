<template>
  <div class="text-base flex items-center relative bg-blue-400 h-10 rounded-md pl-2 gap-x-3">
    <span>last name</span>
    <input type="text" v-model="lastName" class="w-full">
  </div>
  <div class="text-base flex items-center relative bg-blue-400 h-10 rounded-md pl-2 gap-x-3">
    <span>first name</span>
    <input type="text" v-model="firstName" class="w-full">
  </div>
  <div class="text-base flex items-center relative bg-blue-400 h-10 rounded-md  px-4 gap-x-3">
    <span>date of birth</span>
    <input type="date" v-model="user.dateOfBirth" class="w-full">
  </div>
  <div>
    <button @click="submit">Submit</button>
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
      lastName.value = ''
      firstName.value = ''
      user.dateOfBirth = ''
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
