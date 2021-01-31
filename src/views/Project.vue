<template>
    <transition @enter="enter" @leave="leave" appear>
        <div class="project outer-pad" ref="projectRef">
            <div class="view-wave view-wave--project" ref="wave"></div>
            <div class="project__wrapper max-bound max-bound--project">
                <div class="project__inner-wrapper" ref="projectContentWrapperRef">
                    <div class="project__hero">
                        <div class="project__hero__text-content">
                            <div class="project__hero__title">
                                <div class="h1 project__hero__title-marker" ref="heroTitleMarkerRef">
                                    <span class="bordered-heading" ref="number1">0</span>
                                    <span class="bordered-heading" ref="number2">1</span>
                                </div>
                                <h1 ref="projectTitleRef">Big Ass {{this.computedData ? this.computedData.name : ''}}</h1>
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
            tl: gsap.timeline({delay: 0.5}),
            imageElements: undefined,
            publicPath: 'https://mateoodlc.github.io/assets/'
        }
    },
    mixins: [animationsVue, hasHistoryVue, textLinesAnimationVue, sectionCatcher],
    methods: {
        enter(el, done) {
            gsap.from(this.$refs.wave, 1, {scaleY: 0, delay: 0, ease: 'power3.out'}),
            this.entryAnimation();
            done();
        },
        leave(el, done) {
            gsap.to(this.$refs.projectContentWrapperRef, 0.3, {opacity: 0});
            this.leaveTransitionY(this.$refs.wave, 'bottom', 0.2, done);
        },
        leaveAnimation() {
            gsap.to(this.$refs.projectContentWrapperRef, 0.1, {opacity: 0});
        },
        entryAnimation() {
            const {descriptionRef, heroImageRef, heroImageWrapperRef, projectTitleRef, backRef, number1, number2, projectContentWrapperRef} = this.$refs;
            gsap.to(projectContentWrapperRef, 0, {opacity: 1});
            if (this.isMobile) {
                gsap.from(heroImageRef, 1, {opacity: 0, delay: 1})
            } else {
                gsap.from(heroImageRef, 1, {xPercent: -101, delay: 1, ease: 'expo.inOut'})
                gsap.from(heroImageWrapperRef, 1, {xPercent: 101, delay: 1, ease: 'expo.inOut'})
            }
            gsap.from([number1, number2], 0.5, {translateY: '1.25rem', opacity: 0, stagger: 0.1, delay: 1}),
            gsap.from(projectTitleRef, 0.5, {translateY: '100%', opacity: 0, delay: 1.2, ease: 'power3.inOut'}),
            gsap.from(backRef, 0.5, {translateY: '100%', opacity: 0, delay: 0.9, ease: 'power3.inOut'}),
            this.animateTextLines(this.computedData.description, descriptionRef, 1.6);
        },
        goToNext() {
            this.$router.push(this.returnNextPage).catch(err => {
                if (err.name !== 'NavigationDuplicated' && !err.message.includes('Avoided redundant navigation to current location')) {
                    // But print any other errors to the console
                }
            });
        },
        scrollToTop() {
            document.body.scrollTop = 0;
        },
        addScrolledClass(element) {
            console.log(element)
            if (!element.classList.contains('scrolled')) element.classList.add('scrolled');
        }
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
            console.log(currentId)
            if (projectsFinished) {
                console.log(data.projects)
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
            this.imageElements.forEach(element => {
                if (element.classList.contains('scrolled')) element.classList.remove('scrolled');
            });
            this.leaveAnimation();
            setTimeout(() => {
                this.entryAnimation();
                window.scrollTo({top: 0});
            }, 250)
        }
    },
    mounted() {
        this.imageElements = document.querySelectorAll('.image');
        window.addEventListener("scroll", () => {
            this.sectionCatcher(this.imageElements);
        })
    }
}
</script>