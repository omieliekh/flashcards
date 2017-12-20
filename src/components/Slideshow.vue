<template>
  <div class="slideshow">
    <b-carousel
      v-if="slideshow"
      controls
      indicators
      :interval="4000"
    >
      <b-carousel-slide
        v-for="slide in slideshow.slides"  :key="slide.id"
        :caption="slide.text"
        :img-src="getImagePath() + slide.image_path"
      ></b-carousel-slide>
    </b-carousel>
  </div>
</template>

<script>
  import Auth from '../services/Auth'

  export default {
    data () {
      return {
        slideshow: null,

        getImagePath: Auth.getImagePath.bind(Auth)
      }
    },
    mounted () {
      this.getSlides()
    },
    methods: {
      getSlides () {
        const id = this.$route.params.id

        this.$http.get(`/api/slideshows/${id}`)
          .then(({ data: slideshow }) => {
            this.slideshow = slideshow
          })
          .catch(console.error)
      }
    }
  }
</script>
<style lang="less">
  .slideshow {
    .carousel.slide {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;

      .list,
      .carousel-inner,
      .carousel-item {
        width: 100%;
        height: 100%;
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .carousel-indicators li {
      box-shadow: 0 1px 4px 0 black;
    }

    .carousel-caption,
    .carousel-control-prev-icon,
    .carousel-control-next-icon {
      text-shadow: 0 1px 4px black;
    }
  }
</style>
