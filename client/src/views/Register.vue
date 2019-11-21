<template>
  <div>
    <nav-bar-start></nav-bar-start>
    <br>
    <div class="row justify-content-center">
      <div class="col-4">
        <form @submit.prevent="register()">
          <label>Name</label>
          <br>
          <input type="text" required placeholder="Input Your Name" v-model="name" class="form-control">
          <br>
          <label>Email</label>
          <br>
          <input type="email" required placeholder="Input Your Email" v-model="email" class="form-control">
          <br>
          <label>Password</label>
          <br>
          <input type="password" required placeholder="Input Your Pasword" v-model="password" class="form-control">
          <br>
          <input type="submit" class="btn btn-warning" id="btn-register" value="Register">
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
      password: '',
      name: ''
    }
  },
  methods: {
    register () {
      let payload = {
        name: this.name,
        password: this.password,
        email: this.email
      }
      this.$store.dispatch('register', payload)
      this.name = ''
      this.password = ''
      this.email = ''
      this.showModal = false
    }
  }
}
</script>

<style>

</style>
