<template>
  <transition v-on:enter="enter" v-on:leave="leave" appear>
    <div class="video" ref="videoContainerRef" id="video">
      <div class="video-wrapper" ref="videoWrapper">
        <iframe src="https://www.youtube.com/embed/4MJAbcNDb6Y?rel=0&amp;autoplay=1" allow='autoplay' frameborder="0" allowfullscreen=""></iframe>
      </div>
      <router-link to="/" style="position: fixed; top: 32px; right: 32px;"><span ref="closeButtonRef">Close</span></router-link>
    </div>
  </transition>
</template>

<script>
import gsap from 'gsap';
import animations from "../mixins/animations";
import grained from "../animations/grained.js";
export default {
  name: 'Reel',
  mounted() {},
  mixins: [animations],
  methods: {
      leave(el, done) {
        gsap.to(this.$refs.videoContainerRef, 1.5, {xPercent: -101, ease: 'expo.inOut', delay: 0.1});
        gsap.to(this.$refs.videoWrapper, 1.5, {xPercent: 101, yPercent: -50, ease: 'expo.inOut', delay: 0.1, onComplete: done});
        gsap.to(this.$refs.closeButtonRef, 0.6, {opacity: 0, delay: 0});
      },
      enter(el, done) {
        grained('#video');
        gsap.from(this.$refs.videoContainerRef, 1.5, {xPercent: -101, ease: 'expo.inOut', delay: 0});
        gsap.fromTo(this.$refs.videoWrapper, 1.5, {xPercent: 101, opacity: 0, yPercent: -50}, {xPercent: 0, opacity: 1, yPercent: -50, ease: 'expo.inOut', delay: 0});
        gsap.from(this.$refs.closeButtonRef, 0.6, {opacity: 0, y: '20px', delay: 0.8, onComplete: done});
      },
  }
}
</script>