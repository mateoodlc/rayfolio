<template>
  <div>
    <div class="home">
      <div class="global-container max-bound">
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
            <p ref="descriptionRefLineOne" class="home__description">UI and motion designer working in design field</p>
          </div>
          <div class="masked-animation__wrapper">
            <p ref="descriptionRefLineTwo" class="home__description">since 2015.</p>
          </div>
          <div class="home-navigation">
            <div class="home-navigation__element__inner-wrapper navigation__element-reel">
              <span class="home-navigation__element__line"></span>
              <span class="home-navigation__element__hover">Play</span>
              <div class="masked-animation__wrapper">
                <keep-alive>
                  <router-link 
                    to="/reel" 
                    class="home-navigation__element masked-animation__element" 
                    ref="reelBtnRef">
                    Motion Reel
                  </router-link>
                </keep-alive>
              </div>
            </div>
            <div class="home-navigation__circle masked-animation__element" ref="wrapperRef">
              <svg height="100%" width="100%">
                <circle class="path" ref="circleRef" cx="50%" cy="50%" r="49%" stroke="white" stroke-width="2" fill="black" />
              </svg>
              <div class="home-navigation__circle__image-wrapper" ref="pictureRef">
                <img src="../assets/download.png" alt="" srcset="">
              </div>
            </div>
            <div class="home-navigation__element__inner-wrapper navigation__element-design">
              <span class="home-navigation__element__line"></span>
              <span class="home-navigation__element__hover">View</span>
              <div class="masked-animation__wrapper">
                <router-link 
                  to="/carousel" 
                  class="home-navigation__element masked-animation__element" 
                  ref="designBtnRef">
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
export default {
  name: 'Home',
  data() {
    return {
      mainTimeline: gsap.timeline(),
      animateElements: {}
    }
  },
  components: {
  },
  mounted() {
    getMainTimeline(this.returnAnimateElements()).play(0.1);
  },
  methods: {
    returnAnimateElements() {
      return {
        wrapper: this.$refs.wrapperRef,
        circle: this.$refs.circleRef,
        picture: this.$refs.pictureRef,
        heading: this.$refs.headingRef,
        line1: this.$refs.descriptionRefLineOne,
        line2: this.$refs.descriptionRefLineTwo,
        designBtn: this.$refs.designBtnRef.$el,
        reelBtn: this.$refs.reelBtnRef.$el,
        about: this.$refs.aboutBtnRef.$el
      }
    }
  }
}
</script>
