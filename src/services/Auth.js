import Vue from 'vue'
import router from '../router'

export default {
  user: null,
  login (userData) {
    return Vue.http.post('/api/login', userData)
      .then(this.setupUser.bind(this))
      .catch(console.error)
  },

  signup (userData) {
    return Vue.http.post('/api/sign-up', userData)
      .then(this.setupUser.bind(this))
      .catch(console.error)
  },

  setupUser ({ data }) {
    localStorage.setItem('auth_token', data.token)
    this.user = data.user
    router.push('/')
  },

  logout () {
    localStorage.removeItem('auth_token')
    this.user = null
    router.push('login')
  },

  getToken () {
    return localStorage.getItem('auth_token')
  },

  checkAuth () {
    const token = this.getToken()

    if (!token) {
      this.user = null
      router.push('login')
      return Promise.resolve(null)
    }

    return Vue.http.post('/api/check-auth', { token })
      .then(({ data }) => {
        if (data.user) {
          this.user = data.user
        } else {
          this.user = null
        }

        return data
      })
  },

  useAuthHeaderInterceptor () {
    Vue.http.interceptors.push((request, next) => {
      const token = this.getToken()

      if (token) {
        request.headers.set('Authorization', 'Bearer ' + token)
      }

      next()
    })
  }
}
