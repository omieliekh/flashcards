<template>
  <div class="cards">
    <h1>{{ msg }}</h1>

    <b-row>
      <b-col sm="6" md="4" lg="3" v-for="slideshow in slideshows"  :key="slideshow.id">
        <router-link to="/slideshow">
          <b-card
            overlay
            :img-src="getImagePath() + slideshow.image_path"
            :img-alt="slideshow.name"
            text-variant="white"
            :title="slideshow.name"
            class="mb-4"
          ></b-card>
        </router-link>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import config from '../config.js'
  import Auth from '../services/Auth'

  export default {
    name: 'cards',
    data () {
      return {
        msg: 'Cards List',
        getImagePath: function () {
          return config.userImages + Auth.user.email + '/'
        },
        slideshows: []
      }
    },
    mounted: function () {
      this.getList()
    },
    methods: {
      getList () {
        this.$http.get('/api/slideshows')
          .then(({ data: slideshows }) => {
            this.slideshows = slideshows
          })
          .catch(console.error)

        this.$http.get('/api/slideshows/1')
          .then(slideshow => {
            console.log('slideshow id:1: : ', slideshow)
          })
          .catch(console.error)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .card {
    position: relative;

    &>* {
      z-index: 3;
    }

    &>img {
      z-index: 1;
      height: 100%;
      position: absolute;
      object-fit: cover;
    }

    &:before {
      content: "";
      display: block;
      padding-top: 75%;
    }

    &:after {
      content: '';
      width: 100%;
      height: 33.33%;
      top: 0;
      position: absolute;
      background-color: rgba(0,0,0,.5);
      z-index: 2;
    }

    .card-title {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: medium;
    }
  }
</style>
