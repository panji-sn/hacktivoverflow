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
         <div class="clickable">
            <router-link to="/" class="btn btn-warning">Home</router-link>
            <router-link to="/register" class="btn btn-warning">Register</router-link>
            <router-link to="/login" class="btn btn-warning" style="margin-left:10px; margin-right:30px;">Login</router-link>
         </div>
      </nav>
  </div>
</template>

<script>
export default {

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
