<template>
    <transition @enter="enter" @leave="leave" appear>
        <div class="project" ref="projectRef">
            <div class="project__wrapper outer-pad outer-pad--large max-bound--project" ref="projectWrapperRef" id="projectWrapperId">
                <div class="project__inner-wrapper" ref="projectContentWrapperRef">
                    <div class="project__hero">
                        <div class="project__hero__text-content">
                            <div class="project__hero__title">
                                <div class="h1 project__hero__title-marker" ref="heroTitleMarkerRef">
                                    <span class="bordered-heading" ref="number1">0</span>
                                    <span class="bordered-heading" ref="number2">{{this.computedData.id}}</span>
                                </div>
                                <h1 ref="projectTitleRef">{{this.computedData.title}}</h1>
                            </div>
                            <div class="project__hero__description">
                                <p ref="descriptionRef"></p>
                            </div>
                        </div>
                        <div class="project__hero__image" ref="heroImageWrapperRef">
                            <img :src="`${publicPath}${this.computedData.mainImage}`" alt="" ref="heroImageRef">
                        </div>
                    </div>      
                    <div class="project__content">
                        <div class="project__content__image" v-for="(image, key, index) in this.computedData.images" :key="key" :index="index" ref="projectImageWrapperRef">
                            <span class="image-size"></span>
                            <div class="image">
                                <img :src="`${publicPath}${image}`" alt="">
                            </div>
                        </div>
                    </div>
                    <button @click="goToNext" class="project__inner-navigation">
                        <h1 class="bordered-heading">Next Project</h1>
                    </button>
                    <router-link to="/carousel" class="back-button">
                        <span ref="backRef">back</span>
                    </router-link>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import gsap from 'gsap';

import animationsVue from '../mixins/animations.vue';
import hasHistoryVue from '../mixins/hasHistory.vue';
import textLinesAnimationVue from '../mixins/textLinesAnimation.vue';
import sectionCatcher from '../mixins/sectionCatcher.vue';
import data from '../data.json'
export default {
    name: 'project',
    props: {
        data: Object,
        type: Object
    },
    data() {
        return {
            tl: undefined,
            imageElements: undefined,
            publicPath: 'https://mateoodlc.github.io/assets/'
        }
    },
    mixins: [animationsVue, hasHistoryVue, textLinesAnimationVue, sectionCatcher],
    methods: {
        enter(el, done) {
            this.tl = gsap.timeline({onComplete: done}).add(this.entryAnimation(false))
        },
        leave(el, done) {
            this.leaveAnimation(done)
        },
        leaveAnimation(done) {
            const {projectWrapperRef, projectRef, projectContentWrapperRef} = this.$refs;
            gsap.to(projectContentWrapperRef, 0.1, {opacity: 0});
            gsap.to(projectRef, 1.5, {yPercent: 101, delay: 0.3, ease: 'expo.inOut'});
            gsap.to(projectWrapperRef, 1.5, {yPercent: -101, delay: 0.3, ease: 'expo.inOut', onComplete: done});
        },
        entryAnimation(navigating) {
            const {descriptionRef, heroImageRef, heroImageWrapperRef, projectTitleRef, backRef, number1, number2, projectWrapperRef, projectContentWrapperRef, projectRef} = this.$refs;
            gsap.to(projectContentWrapperRef, 0.2, {opacity: 1})
            let heroImageTween = [
                this.isMobile ? gsap.from(heroImageRef, 1, {opacity: 0, delay: 1.5}) :
                gsap.from(heroImageRef, 1.5, {xPercent: -101, delay: 1, ease: 'expo.inOut'}),
                gsap.from(heroImageWrapperRef, 1.5, {xPercent: 101, delay: 1, ease: 'expo.inOut'})
            ]
            const tl = gsap.timeline({}).add([
                !navigating ? gsap.from(projectRef, 1.5, {y: '101vh', delay: 0, ease: 'expo.inOut'}) : '',
                !navigating ? gsap.from(projectWrapperRef, 1.5, {y: '-101vh', delay: 0, ease: 'expo.inOut'}) : '',
                gsap.from([number1, number2], 0.5, {y: '1.25rem', opacity: 0, stagger: 0.1, delay: 1}),
                heroImageTween,
                gsap.fromTo(projectTitleRef, 0.5, {y: '100%', opacity: 0}, {y: '0', opacity: 1, delay: 1.2, ease: 'power3.inOut'}),
                gsap.from(backRef, 0.5, {y: '100%', opacity: 0, delay: 0.9, ease: 'power3.inOut'}),
                this.animateTextLines(this.computedData.description, descriptionRef, 1.6)
            ])
            return tl;
        },
        nextProjectTransition(callback) {
            return gsap.to(this.$refs.projectContentWrapperRef, 0.1, {opacity: 0, onComplete: callback})
        },
        goToNext() {
            const navigate = () => this.$router.push(this.returnNextPage).catch(err => {
                if (err.name !== 'NavigationDuplicated' && !err.message.includes('Avoided redundant navigation to current location')) {
                    // But print any other errors to the console
                }
            });
            this.nextProjectTransition(navigate);
            setTimeout(() => {
                this.imageElements.forEach(element => {
                    if (element.classList.contains('scrolled')) element.classList.remove('scrolled');
                });
                this.entryAnimation(true);
                window.scrollTo({top: 0});
            }, 250)
        },
    },
    computed: {
        computedData() {
            return data.projects.filter((element) => {
                return element.name === this.currentName;
            })[0];
        },
        currentName() {
            return this.$route.params.name;
        },
        returnNextPage() {
            const currentId = this.computedData.id;
            const projectsFinished = currentId + 1 > data.projects.length;
            if (projectsFinished) {
                return data.projects[0].name;
            }
            const nextPageId = currentId + 1;
            const nextPage = data.projects.filter((element) => {
                return element.id === nextPageId;
            })[0];
            return nextPage.name;
        },
    },
    watch: {
        currentName() {

        }
    },
    mounted() {
        this.imageElements = document.querySelectorAll('.image');
        window.addEventListener("scroll", () => {
            this.sectionCatcher(this.imageElements);
        })
    },
}
</script>