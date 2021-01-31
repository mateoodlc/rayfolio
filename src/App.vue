<template>
  <div id="app"> 
    <div class="pointer-circle" ref="circleRef" :class="{'dark': this.$route.path !== '/' && this.$route.path !== 'reel'}"></div>
    <div class="pointer" :class="{'dark': this.$route.path !== '/' && this.$route.path !== 'reel'}" ref="pointer"></div>
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
import hasHistoryVue from './mixins/hasHistory.vue';
import Vue from 'vue';
export default {
  name: "App",
  mounted() {
  },
  mixins: [hasHistoryVue],
}
Vue.mixin(hasHistoryVue);
</script>

<style lang="scss">
#app {
  background-color: #fff;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

<script>
export default {
  mounted() {
    this.addEvents();
  },
  methods: {
    addEvents() {
      window.addEventListener("mousemove", event => {
        this.followPointer(event);
      });
    },
    followPointer(e) {
      this.rawX = e.clientX;
      this.rawY = e.clientY;
      this.halfW = window.innerWidth / 2;
      this.halfH = window.innerHeight / 2 - window.scrollY;
      gsap.to(this.$refs.circleRef, 1, {
        x: this.rawX - this.halfW,
        y: this.rawY - this.halfH,
        ease: 'power4.out'
      });
      gsap.to(this.$refs.pointer, 0, {
        x: this.rawX - this.halfW,
        y: this.rawY - this.halfH,
        ease: 'power4.out'
      });
    },
  }
}
</script>
