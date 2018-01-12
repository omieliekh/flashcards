<template>
  <div class="cards">
    <h1>{{ msg }}</h1>

    <b-row>
      <link-card
        v-for="slideshow in slideshows"  :key="slideshow.id"
        :link="'/slideshow/' + slideshow.id"
        :image-path="getImagePath() + slideshow.image_path"
        :name="slideshow.name"
      ></link-card>
    </b-row>
  </div>
</template>

<script>
  import Auth from '../services/Auth'
  import LinkCard from '@/components/LinkCard'

  export default {
    name: 'cards',
    components: {
      LinkCard
    },
    data () {
      return {
        msg: 'Cards List',
        slideshows: [],
        getImagePath: Auth.getImagePath.bind(Auth)
      }
    },
    mounted () {
      this.getList()
    },
    methods: {
      getList () {
        this.$http.get('/api/slideshows')
          .then(({ data: slideshows }) => {
            this.slideshows = slideshows
          })
          .catch(console.error)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

</style>
