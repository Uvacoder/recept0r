<script setup lang="ts">
  import { reactive, ref } from 'vue'
  import { useStore } from '@/store'
  import { validateCredentials } from '@/utils'
  import type { Credentials } from '@/types'

  import ButtonDefault from '@/components/button/ButtonDefault.vue'

  const store = useStore()

  const credentials: Credentials = reactive({
    name: '',
    email: '',
    password: ''
  })
  const validationMsg = ref('')

  const clearMsg = () => validationMsg.value = ''

  const handleSignup = () => {
    if (validateCredentials(credentials)) {
      store.dispatch('user/attemptSignup', credentials)
    } else {
      validationMsg.value = 'Please enter valid information.'
    }
  }
</script>

<template>
  <form class="" @submit.prevent="handleSignup">
    <div class="form-group">
      <label for="name">Name</label>
      <input class="auth-form-control" id="name" v-model="credentials.name" type="text" placeholder="Arnold Schwarzenegger" autocomplete="off" @input="clearMsg" v-focus />
    </div>
    <div class="form-group">
      <label for="email">Email</label>
      <input class="auth-form-control" id="email" type="email" v-model="credentials.email" placeholder="arnie@terminator.com" @input="clearMsg"/>
    </div>
    <div class="form-group">
      <label for="password">Password</label>
      <input class="auth-form-control" id="password" type="password" v-model="credentials.password" placeholder="******" @input="clearMsg"/>
    </div>
    <ButtonDefault class="modal-btn mx-auto" type="submit">Sign Up</ButtonDefault>
  </form>
  <transition name="fade">
    <p v-if="validationMsg !== ''" v-html="validationMsg" class="error font-bold text-center mt-8 mb-2" />
  </transition>
</template>