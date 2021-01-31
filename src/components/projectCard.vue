<template>
  <router-link :to="{name: 'Project', params: {name: getData.name, data: getData}}" class="carousel__element" ref="carouselElement">
    <div class="carousel__element-title">
      <div class="carousel__element-subtitle__inner-wrapper">
        <div class="masked-animation__wrapper">
          <span class="carousel__element-subtitle masked-animation__element" ref="subtitleRef">{{this.getData.subtitle}}
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
      <div class="carousel__element-image" ref="imageWrapperRef">
        <img :src="`${publicPath}${this.getData.mainImage}`" alt="" ref="imageRef">
      </div>
    </div>
    <div class="carousel__element-number__wrapper">
      <h3 class="carousel__element-number">
        <span class="masked-animation__element" ref="numberRef1">0</span>  
        <span class="masked-animation__element" ref="numberRef2">{{projectData.id}}</span>
      </h3>
    </div>
  </router-link>
</template>

<script>
import gsap from 'gsap'
import isMobileVue from '../mixins/isMobile.vue';
export default {
  name: 'projectCard',
  mixins: [isMobileVue],
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
      publicPath: 'https://mateoodlc.github.io/assets/'
    }
  },
  mounted() {
    const {imageRef, imageWrapperRef, lineRef, subtitleRef, titleRef, numberRef1, numberRef2} = this.$refs;
      gsap.from(imageRef, 1.5, {y: '100%', ease: 'power3.out', delay: 1})
      gsap.from(imageRef, 1.5, {yPercent: -101, delay: 1, ease: 'expo.inOut'})
      gsap.from(imageWrapperRef, 1.5, {yPercent: 101, delay: 1, ease: 'expo.inOut'})
      gsap.from(lineRef, 1.5, {scaleX: '0', ease: 'power3.out', delay: 1.3});
      gsap.from(subtitleRef, 1, {y: this.isMobile ? '150%' : '100%', ease: 'power3.out', delay: 1.8});
      gsap.from(titleRef, 1, {y: '-105%', ease: 'power3.out', delay: 1.8});
      gsap.from(numberRef1, 0.5, {opacity: 0, ease: 'power3.out', delay: 1.8});
      gsap.from(numberRef2, 0.5, {y: '10px', opacity: 0, ease: 'power3.out', delay: 2});
  },
}
</script>

<style>

</style>