<script>
    import { gsap } from 'gsap';
  export default {
    methods: {
      enterTransitionX (element, origin, delay, onCompleteParam) {
        element.style.transformOrigin = origin;
        const tween = gsap.from(element, 1.5, {x: origin === 'left' ? '-101%' : '101%', delay: delay, ease: 'expo.inOut', onComplete: onCompleteParam});
        return tween;
      },
      leaveTransitionX (element, origin, delay, onCompleteParam) {
        element.style.transformOrigin = origin;
        const tween = gsap.to(element, 1.5, {x: origin === 'left' ? '-101%' : '101%', delay: delay, ease: 'expo.inOut', onComplete: onCompleteParam});
        return tween;
      },
      enterTransitionY (element, origin, delay, onCompleteParam) {
        element.style.transformOrigin = origin;
        const tween = gsap.from(element, 1.5, {y: '101%', delay: delay, ease: 'expo.inOut', onComplete: onCompleteParam});
        return tween;
      },
      leaveTransitionY (element, origin, delay, onCompleteParam) {
        element.style.transformOrigin = origin;
        const tween = gsap.to(element, 1.5, {y: '101%', delay: delay, ease: 'expo.inOut', onComplete: onCompleteParam});
        return tween;
      },
      slideInX (element, origin, delay, onCompleteParam) {
        element.style.transformOrigin = origin;
        const tween = gsap.from(element, 1.5, {height: '0', delay: delay, ease: 'expo.inOut', onComplete: onCompleteParam});
        return tween;
      },
    }
  }
</script>