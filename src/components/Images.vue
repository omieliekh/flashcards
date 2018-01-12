<template>
  <div class="images">
    <h1>{{ msg }}</h1>

    <b-row>
      <link-card
        v-if="subPath"
        :link="upperPath"
        image-path="static/images/folder-icon.png"
        name=".."
      ></link-card>

      <link-card
        v-for="file in files"
        :key="file.name"
        :link="file.type === 'dir' ? `/images/?subpath=${encodeURIComponent(subPath + file.name)}` : null"
        :image-path="file.type === 'dir' ? 'static/images/folder-icon.png' : (getImagePath() + subPath + file.name)"
        :name="file.name"
      ></link-card>
    </b-row>
  </div>
</template>

<script>
  import Auth from '../services/Auth'
  import LinkCard from '@/components/LinkCard'

  export default {
    name: 'images',
    components: {
      LinkCard
    },
    data () {
      return {
        msg: 'Images',
        subPath: '',
        upperPath: null,
        files: [],
        getImagePath: Auth.getImagePath.bind(Auth)
      }
    },
    mounted () {
      this.subPath = this.$route.query.subpath ? `${this.$route.query.subpath}/` : ''
      this.getList()
      this.upperPath = this.getUpperPathLink()
    },
    methods: {
      getList () {
        const url = this.subPath ? `/api/images?subpath=${this.subPath}` : `/api/images`

        this.$http.get(url)
          .then(({ data: files }) => {
            // console.log('images: ', JSON.stringify(images, null, 2))

            this.files = files
          })
          .catch(console.error)
      },
      getUpperPathLink () {
        const subPathArr = this.subPath.replace(/(\/$)/, '').split('/')
        const upperPath = subPathArr.slice(0, subPathArr.length - 1).join('/')
        const upperPathLink = upperPath ? `/images/?subpath=${encodeURIComponent(upperPath)}` : '/images/'

        return upperPathLink
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

</style>
