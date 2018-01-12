<template>
  <div class="header-container">
    <b-row>
      <b-col sm="7" class="routes">
        <template v-if="!auth.user">
          <router-link to="/login">Login</router-link>
          <router-link to="/sign-up">Sign Up</router-link>
        </template>
        <template v-if="auth.user">
          <router-link to="/">Hello World</router-link>
          <router-link to="/cards-list">Cards List</router-link>
          <router-link to="/images">Images</router-link>
        </template>
      </b-col>

      <b-col  v-if="auth.user" sm="5" class="welcome-panel">
        <span class="header-username">{{ auth.user.name }}</span>

        <b-button
          v-if="auth.user"
          @click="logout"
          variant="primary"
          size="sm"
        >Logout</b-button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import Auth from '../services/Auth'

  export default {
    name: 'top-header',
    data () {
      return {
        auth: Auth
      }
    },
    mounted: function () {
      Auth.checkAuth()
    },
    methods: {
      logout () {
        Auth.logout()
      }
    }
  }
</script>

<style scoped lang="less">
  .routes {
    border-bottom: 2px solid gray;
    margin-bottom: 10px;
    padding-left: 0;

    a {
      padding: 0 5px;
      border-bottom: 2px solid transparent;
      margin-bottom: -2px;
      text-decoration: none;
      color: black;
      font-weight: bold;

      &:hover,
      &:active,
      &.router-link-exact-active {
        border-bottom: 2px solid #007bff;
        color: #007bff;
      }
    }
  }

  .header-container {
    margin-bottom: 40px;
    line-height: 31px;

    .row {
      margin-left: 0;
    }
  }

  .welcome-panel {
    text-align: right;
  }

  a,
  .header-username {
    display: inline-block;
    margin-right: 10px;
  }

  .header-username {
    position: relative;
    top: 2px;

  }
</style>
