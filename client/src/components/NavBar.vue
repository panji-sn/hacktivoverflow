<template>
  <div>
      <nav>
         <div class="logo">
          <router-link to="/">
              <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                  <image xlink:href='https://image.flaticon.com/icons/png/512/36/36634.png' alt="symbol" height="40" width="40"/>
              </svg>
              <span style="color: white;">Hacktivoverflow</span>
          </router-link>
        </div>
         <div>
            <router-link to="/" class="btn btn-warning">Home</router-link>
            <router-link to="/myQuestion" class="btn btn-warning">My Questions</router-link>
            <a href="#" class="btn btn-warning" @click.prevent="signOut" id="btn-left">SignOut</a>
         </div>
      </nav>
  </div>
</template>

<script>
export default {
  methods: {
    signOut () {
      this.$store.dispatch('signOut')
    }
  }
}
</script>

<style>
.btn {
  padding: 10px;
  margin: 5px;
}
nav {
  background-color: #ebde6e;
  height: 68px;
  width: 100vw;
  display: flex;
  justify-content: space-between;
}
img {
  height: 250px;
  width: 100%;
}
.logo {
  margin-left: 14px;
  display: flex;
  align-items: center;
}
.logo:hover {
  cursor: pointer;
}
.click {
  display: flex;
  align-items: center;
  margin-right: 15px;
}
</style>
