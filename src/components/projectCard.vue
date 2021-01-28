<template>
  <router-link :to="{name: 'Project', params: {name: getData.name, data: getData}}" class="carousel__element" ref="carouselElement">
    <div class="carousel__element-title">
      <div class="carousel__element-subtitle__inner-wrapper">
        <div class="masked-animation__wrapper">
          <span class="carousel__element-subtitle masked-animation__element" ref="subtitleRef">{{this.getData.title}}
          </span>
        </div>
        <span class="carouel__element-title__line" ref="lineRef"></span>
      </div>
      <div class="masked-animation__wrapper">
        <div class="h1 h1--dark masked-animation__element" ref="titleRef">{{this.getData.title}}
        </div>
      </div>
    </div>
    <div class="carousel__element-image__wrapper">
      <div class="carousel__element-image" ref="imageRef">
      </div>
      <div class="carousel__element-number__wrapper">
        <h3 class="carousel__element-number">
          <span class="masked-animation__element" ref="numberRef1">0</span>  
          <span class="masked-animation__element" ref="numberRef2">1</span>
        </h3>
      </div>
    </div>
  </router-link>
</template>

<script>
import gsap from 'gsap'
export default {
  name: 'projectCard',
  props: {
    projectData: {
      type: Object,
      required: true
    },
    test: {
      type: String,
      required: false
    }
  },
  data() {
    return {
      getData: this.$props.projectData,
    }
  },
  mounted() {
    gsap.fromTo(this.$refs.imageRef, 1.5, {scaleY: 0}, {scaleY: 1, ease: 'power3.out', delay: 1});
    gsap.fromTo(this.$refs.lineRef, 1.5, {scaleX: '0'}, {scaleX: 1, ease: 'power3.out', delay: 1.3});
    gsap.from(this.$refs.subtitleRef, 1, {y: '120%', ease: 'power3.out', delay: 1.8});
    gsap.fromTo(this.$refs.titleRef, 1, {y: '-100%'}, {y: '0%', ease: 'power3.out', delay: 1.8});
    gsap.fromTo(this.$refs.numberRef1, 0.5, {opacity: 0}, {opacity: 1, ease: 'power3.out', delay: 1.8});
    gsap.fromTo(this.$refs.numberRef2, 0.5, {y: '10px', opacity: 0}, {y: '0', opacity: 1, ease: 'power3.out', delay: 2});
  },
}
</script>

<style>

</style>