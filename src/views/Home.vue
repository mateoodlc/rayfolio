<template>
  <div>
    <div class="home">
      <div class="global-container outer-pad" id="global-container">
        <header class="main-header">
          <img class="logo" alt="Vue logo" src="../assets/logo.svg">
          <div class="masked-animation__wrapper">
            <router-link to="/about" class="masked-animation__element about-link" ref="aboutBtnRef">about</router-link>
          </div>
        </header>
        <main class="main-container">
          <div class="masked-animation__wrapper">
            <h1 class="masked-animation__element" ref="headingRef">Portfolio</h1>
          </div>
          <div class="masked-animation__wrapper">
            <p ref="descriptionRef" class="home__description"></p>
          </div>
          <div class="home-navigation">
            <div class="home-navigation__element__inner-wrapper navigation__element-reel" @mouseover="reelHovered = true" @mouseout="reelHovered = false">
              <span class="home-navigation__element__hover">Play</span>
              <div class="masked-animation__wrapper" ref="reelWrapperRef">
                <router-link 
                  to="/reel" 
                  class="home-navigation__element masked-animation__element" 
                  ref="reelBtnRef"
                  @click.native="navigateReel">
                  Motion Reel
                </router-link>
              </div>
            </div>
            <div class="home-navigation__circle masked-animation__element" ref="wrapperRef">
              <svg height="100%" width="100%" ref="circleSvgRef">
                <circle class="path" ref="circleRef" cx="50%" cy="50%" r="49%" stroke="white" stroke-width="2" fill="none" />
              </svg>
              <span class="home-navigation__element__line" :class="{'home-navigation__element__line--hovered': reelHovered}" ref="reelLine"></span>
              <span class="home-navigation__element__line" :class="{'home-navigation__element__line--hovered': designHovered}" ref="designLine"></span>
              <div class="home-navigation__circle__image-wrapper" ref="pictureRef">
                <img src="../assets/home.jpg" alt="" srcset="">
              </div>
            </div>
            <div class="home-navigation__element__inner-wrapper navigation__element-design" @mouseover="designHovered = true" @mouseout="designHovered = false">
              <span class="home-navigation__element__hover">View</span>
              <div class="masked-animation__wrapper" ref="designWrapperRef">
                <router-link 
                  to="/carousel" 
                  class="home-navigation__element masked-animation__element" 
                  ref="designBtnRef"
                  @click.native="navigateUI"
                  >
                  UI Design
                </router-link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
// @ is an alias to /src
import { gsap } from "gsap";
import { getMainTimeline } from "../animations/home.js";
import isMobileVue from '../mixins/isMobile.vue';
import textLinesAnimationVue from "../mixins/textLinesAnimation.vue";
export default {
  name: 'Home',
  data() {
    return {
      mainTimeline: gsap.timeline(),
      animateElements: {},
      descriptionTextMobile: 'UI and motion designer working in\ndesign field since 2015.',
      descriptionTextDesktop: 'UI and motion designer working in design field\nsince 2015.',
      reelHovered: false,
      designHovered: false,
    }
  },
  components: {
  },
  mixins: [isMobileVue, textLinesAnimationVue],
  mounted() {
    getMainTimeline(this.returnAnimateElements()).add(this.animateTextLines(this.isMobile ? this.descriptionTextMobile : this.descriptionTextDesktop, this.$refs.descriptionRef, 4)).play(0.1);
  },
  methods: {
    returnAnimateElements() {
      return {
        wrapper: this.$refs.wrapperRef,
        circle: this.$refs.circleRef,
        picture: this.$refs.pictureRef,
        heading: this.$refs.headingRef,
        designBtn: this.$refs.designBtnRef.$el,
        reelBtn: this.$refs.reelBtnRef.$el,
        about: this.$refs.aboutBtnRef.$el,
        circleSvgRef: this.$refs.circleSvgRef,
      }
    },
    navigateUI() {
      this.isMobile ? '' : gsap.to(this.$refs.designWrapperRef, 0.4, {y: 50, yoyo: true, repeatDelay: 1, repeat: 1});
    },
    navigateReel() {
      this.isMobile ? '' : gsap.to(this.$refs.reelWrapperRef, 0.4, {y: 50, yoyo: true, repeatDelay: 1, repeat: 1});
    }
  }
}
</script>
