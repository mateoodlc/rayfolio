<template>
  <transition v-on:enter="enter" v-on:leave="leave" appear>
    <div class="video">
      <div class="view-wave" ref="videoWave"></div>
      <video ref="videoRef" src="https://s3.amazonaws.com/akamai.netstorage/HD_downloads/Orion_SM.mp4" autoplay loop muted></video>
      <router-link to="/" style="position: absolute; top: 20px; right: 20px;"><span ref="closeButtonRef">Close</span></router-link>
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
        this.leaveTransitionX(this.$refs.videoWave, 'left', 0.5, done);
        gsap.to(this.$refs.videoRef, 1, {opacity: 0, delay: 0.2})
        gsap.to(this.$refs.closeButtonRef, 0.6, {opacity: 0, delay: 0})
      },
      enter(el, done) {
        this.enterTransitionX(this.$refs.videoWave, 'left', 0, '');
        gsap.from(this.$refs.videoRef, 0.6, {opacity: 0, delay: 0.9})
        gsap.from(this.$refs.closeButtonRef, 0.6, {opacity: 0, y: '20px', delay: 1.5, onComplete: done})
      },
  }
}
</script>