<template>
  <div id="app" ref="app"> 
    <div class="pointer-circle" ref="circleRef" :class="[{'dark': this.$route.path !== '/' && this.$route.path !== 'reel'}, {'fixed' : this.isCarouselPage}]"></div>
    <div class="pointer" :class="[{'dark': this.$route.path !== '/' && this.$route.path !== 'reel'}, {'fixed' : this.isCarouselPage}]" ref="pointer"></div>
    <keep-alive>
      <router-view/>
    </keep-alive>
    <span class="noise" style="backgroundImage: url('../assets/whiteNoise.png')"></span>
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
      window.addEventListener('scroll', () => {
        this.addScrollToPointer();
      })
    },
    followPointer(e) {
      this.rawX = e.clientX;
      this.rawY = e.clientY;
      this.halfW = window.innerWidth / 2;
      this.halfH = window.innerHeight / 2 - window.scrollY;
      gsap.to(this.$refs.circleRef, 1, {
        left: this.rawX - this.$refs.circleRef.clientWidth / 2,
        top: this.rawY - this.$refs.circleRef.clientHeight / 2 + (this.isCarouselPage ? 0 : window.scrollY),
        ease: 'power4.out'
      });
      gsap.to(this.$refs.pointer, 0, {
        left: this.rawX,
        top: this.rawY - this.$refs.pointer.clientHeight / 2 + (this.isCarouselPage ? 0 : window.scrollY),
        ease: 'power4.out'
      });
    },
    addScrollToPointer() {
      /* gsap.to(this.$refs.circleRef, 0, {
        top: window.innerHeight / 2 + window.scrollY,
      });
      gsap.to(this.$refs.pointer, 0, {
        top: window.innerHeight / 2 + window.scrollY,
      }); */
    }
  },
  computed: {
    isCarouselPage() {
      return this.$route.path === '/carousel';
    }
  }
}
</script>
