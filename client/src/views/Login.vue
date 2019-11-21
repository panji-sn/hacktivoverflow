<template>
  <div>
    <nav-bar-start></nav-bar-start>
    <br>
    <div class="row justify-content-center">
      <div class="col-4">
        <form @submit.prevent="login()">
        <label>Email</label>
        <br>
        <input type="email" required placeholder="Input Your Email" v-model="email" class="form-control">
        <br>
        <label>Password</label>
        <br>
        <input type="password" required placeholder="Input Your Pasword" v-model="password" class="form-control">
        <br>
        <input type="submit" class="btn btn-warning"  value="Login">
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import NavBarStart from '../components/NavBarStart'
export default {
  name: 'login',
  components: {
    NavBarStart
  },
  data: () => {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login () {
      let payload = {
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('login', payload)
      this.email = ''
      this.password = ''
      this.isLogin = true
    }
  }
}
</script>

<style>

</style>
