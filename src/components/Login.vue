<template>
  <div class="login">
    <b-form @submit="onLogin">
      <b-form-input
        id="email"
        v-model="form.email"
        required
        placeholder="Email"
      ></b-form-input>

      <b-form-input
        id="password"
        type="password"
        v-model="form.password"
        required
        placeholder="Password"
      ></b-form-input>

      <b-button type="submit" variant="primary">Login</b-button>
    </b-form>

    <b-alert
      v-if="error"
      variant="danger"
      dismissible
      :show="!!error"
      @dismissed="error=''"
    >{{ error }}</b-alert>
  </div>
</template>

<script>
  import Auth from '../services/Auth'

  export default {
    name: 'login',
    data () {
      return {
        form: {
          email: '',
          password: ''
        },
        error: ''
      }
    },
    mounted: function () {

    },
    methods: {
      onLogin: function (evt) {
        evt.preventDefault()

        this.error = ''

        return Auth.login(this.form).then(() => {
          this.form.email = ''
          this.form.password = ''
        })
        .catch((data) => {
          this.error = data.data || data.body || data.bodyText
        })
      }
    }
  }
</script>

<style scoped>

</style>
