<template>
  <div class="sign-up">
    <b-form @submit="onSignUp" autocomplete="off">
      <b-form-input
        id="sign-up-name"
        v-model="form.name"
        required
        placeholder="First and Last Name"
        autocomplete="off"
      ></b-form-input>

      <b-form-input
        id="sign-up-email"
        type="email"
        v-model="form.email"
        required
        placeholder="Email"
        autocomplete="off"
      ></b-form-input>

      <b-form-input
        id="sign-up-password"
        type="password"
        v-model="form.password"
        required
        placeholder="Password"
        autocomplete="off"
      ></b-form-input>

      <b-button type="submit" variant="primary">Sign Up</b-button>
    </b-form>

    <b-alert
      v-if="error"
      :show="!!error"
      variant="danger"
      dismissible
      @dismissed="error=''"
    >{{ error }}</b-alert>
  </div>
</template>

<script>
  import Auth from '../services/Auth'

  export default {
    name: 'sign-up',
    data () {
      return {
        form: {
          name: '',
          email: '',
          password: ''
        },
        error: '',
        error2: 'Error2'
      }
    },
    mounted: function () {

    },
    methods: {
      onSignUp: function (evt) {
        evt.preventDefault()

        this.error = ''

        if (!this.form.name) {
          this.error = 'First and Last Name is required'
        }

        if (!this.form.email) {
          this.error = 'Email is required'
        }

        if (!this.form.password) {
          this.error = 'Password is required'
        }

        return Auth.signup(this.form).then(() => {
          this.form.name = ''
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
