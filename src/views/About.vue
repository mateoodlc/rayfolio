<template>
    <transition @enter="enter" @leave="leave" appear>
      <div>
          <div class="view-wave" style="position: fixed" ref="wave"></div>
        <div class="about">
          <div class="about__main-container max-bound outer-pad" ref="aboutContainerRef">
            <router-link to="/" class="back-button">
              <span ref="backRef">back</span>
            </router-link>
            <div class="about__hero">
              <h2 ref="aboutTitle">Hello!</h2>
              <div class="content__description" v-show="isMobile">
                <p ref="descriptionRef__mobile"></p>
              </div>
              <div class="about__image">
                <img src="../assets/about.jpg" ref="imageRef" alt="" srcset="">
              </div>
              <div class="about__inspirational-phrase">
                <blockquote ref="blockquoteRef"></blockquote>
                <cite ref="citeRef"></cite>
              </div>
            </div>
            <div class="about__content outer-pad outer-pad--large" ref="aboutContentRef">
              <div class="content__description scrollable" v-show="!isMobile">
                <p ref="descriptionRef__desktop" ></p>
              </div>
              <div class="about__me">
                <div class="about__me__items scrollable scrollable">
                  <div class="about__me-title"><h3 ref="contentTitleRef">Hobbies</h3></div>
                  <div class="about__me-items">
                    <ul class="about__me__item-list">
                      <li v-for="(aboutItem, key, index) in hobbies" :key="key" :index="index">{{aboutItem}}</li>
                    </ul>
                  </div>
                </div>
                <div class="about__me__items scrollable" ref="experienceListRef">
                  <div class="about__me-title"><h3 ref="experienceTitleRef">Experience</h3></div>
                  <div class="about__me__items-wrapper">
                    <ul class="about__me__item-list about__me__item-list__experience">
                      <li v-for="(experienceItem, key, index) in experienceData" :key="key" :index="index">
                        <p class="about__me-experience__company">{{key}}</p>
                        <p class="about__me-experience__role">{{experienceItem}}</p>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="about__me__items scrollable">
                  <div class="about__me-title"><h3>Find me on</h3></div>
                  <ul class="about__me__item-list">
                    <li class="social"><strong>Behance</strong></li>
                    <li class="social"><strong>Dribbble</strong></li>
                    <li class="social"><strong>Instagram</strong></li>
                  </ul>
                </div>
                <div class="about__me__items scrollable">
                  <div class="about__me-title"><h3>Contact</h3></div>
                  <ul class="about__me__item-list">
                    <li><strong>Email: </strong>raymi.fc@gmail.com</li>
                    <li><strong>Cell: </strong>(+57) 314 777 5799</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  </transition>
</template>


<script>
import gsap from 'gsap';
import animations from "../mixins/animations";
import hasHistoryVue from '../mixins/hasHistory.vue';
import textLinesAnimationVue from '../mixins/textLinesAnimation.vue';
import sectionCatcherVue from '../mixins/sectionCatcher.vue';
import textCharAnimationsVue from '../mixins/textCharAnimations.vue';
import data from "../data.json";
import isMobileVue from '../mixins/isMobile.vue';
export default {
    data() {
      return {
        mainTimeline: gsap.timeline({paused: true}),
        quote: "&quot;You musn't be afraid\nto dream a little bigger,\ndarling.&quot;",
        cite: "&mdash; Christopher Nolan,\nInception",
        description: "My name is <strong>Raymi Farinango</strong>. I'm a UI &amp;\nMotion Designer based in Colombia in love\nwith motion graphics, beautiful interfaces\nand animated interactions.",
        windowWidth: window.innerWidth,
        hobbies: data.aboutContent[0].hobbies,
        experienceData: data.aboutContent[1].experience,
        scrollableElements: undefined
      }
    },
    mixins: [animations, hasHistoryVue, textLinesAnimationVue, textCharAnimationsVue, sectionCatcherVue, isMobileVue],
    mounted() {
      console.log(this.isMobile);
      this.scrollableElements = Array.from(document.querySelectorAll('.scrollable')).map((element) => {
        return {element, state: false}
      });
      this.addScrollEvent(this.scrollableElements);
      window.addEventListener('resize', () => {
        this.windowWidth = window.innerWidth;
      })
    },
    methods: {
      leave(el, done) {
        const {wave, aboutContainerRef} = this.$refs
        this.leaveTransitionY(wave, 'bottom', 0.1, done);
        gsap.to(aboutContainerRef, 0.2, {opacity: 0, delay: 0});
      },
      enter(el, done) {
        const {wave} = this.$refs;
        this.mainTimeline.add(
          [
            this.enterTransitionY(wave, 'bottom', 0, done),
            ...this.setEntryTimeline(),
          ]  
        )
        this.mainTimeline.play()
      },
      setEntryTimeline() {
        const {imageRef, aboutTitle, blockquoteRef, citeRef, descriptionRef__mobile, aboutContainerRef, backRef} = this.$refs;
          return [
          gsap.from(aboutContainerRef, 0, {opacity: 0, delay: 0.6}),
          gsap.from(backRef, 0.5, {y: '100px', opacity: 0, delay: 1.5}),
          gsap.from(imageRef, 0.9, {y: '100%', delay: 0.8, ease: 'power4.inOut'}),
          this.breakAllTitles(aboutTitle, 1),
          this.isMobile ? this.animateTextLines(this.description, descriptionRef__mobile, 1) : '',
          this.animateTextLines(this.quote, blockquoteRef, 1),
          this.animateTextLines(this.cite, citeRef, 1.5),
        ];
      },
      onScrollAnimate() {
        const {descriptionRef__desktop} = this.$refs
        this.animateTextLines(this.description, descriptionRef__desktop, 0.5);
      },
      addScrollEvent(elements) {
        window.addEventListener("scroll", () => {
            this.staggerFades(elements, this.onScrollAnimate);
        });
      },
    },
}
</script>