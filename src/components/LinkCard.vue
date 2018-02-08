<template>
  <b-col sm="6" md="4" lg="3">
    <router-link v-if="link" :to="link">
      <b-card
        overlay
        :img-src="imagePath"
        :img-alt="name"
        text-variant="white"
        :title="name"
        :class="(hideBorder ? 'hide-border' : '') + ' ' + (centerText ? 'center-text' : '')"
      ></b-card>
    </router-link>

    <b-card
      v-if="!link"
      overlay
      :img-src="imagePath"
      :img-alt="name"
      text-variant="white"
      :title="name"
      :class="(hideBorder ? 'hide-border' : '') + ' ' + (centerText ? 'center-text' : '')"
    ></b-card>
  </b-col>
</template>

<script>
  export default {
    name: 'link-card',
    props: {
      link: String,
      imagePath: String,
      name: String,
      hideBorder: Boolean,
      centerText: Boolean
    },
    data () {
      return {}
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .card {
    position: relative;
    margin-bottom: 10px;

    &.hide-border {
      border: none !important;
    }

    &.center-text {
      .card-title {
        margin-top: 15px;
        white-space: pre-wrap;
        max-height: 3.6em;
      }
    }

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

    &:not(.hide-border) {
      &:after {
        content: '';
        width: 100%;
        height: 33.33%;
        top: 0;
        position: absolute;
        background-color: rgba(0,0,0,.5);
        z-index: 2;
      }
    }

    .card-title {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: medium;
    }
  }
</style>
