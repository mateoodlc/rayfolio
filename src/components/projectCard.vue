<template>
<keep-alive>
  <router-link :to="`/`" class="carousel__element">
    <div class="carousel__element-title">
      <span class="carousel__element-subtitle">{{this.getData.subtitle}}</span>
      <div class="h1 h1--dark">{{this.getData.title}}
        <span class="carouel__element-title__line"></span>
      </div>
    </div>
    <div class="carousel__element-image">
      <h3 class="carousel__element-number">01</h3>
    </div>
  </router-link>
</keep-alive>
</template>

<script>
export default {
  name: 'project-card',
  props: {
    projectData: {
      type: Array,
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
    console.log(this.$props.projectData)
  },
}
</script>

<style>

</style>