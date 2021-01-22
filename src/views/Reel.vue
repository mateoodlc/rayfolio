<template>
  <transition v-on:enter="enter" v-on:leave="leave" appear>
    <div class="video">
      <div class="view-wave" ref="videoWave"></div>
      <video ref="videoRef" src="https://s3.amazonaws.com/akamai.netstorage/HD_downloads/Orion_SM.mp4" autoplay loop muted></video>
    <router-link to="/" style="position: absolute; top: 20px; left: 20px;">CLICK ME</router-link>
    </div>
  </transition>
</template>

<script>
import gsap from 'gsap';
import animations from "../mixins/animations";
export default {
  name: 'Reel',
  mounted() {},
  mixins: [animations],
  methods: {
      leave(el, done) {
        this.leaveTransitionX(this.$refs.videoWave, 'left', 0, '');
        gsap.fromTo(this.$refs.videoRef, 1, {opacity: 1}, {opacity: 0, onComplete: done})
      },
      enter(el, done) {
        this.enterTransitionX(this.$refs.videoWave, 'left', 0, '');
        gsap.fromTo(this.$refs.videoRef, 0.6, {opacity: 0}, {opacity: 1, onComplete: done, delay: 0.9})
      },
  }
}
</script>