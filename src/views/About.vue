<template>
    <transition @enter="enter" @leave="leave" appear>
      <div>
        <div class="about">
          <div class="view-wave" ref="wave"></div>
          <div class="about__main-container max-bound" ref="aboutContainer">
            <button @click="hasHistory() ? $router.go(-1) : $router.push('/')" class="back-button" to="/">back</button>
            <div class="about__hero">
              <h2 ref="aboutTitle">Hello!</h2>
              <div class="about__image" ref="imageRef"></div>
              <div class="about__inspirational-phrase">
                <blockquote ref="blockquoteRef"></blockquote>
                <cite ref="citeRef"></cite>
              </div>
            </div>
            <div class="about__content outer-pad outer-pad--large" ref="aboutContentRef">
              <div class="content__description">
                <p ref="descriptionRef"></p>
              </div>
              <div class="about__me">
                <div class="silc-grid">
                  <div class="silc-grid__col silc-grid__col--4-1200"><h3 ref="contentTitleRef">Hobbies</h3></div>
                  <div class="silc-grid__col silc-grid__col--4-1200">
                    <ul class="about__me__item-list">
                      <li>Painting</li>
                      <li>Dancing</li>
                      <li>Volleyball</li>
                      <li>Videogames</li>
                      <li>Trekking</li>
                    </ul>
                  </div>
                  <div class="silc-grid__col silc-grid__col--4-1200">
                    <ul class="about__me__item-list about__me__item-list--strong">
                      <li>Painting</li>
                      <li>Dancing</li>
                      <li>Volleyball</li>
                      <li>Videogames</li>
                      <li>Trekking</li>
                    </ul>
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
export default {
    data() {
      return {
        mainTimeline: gsap.timeline({paused: true}),
        quote: "&quot;You musn't be afraid\nto dream a little bigger,\ndarling.&quot;",
        cite: "&mdash; Christopher Nolan,\nInception",
        description: "My name is <strong>Raymi Farinango</strong>. I'm a UI &amp;\nMotion Designer based in Colombia in love\nwith motion graphics, beautiful interfaces\nand animated interactions."
      }
    },
    mixins: [animations, hasHistoryVue, textLinesAnimationVue, sectionCatcherVue],
    mounted() {
      this.addScrollEvent(this.$refs.aboutContentRef, this.onScrollAnimate)
    },
    methods: {
      leave(el, done) {
        this.leaveTransitionY(this.$refs.wave, 'bottom', 0.4, done);
        this.leaveTransitionY(this.$refs.imageRef, 'bottom', 0, done);
      },
      enter(el, done) {
        this.setEntryTimeline();
        this.enterTransitionY(this.$refs.wave, 'bottom', 0, done);
        this.mainTimeline.play();
      },
      setEntryTimeline() {
        const {imageRef, aboutContainer, aboutTitle, blockquoteRef, citeRef} = this.$refs;
        this.mainTimeline.add([
          gsap.fromTo(imageRef, 0.9, {scaleY: 0}, {scaleY: 1, delay: 0.8, ease: 'power4.inOut'}),
          gsap.fromTo(aboutContainer, 1, {y: '200px'}, {y: '0px', delay: 0.7}),
          gsap.fromTo(aboutContainer, 0.6, {opacity: 0}, {opacity: 1, delay: 0.7}),
          gsap.fromTo(aboutTitle, 0.8, {x: '400px'}, {x: '0px', delay: 0.9}),
          gsap.fromTo(aboutTitle, 0.6, {y: '50px'}, {y: '0px', delay: 0.7}),
          this.animateTextLines(this.quote, blockquoteRef, 1),
          this.animateTextLines(this.cite, citeRef, 1.5),
        ]);
      },
      onScrollAnimate() {
        console.log('executing');
        const {descriptionRef, contentTitleRef} = this.$refs
        this.animateTextLines(this.description, descriptionRef, 1.5);
        gsap.to(contentTitleRef, 0.6, {opacity: 1, y: '20px', delay: 2, ease: 'power2.out'});
        gsap.to('li', 0.6, {opacity: 1, y: '20px', delay: 2, stagger: 0.1, ease: 'power2.out'});
      },
      triggerScrollCatcher() {
      }
    }
}
</script>