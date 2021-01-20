<template>
  <transition v-on:enter="enter" v-on:leave="leave" appear>
    <div class="video" ref="videoRef">
      <video src="https://s3.amazonaws.com/akamai.netstorage/HD_downloads/Orion_SM.mp4" autoplay loop muted></video>
    </div>
  </transition>
</template>

<script>
import { enterTransition } from "../animations/routerTransition";
export default {
  name: 'Reel',
  mounted() {},
  methods: {
      leave(el, done) {
        enterTransition(el, 'left', "").reverse();
        done();
      },
      enter(el, done) {
        enterTransition(el, 'right', "").play();
        done();
      },
  }
}
</script>