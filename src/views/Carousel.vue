<template>
  <transition v-on:leave="leave" v-on:enter="enter" appear>
    <div >
      <div class="view-wave" ref="wave"></div>
      <div class="carousel__main-container" ref="carouselRef">
        <h1 class="h1--large bordered-heading carousel__title" ref="titleRef">Ui Design</h1>
        <router-link to="/" class="back-button">
        <span ref="backRef">back</span></router-link>
        <div class="carousel__outer-container">
          <div class="carousel__container" ref="carouselContainer">
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
    </div>
  </transition>
</template>

<script>
import projectCard from "../components/projectCard";
  import animations from "../mixins/animations";
  import data from "../data.json";
import gsap from 'gsap';
export default {
  name: "carousel",
  components: {projectCard},
  data() {
    return {
      projectData: data,
      timeline: gsap.timeline({paused: true}),
    }
  },
  mixins: [animations],
  mounted() {
    this.testTimeline();
  },
  methods: {
    enter(el, done) {
      const titleTween = gsap.fromTo(this.$refs.titleRef, 0.7, {opacity: 0, x: '100px'}, {opacity: 1, x: '0px', delay: 1});
      const backButtonTween = gsap.fromTo(this.$refs.backRef, 0.7, {opacity: 0, translateY: '20px'}, {opacity: 1, translateY: '0px', delay: 1});
      gsap.timeline().add([
        titleTween,
        backButtonTween,
        this.enterTransitionX(this.$refs.wave, 'right', 0, done)
      ])
    },
    leave(el, done) {
      const opacityTween = gsap.to(this.$refs.carouselRef, 0.7, {opacity: 0});
      gsap.timeline().add([
        opacityTween,
        this.leaveTransitionX(this.$refs.wave, 'right', 0, done)
      ])
    },
  }
}
</script>