<template>
  <div>
    <span>last name</span>
    <input type="text" v-model="lastName">
  </div>
  <div>
    <span>first name</span>
    <input type="text" v-model="firstName">
  </div>
  <div>
    <span>date of birth</span>
    <input type="date" v-model="user.dateOfBirth">
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
