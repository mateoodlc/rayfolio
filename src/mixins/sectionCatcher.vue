<script>
import debounce from 'lodash.debounce';
export default {
  data() {
    return {
      isScrolled: false,
    }
  },
  methods: {
    sectionCatcher: debounce(function(element, callBack) {
      const elementTop = this.getOffset(element);
      if (window.scrollY > elementTop - window.innerHeight / 1.2) {
        if (!this.isScrolled) {
          callBack();
          this.isScrolled = true;
        }
      }
    }, 50),
    addScrollEvent(element, callBack) {
      window.addEventListener("scroll", () => {
        this.sectionCatcher(element, callBack);
      });
    },
    getOffset(element) {
      const rect = element.getBoundingClientRect();
      return rect.top + window.scrollY;
    }
  }
}
</script>