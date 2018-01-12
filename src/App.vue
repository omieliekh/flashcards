<template>
  <div id="app">
    <b-container>
      <top-header></top-header>
      <router-view :key="$route.fullPath"></router-view>
    </b-container>
  </div>
</template>

<script>
import TopHeader from '@/components/TopHeader'

export default {
  name: 'app',
  components: {
    TopHeader
  }
}
</script>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding-top: 20px;
}

form {
  input,
  select {
    margin-bottom: 10px;
  }
}
</style>
