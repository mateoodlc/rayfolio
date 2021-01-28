<template>
    <transition @enter="enter" @leave="leave" appear>
        <div class="project outer-pad" ref="projectRef">
            <div class="view-wave view-wave--project" ref="wave"></div>
            <div class="project__inner-wrapper max-bound max-bound--project" ref="projectContentWrapperRef">
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
                    <div class="project__hero__image" ref="heroImageRef"></div>
                </div>      
                <div class="project__content">
                    <div class="project__content__image">
                        <span class="image-size"></span>
                        <div class="image"></div>
                    </div>
                    <div class="project__content__image">
                        <span class="image-size"></span>
                        <div class="image"></div>
                    </div>
                    <div class="project__content__image">
                        <span class="image-size"></span>
                        <div class="image"></div>
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
            imageElements: undefined
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
            console.log('leaving');
            gsap.to(this.$refs.projectContentWrapperRef, 0.3, {opacity: 0});
            this.leaveTransitionY(this.$refs.wave, 'bottom', 0.2, done);
        },
        leaveAnimation() {
            gsap.to(this.$refs.projectContentWrapperRef, 0.1, {opacity: 0});
        },
        entryAnimation() {
            gsap.to(this.$refs.projectContentWrapperRef, 0, {opacity: 1});
            const {descriptionRef, heroImageRef, projectTitleRef, backRef} = this.$refs;
            this.enterTransitionX(heroImageRef, 'right', 1, ''),
            gsap.from([this.$refs.number1, this.$refs.number2], 0.5, {translateY: '1.25rem', opacity: 0, stagger: 0.1, delay: 1}),
            gsap.from(projectTitleRef, 0.5, {translateY: '100%', opacity: 0, delay: 1.2, ease: 'power3.inOut'}),
            gsap.from(backRef, 0.5, {translateY: '100%', opacity: 0, delay: 0.9, ease: 'power3.inOut'}),
            this.animateTextLines(this.computedData.description, descriptionRef, 1.6);
        },
        goToNext() {
            console.log(this.$router.history.current.params.name);
            this.$router.push(this.returnNextPage).catch(err => {
                    // Ignore the vuex err regarding  navigating to the page they are already on.
                if (err.name !== 'NavigationDuplicated' && !err.message.includes('Avoided redundant navigation to current location')) {
                    // But print any other errors to the console
                }
            });
        },
        scrollToTop() {
            window.scrollTo(0, 0);
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
            const projectsFinished = currentId + 1 > data.length;
            if (projectsFinished) {
                console.log('shouldRespond')
                return data[0].name;
            }
            const nextPageId = currentId + 1;
            const nextPage = data.filter((element) => {
                return element.id === nextPageId;
            })[0];
            return nextPage.name;
        }
    },
    watch: {
        currentName() {
            console.log(this.$route.params.name);
            this.leaveAnimation();
            setTimeout(() => {
                this.entryAnimation();
                window.scrollTo({top: 0});
            }, 250)
        }
    },
    mounted() {
        this.imageElements = document.querySelectorAll('.image');
        this.addScrollEvent(this.imageElements, (element) => {
            gsap.from(element, 10, {webkitClipPath: 'inset(50% 0% 0%)',
            clipPath: 'inset(50% 0% 0%)'})
        });
    }
}
</script>