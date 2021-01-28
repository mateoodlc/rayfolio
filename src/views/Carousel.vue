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
            <project-card ref="carouselElement" v-for="(project, index, key) of projectData" :projectData="projectData[index]" :key="key" :index="index"></project-card>
          </div>
        </div>
        <div class="carousel-indicator">
          <div class="carousel-indicator__number"><p>01</p></div>
          <div class="carousel-indicator__line">
            <span ref="lineRef"></span>
          </div>
          <div class="carousel-indicator__number"><p>04</p></div>
        </div>
      </div>
      <router-view></router-view>
    </div>
  </transition>
</template>

<script>
import projectCard from "../components/projectCard";
  import animations from "../mixins/animations";
  import data from "../data.json";
  import debounce from 'lodash.debounce';
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
  mixins: [animations],
  methods: {
    enter(el, done) {
      const titleTween = gsap.fromTo(this.$refs.titleRef, 0.7, {opacity: 0, x: '100px'}, {opacity: 1, x: '0px', delay: 1});
      const backButtonTween = gsap.from(this.$refs.backRef, 0.7, {opacity: 0, translateY: '20px', delay: 1.8});
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
    getScrollX() {
      const scrollLeft = window.pageXOffset;
      return scrollLeft;
    },
    getElementWidth() {
      const isMobile = window.innerWidth < 900;
      return isMobile ? this.$refs.carouselElement[0].$el.getBoundingClientRect().width * 4 : this.$refs.carouselRef.getBoundingClientRect().width;
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
      const factor = this.getScrollX();
      const minScroll = 0;
      const maxScroll = this.getElementWidth() - window.innerWidth;
      const minScale = 1 / data.projects.length;
      const maxScale = 1;
      const map = this.map(factor, minScroll, maxScroll, minScale, maxScale, true)
      this.$refs.lineRef.style.transform = `translateY(-50%) scaleX(${map}`;
    }, 10),
  },
  mounted() {
    this.updateLineWidth();
    document.addEventListener('scroll', () => {
      if (this.routeMatch) this.updateLineWidth();
    })
  },
  computed: {
    routeMatch() {
      return this.$route.path === "/carousel";
    }
  }
}
</script>