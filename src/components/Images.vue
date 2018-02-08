<template>
  <div class="images">
    <b-row>
      <b-col>
        <h1>{{ msg }}</h1>
      </b-col>
      <b-col class="text-right">
        <b-button variant="primary" class="upload-button">
          <span class="upload-button-title">Upload</span>
          <input type="file" @change="onFileChange">
        </b-button>
      </b-col>
    </b-row>

    <b-row>
      <link-card
        v-if="subPath"
        :link="upperPath"
        image-path="static/images/folder-icon.png"
        name=".."
        :hide-border="true"
        :center-text="true"
      ></link-card>

      <link-card
        v-for="file in files"
        :key="file.name"
        :link="file.type === 'dir' ? `/images/?subpath=${encodeURIComponent(subPath + file.name)}` : null"
        :image-path="file.type === 'dir' ? 'static/images/folder-icon.png' : (getImagePath() + subPath + file.name)"
        :name="file.name"
        :hide-border="file.type === 'dir'"
        :center-text="file.type === 'dir'"
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
            this.files = files
          })
          .catch(console.error)
      },
      getUpperPathLink () {
        const subPathArr = this.subPath.replace(/(\/$)/, '').split('/')
        const upperPath = subPathArr.slice(0, subPathArr.length - 1).join('/')
        const upperPathLink = upperPath ? `/images/?subpath=${encodeURIComponent(upperPath)}` : '/images/'

        return upperPathLink
      },

      onFileChange (event) {
        const files = event.target.files

        if (!files || !files.length) {
          return
        }

        const formData = new FormData()

        formData.append('subpath', this.subPath)
        formData.append('image', files[0], files[0].name)

        this.$http.post('/api/images-upload', formData)
          .then(({ data }) => {
            if (data.success) {
              this.getList()
            }
          })
          .catch(console.error)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .upload-button {
    position: relative;
    overflow: hidden;

    [type=file] {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      opacity: 0;
      transform: scale(2);
    }
  }
</style>
