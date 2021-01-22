<template>
<div class="project max-bound outer-pad" ref="projectRef">
    <button @click="hasHistory() ? $router.go(-1) : $router.push('/')" class="back-button" to="/">back</button>
    <div class="project__hero">
        <h1 class="project__hero__title"><span class="bordered-heading">01</span>Big Ass {{$route.params.projectName}}</h1>
        <div class="project__hero__image"></div>
        <div class="project__hero__description">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p>
        </div>
    </div>      
    <div class="project__content">
        <div class="project__content__image"></div>
        <div class="project__content__image"></div>
        <div class="project__content__image"></div>
    </div>
    <button class="project__inner-navigation">
        <h1 class="bordered-heading">Next Project</h1>
    </button>
</div>
</template>

<script>

/* import { enterTransition } from "../animations/routerTransition"; */
export default {
    name: 'project',
    mounted() {
        /* enterTransition(this.$refs.projectRef, 'top').play(); */
    }
}
</script>