<script>
    import { gsap } from 'gsap';
  export default {
    methods: {
      enterTransitionX (element, origin, delay, onCompleteParam) {
        element.style.transformOrigin = origin;
        const tween = gsap.from(element, 1.2, {scaleX: 0, delay: delay, ease: 'power3.inOut', onComplete: onCompleteParam});
        return tween;
      },
      leaveTransitionX (element, origin, delay, onCompleteParam) {
        element.style.transformOrigin = origin;
        const tween = gsap.to(element, 1.2, {scaleX: 0, delay: delay, ease: 'power3.inOut', onComplete: onCompleteParam});
        return tween;
      },
      enterTransitionY (element, origin, delay, onCompleteParam) {
        element.style.transformOrigin = origin;
        const tween = gsap.from(element, 1.2, {scaleY: 0, delay: delay, ease: 'power3.inOut', onComplete: onCompleteParam});
        return tween;
      },
      leaveTransitionY (element, origin, delay, onCompleteParam) {
        element.style.transformOrigin = origin;
        const tween = gsap.to(element, 1.2, {scaleY: 0, delay: delay, ease: 'power3.inOut', onComplete: onCompleteParam});
        return tween;
      }
    }
  }
</script>