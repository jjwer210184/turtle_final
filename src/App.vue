<template>
  <div id="app">
    <b-navbar toggleable="lg" type="dark" variant="secondary" class="mb-3">


      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item>
            <router-link to="/" style="color: white;">home</router-link>
          </b-nav-item>
        </b-navbar-nav>

        <div class="ml-auto">
          <b-navbar-nav class="d-inline-block" v-if="!user.loggedIn" v-b-modal.login>
            login
          </b-navbar-nav>
          <b-navbar-nav class="d-inline-block ml-3" v-if="!user.loggedIn"  v-b-modal.signup>
            Signup
          </b-navbar-nav>
          <b-navbar-nav v-else @click="logout">
            Logout
          </b-navbar-nav>
        </div>
        
      </b-collapse>
    </b-navbar>
    <!-- Modal -->
    <signup />
    <login />

    <router-view></router-view>
  </div>
</template>

<script>
import Signup from './components/Signup.vue'
import Login from './components/Login.vue'
import firebase from "firebase";


export default {
  name: 'app',
  data() {
    return {
    }
  },
  components: {
    Signup,
    Login
  },
  methods: {
    logout() {
      firebase.auth().signOut()
      this.$store.dispatch('fetchUser', null)
      this.$router.push({name: 'home'})
    }
  },
  computed: {
    user() {
      return this.$store.state.user 
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
}
/* .slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition-duration: 0.5s;
  transition-property: opacity, transform;
  transition-timing-function: cubic-bezier(0.55, 0, 0.1, 1);
  overflow: hidden;
}

.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  transform: translate(2em, 0);
}

.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  transform: translate(-2em, 0);
} */
</style>
