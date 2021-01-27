<script>
import debounce from 'lodash.debounce';
export default {
  data() {
    return {
      isScrolled: false,
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
          } else if (window.scrollY == 0) {
            element.classList.remove('scrolled');
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
    addScrollEvent(elements, callBack) {
      window.addEventListener("scroll", () => {
        this.sectionCatcher(elements, callBack);
      });
    },
    getOffset(element) {
      const rect = element.getBoundingClientRect();
      return rect.top + window.scrollY;
    }
  }
}
</script>