<script>
import debounce from 'lodash.debounce';
import gsap from 'gsap';
import textLinesAnimationVue from './textLinesAnimation.vue';
export default {
  data() {
    return {
      isScrolled: false,
      fadesStaggered: false
    }
  },
  methods: {
    sectionCatcher: debounce(function(elements, callBack) {
      if (elements.length > 1) {
        elements.forEach(element => {
          const elementTop = this.getOffset(element);
          if (window.scrollY > elementTop - window.innerHeight / 1.2) {
            if (!element.classList.contains('scrolled')) {
              element.classList.add('scrolled');
            }
          }
        });
      } else {
        const elementTop = this.getOffset(elements);
          if (window.scrollY > elementTop - window.innerHeight / 1.2) {
            if (!this.isScrolled) {
              callBack();
              this.isScrolled = true;
            }
          }
      }
    }, 50),
    staggerFades: debounce(function(elements, callBack) {
      elements.forEach((item) => {
        const {element, state} = item;
        const elementTop = this.getOffset(element);
        if (window.scrollY > elementTop - window.innerHeight / 1.2) {
          if (!state) {
            console.log('hi');
            this.animateLists(item, callBack);
          }
        }
      });  
    }), 
    animateLists(elementObj, callBack) {
      const {element} = elementObj
      const isDescription = element.classList.contains('content__description');
        const listElement = element.querySelectorAll('li');
        const titleElement = element.querySelector('h3');
        if (isDescription) {
          callBack();
          elementObj.state = true;
        } else {
          gsap.to([titleElement, listElement], 0.4, {y: '0', opacity: 1, scaleY: '1', delay: 0.2, ease: 'power2.inOut', stagger: 0.1});
          elementObj.state = true;
        }
      },
    getOffset(element) {
      const rect = element.getBoundingClientRect();
      return rect.top + window.scrollY;
    }
  },
  mixins: [textLinesAnimationVue]
}
</script>