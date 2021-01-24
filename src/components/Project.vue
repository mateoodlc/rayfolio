<template>
    <transition @enter="enter" @leave="leave" appear>
        <div class="project outer-pad" ref="projectRef">
            <div class="view-wave view-wave--project" ref="wave"></div>
            <div class="project__hero">
                <div class="project__hero__title">
                    <div class="h1 project__hero__titlle-marker">
                        <span class="bordered-heading">0</span>
                        <span class="bordered-heading">1</span>
                    </div>
                    <h1 ref="projectTitleRef">Big Ass {{data.name}}</h1>
                </div>
                <div class="project__hero__image" ref="heroImageRef"></div>
                <div class="project__hero__description">
                    <p ref="descriptionRef"></p>
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
            <router-link to="/carousel" class="back-button">
            <span ref="backRef">back</span></router-link>
        </div>
    </transition>
</template>

<script>
import gsap from 'gsap';

import animationsVue from '../mixins/animations.vue';
/* import hasHistory from '../mixins/hasHistory'; */
import hasHistoryVue from '../mixins/hasHistory.vue';
import textLinesAnimationVue from '../mixins/textLinesAnimation.vue';
export default {
    name: 'project',
    props: {
        data: Object,
        type: Object
    },
    mixins: [animationsVue, hasHistoryVue, textLinesAnimationVue],
    methods: {
        enter(el, done) {
            const {descriptionRef, heroImageRef, wave, projectTitleRef, backRef} = this.$refs;
            this.enterTransitionY(wave, 'bottom', 0, done);
            this.enterTransitionX(heroImageRef, 'right', 1, done)
            gsap.to('span.bordered-heading', 0.5, {translateY: '0', opacity: 1, stagger: 0.1, delay: 1});
            gsap.fromTo(projectTitleRef, 0.5, {translateY: '100%', opacity: 0}, {translateY: 0, opacity: 1, delay: 1.2, ease: 'power3.inOut'});
            gsap.from(backRef, 0.5, {translateY: '100%', opacity: 0, delay: 0.9, ease: 'power3.inOut'});
            this.animateTextLines(this.data.description, descriptionRef, 1.6);
            console.log('component entered');
            done();
        },
        leave(el, done) {
            this.leaveTransitionY(this.$refs.wave, 'bottom', 0, done);
            console.log('leave');
        }
    },
    mounted() {
        if (!this.data) {
            this.$router.push('/')
        }
        /* enterTransition(this.$refs.projectRef, 'top').play(); */
    }
}
</script>