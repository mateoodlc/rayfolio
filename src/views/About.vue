<template>
    <transition @enter="enter" @leave="leave" appear>
      <div>
        <div class="about">
          <div class="view-wave" ref="wave"></div>
          <div class="about__main-container max-bound outer-pad" ref="aboutContainerRef">
            <router-link to="/" class="back-button">
              <span ref="backRef">back</span>
            </router-link>
            <div class="about__hero">
              <h2 ref="aboutTitle">Hello!</h2>
              <div class="content__description" v-show="isMobile">
                <p ref="descriptionRef__mobile"></p>
              </div>
              <div class="about__image" ref="imageRef"></div>
              <div class="about__inspirational-phrase">
                <blockquote ref="blockquoteRef"></blockquote>
                <cite ref="citeRef"></cite>
              </div>
            </div>
            <div class="about__content outer-pad outer-pad--large" ref="aboutContentRef">
              <div class="content__description" v-show="!isMobile">
                <p ref="descriptionRef__desktop" ></p>
              </div>
              <div class="about__me">
                <div class="silc-grid">
                  <div class="silc-grid__col silc-grid__col--6-1000 about__me-title"><h3 ref="contentTitleRef">Hobbies</h3></div>
                  <div class="silc-grid__col silc-grid__col--6-1000">
                    <div class="silc-grid">
                      <div class="silc-grid__col silc-grid__col--6-1000">
                        <ul class="about__me__item-list">
                          <li>Painting</li>
                        </ul>
                      </div>
                      <div class="silc-grid__col silc-grid__col--6-1000">
                        <ul class="about__me__item-list about__me__item-list--strong">
                          <li>Painting</li>
                        </ul>
                      </div>
                    </div>
                  </div>
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
export default {
    data() {
      return {
        mainTimeline: gsap.timeline({paused: true}),
        quote: "&quot;You musn't be afraid\nto dream a little bigger,\ndarling.&quot;",
        cite: "&mdash; Christopher Nolan,\nInception",
        description: "My name is <strong>Raymi Farinango</strong>. I'm a UI &amp;\nMotion Designer based in Colombia in love\nwith motion graphics, beautiful interfaces\nand animated interactions.",
        windowWidth: window.innerWidth,
      }
    },
    mixins: [animations, hasHistoryVue, textLinesAnimationVue, textCharAnimationsVue, sectionCatcherVue],
    mounted() {
      console.log(data);
      this.addScrollEvent(this.$refs.aboutContentRef, this.onScrollAnimate);
      window.addEventListener('resize', () => {
        this.windowWidth = window.innerWidth;
      })
    },
    methods: {
      leave(el, done) {
        const {wave, aboutContainerRef} = this.$refs
        this.leaveTransitionY(wave, 'bottom', 0.6, done);
        gsap.to(aboutContainerRef, 0.5, {opacity: 0, delay: 0.5});
      },
      enter(el, done) {
        const {wave, descriptionRef__mobile, aboutContainerRef} = this.$refs;
        console.log(this.$refs);
        this.setEntryTimeline();
        this.enterTransitionY(wave, 'bottom', 0, done);
        this.animateTextLines(this.description, descriptionRef__mobile, 1.5);
        gsap.from(aboutContainerRef, 0.1, {opacity: 0, delay: 1})
        this.mainTimeline.play();
      },
      setEntryTimeline() {
        const {imageRef, aboutTitle, blockquoteRef, citeRef} = this.$refs;
        this.mainTimeline.add([
          !this.isMobile ?
          (gsap.fromTo(imageRef, 0.9, {scaleY: 0}, {scaleY: 1, delay: 0.8, ease: 'power4.inOut'}),
          gsap.from(aboutTitle, 0.8, {x: '400px', delay: 1.1}),
          gsap.from(aboutTitle, 0.6, {y: '100px', opacity: 0, delay: 0.9})) : this.breakAllTitles(aboutTitle, 0.9),
          this.animateTextLines(this.quote, blockquoteRef, 1),
          this.animateTextLines(this.cite, citeRef, 1.5),
        ]);
      },
      onScrollAnimate() {
        const {descriptionRef__desktop, contentTitleRef} = this.$refs
        this.animateTextLines(this.description, descriptionRef__desktop, 0.5);
        gsap.to(contentTitleRef, 0.6, {opacity: 1, y: '0', delay: 1, ease: 'power2.out'});
        gsap.to('li', 0.6, {opacity: 1, y: '0px', delay: 1.5, stagger: 0.1, ease: 'power2.out'});
      },
    },
    computed: {
      isMobile() {
        return this.windowWidth < 900;
      }
    }
}
</script>