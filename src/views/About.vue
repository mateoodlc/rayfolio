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
                <blockquote>"You musn't be afraid to dream a little bigger, darling."</blockquote>
                <cite>&mdash; Christopher Nolan, Inception</cite>
              </div>
            </div>
            <div class="about__content outer-pad outer-pad--large">
              <div class="content__description">
                <p>My name is <strong>Raymi Farinango</strong>. I'm a UI &amp; Motion Designer based in Colombia in love with motion graphics, beautiful interfaces and animated interactions.</p>
              </div>
              <div class="about__me">
                <div class="silc-grid">
                  <div class="silc-grid__col silc-grid__col--4-1200"><h3>Hobbies</h3></div>
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
export default {
    mixins: [animations, hasHistoryVue],
    methods: {
      leave(el, done) {
        this.leaveTransitionY(this.$refs.wave, 'bottom', 0.4, done);
        this.leaveTransitionY(this.$refs.imageRef, 'bottom', 0, done);
      },
      enter(el, done) {
        this.enterTransitionY(this.$refs.wave, 'bottom', 0, done);
        gsap.fromTo(this.$refs.imageRef, 0.9, {scaleY: 0}, {scaleY: 1, delay: 0.8, ease: 'power4.inOut'})
        gsap.fromTo(this.$refs.aboutContainer, 1, {y: '200px'}, {y: '0px', delay: 0.7})
        gsap.fromTo(this.$refs.aboutContainer, 0.6, {opacity: 0}, {opacity: 1, delay: 0.7});
        gsap.fromTo(this.$refs.aboutTitle, 0.8, {x: '400px'}, {x: '0px', delay: 0.9});
        gsap.fromTo(this.$refs.aboutTitle, 0.6, {y: '50px'}, {y: '0px', delay: 0.7});
      }
    }
}
</script>