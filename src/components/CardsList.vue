<template>
  <div class="cards">
    <h1>{{ msg }}</h1>

    <b-row>
      <b-col sm="6" md="4" lg="3" v-for="card in list">
        <router-link to="/slideshow">
          <b-card
            overlay
            :img-src="card.src"
            :img-alt="card.text"
            text-variant="white"
            :title="card.text"
            class="mb-4"
          ></b-card>
        </router-link>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  export default {
    name: 'cards',
    data () {
      return {
        msg: 'Cards List',
        list: [
          {
            id: 0,
            src: 'https://lorempixel.com/300/250/sports/1/',
            text: 'Subtitle 4 and some long text'
          },
          {
            id: 1,
            src: 'https://lorempixel.com/300/250/sports/2/',
            text: 'Subtitle 5'
          },
          {
            id: 2,
            src: 'https://lorempixel.com/300/250/sports/3/',
            text: 'Subtitle 6'
          },
          {
            id: 3,
            src: 'https://lorempixel.com/300/250/sports/5/',
            text: 'Subtitle 4 and some long text'
          },
          {
            id: 4,
            src: 'https://lorempixel.com/300/250/sports/6/',
            text: 'Subtitle 4 and some long text'
          },
          {
            id: 5,
            src: 'https://lorempixel.com/300/250/sports/7/',
            text: 'Subtitle 6'
          },
          {
            id: 6,
            src: 'https://lorempixel.com/300/250/sports/8/',
            text: 'Subtitle 5'
          }
        ]
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
