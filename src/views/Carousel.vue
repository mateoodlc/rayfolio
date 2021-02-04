<template>
  <transition v-on:leave="leave" v-on:enter="enter" appear>
    <div class="carousel__outer-main-container" ref="carouselMainRef">
      <div class="carousel view-wave" ref="wave"></div>
        <h1 class="h1--large bordered-heading carousel__title" ref="titleRef">Ui Design</h1>
      <div class="carousel__main-container" ref="carouselRef" id="wave" :class="{'no-scrollable': !this.routeMatch}">
        <router-link to="/" class="back-button">
        <span ref="backRef">back</span></router-link>
        <div class="carousel__outer-container">
          <div class="carousel__container" ref="carouselContainer" @scroll.passive="updateLineWidth">
            <project-card ref="carouselElement" v-for="(project, index, key) of projectData" :projectData="projectData[index]" :key="key" :index="index"></project-card>
          </div>
        </div>
      </div>
      <div class="carousel-indicator" ref="carouselIndicator">
        <div class="carousel-indicator__number"><p>01</p></div>
        <div class="carousel-indicator__line">
          <span ref="lineRef"></span>
        </div>
        <div class="carousel-indicator__number"><p>0{{projectData.length}}</p></div>
      </div>
      <router-view></router-view>
    </div>
  </transition>
</template>

<script>
import projectCard from "../components/projectCard";
import debounce from 'lodash.debounce';
import animations from "../mixins/animations";
import isMobileVue from '../mixins/isMobile.vue';
import data from "../data.json";
import gsap from 'gsap';
export default {
  name: "carousel",
  components: {projectCard},
  data() {
    return {
      projectData: data.projects,
      timeline: gsap.timeline({paused: true}),
      scrollX: window.pageXOffset || document.documentElement.scrollLeft
    }
  },
  mixins: [animations, isMobileVue],
  methods: {
    enter(el, done) {
      const {carouselRef, carouselContainer, wave, titleRef, backRef, carouselIndicator} = this.$refs;
      const titleTween = gsap.fromTo(titleRef, 0.7, {opacity: 0, x: '100px'}, {opacity: 1, x: '0px', delay: 1});
      const opacityTween = gsap.from(carouselIndicator, 0.7, {opacity: 0, delay: 1});
      const waveTimeline = gsap.timeline().add([
        gsap.from(carouselRef, 1.5, {xPercent: 101, ease: 'expo.inOut', delay: 0.3}),
        gsap.from(carouselContainer, 1.5, {xPercent: -101, ease: 'expo.inOut', delay: 0.3}),
      ]);
      const fadeInY = (element) => gsap.from(element, 0.7, {opacity: 0, y: '20px', delay: 1.8});
      gsap.timeline().add([
        titleTween,
        fadeInY(backRef),
        opacityTween,
        this.isMobile ? waveTimeline : this.enterTransitionX(wave, 'right', 0, done)
      ]);
      done();
    },
    leave(el, done) {
      const {wave, carouselRef, carouselContainer, backRef, carouselIndicator, titleRef} = this.$refs;
      const opacityTween = (element) => gsap.to(element, 0.7, {opacity: 0});
      const waveTimeline = gsap.timeline().add([
        gsap.to(carouselRef, 1.5, {xPercent: 101, ease: 'expo.inOut', delay: 0.3}),
        gsap.to(carouselContainer, 1.5, {xPercent: -101, ease: 'expo.inOut', delay: 0.3}),
      ])
      gsap.timeline({paused: true, onComplete: done}).add([
        opacityTween(backRef),
        opacityTween(titleRef),
        opacityTween(carouselIndicator),
        this.isMobile ? '' : opacityTween(carouselContainer),
        this.isMobile ? waveTimeline : this.leaveTransitionX(wave, 'right', 0, done),

      ]).play();
    },
    getElementX() {
      return this.$refs.carouselElement[0].$el.getBoundingClientRect().x;
    },
    getContainerWidth() {
      return this.$refs.carouselContainer.clientWidth - this.$refs.carouselElement[0].$el.clientWidth;
    },
    getElementWidth() {
      const offset = this.isMobile ? 0 : 420;
      const totalMargin = this.isMobile ? 0 : 256 * this.projectData.length;
      const elementWidth = this.$refs.carouselElement[0].$el.getBoundingClientRect().width * (this.isMobile ? this.projectData.length - 1 : this.projectData.length);
      return elementWidth - offset - totalMargin;
    },
    getScrollPosition() {
      return window.scrollY;
    },
    map(n, start1, stop1, start2, stop2, withinBounds) {
      const newval = (n - start1) / (stop1 - start1) * (stop2 - start2) + start2;
      if (!withinBounds) {
        return newval;
      }
      if (start2 < stop2) {
        return this.constrain(newval, start2, stop2);
      } else {
        return this.constrain(newval, stop2, start2);
      }
    },
    constrain(n, low, high) {
      return Math.max(Math.min(n, high), low);
    },
    updateLineWidth: debounce(function() {
      const factor = this.getElementX();
      const minScroll = 0;
      const maxScroll = -this.getElementWidth();
      const minScale = 1 / data.projects.length;
      const maxScale = 1;
      const map = this.map(factor, minScroll, maxScroll, minScale, maxScale, true)
      this.$refs.lineRef.style.transform = `translateY(-50%) scaleX(${map}`;
    }, 0),
    updateScroll: debounce(function() {
      const factor = this.getScrollPosition();
      const minScroll = 0;
      const maxScroll = this.$refs.carouselRef.getBoundingClientRect().height;
      const minScale = 0;
      const maxScale = this.getContainerWidth();
      const map = this.map(factor, minScroll, maxScroll, minScale, maxScale, true)
      this.$refs.carouselContainer.style.transform = `translateX(${-map}px) translateY(-50%)`;
    }, 0),
  },
  mounted() {
    this.updateLineWidth();
    window.addEventListener('scroll', () => {
      this.updateLineWidth();
      this.updateScroll();
    }, false);
  },
  computed: {
    routeMatch() {
      return this.$route.path === "/carousel";
    },
  }
}
</script>