<template>
  <transition v-on:leave="leave" v-on:enter="enter" appear>
    <div class="view-wave" ref="wave"></div>
    <div class="carousel__main-container" ref="carouselRef">
      <h1 class="h1--large bordered-heading carousel__title">Ui Design</h1>
      <router-link to="/" class="back-button">back</router-link>
      <div class="carousel__outer-container">
        <div class="carousel__container">
          <project-card v-for="(project, index, key) of projectData" :projectData="projectData[index]" :key="key" :index="index"></project-card>
        </div>
      </div>
      <div class="carousel-indicator">
        <div class="carousel-indicator__number"><p>01</p></div>
        <div class="carousel-indicator__line">
          <span></span>
        </div>
        <div class="carousel-indicator__number"><p>04</p></div>
      </div>
    </div>
  </transition>
</template>

<script>
import projectCard from "../components/projectCard";
  import { enterTransition } from "../animations/routerTransition";
  import data from "../data.json";
export default {
  name: "carousel",
  components: {projectCard},
  data() {
    return {
      projectData: data,
    }
  },
    methods: {
      leave(el, done) {
        enterTransition(this.$refs.wave, 'left', done).reverse;
      },
      enter(el, done) {
        enterTransition(this.$refs.wave, 'left', done).play;
      },
      getData() {

      }
    }
}
</script>