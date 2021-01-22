/* eslint-disable no-unused-vars */
import { gsap } from 'gsap';

const animationEase = 'power4.inOut';

const horizontalTransition = (element, origin) => {
  element.style.transformOrigin = origin;
  const tween = gsap.fromTo(element, 2, {scaleX: 0}, { scaleX: 1, ease: animationEase });
  const tl = gsap.timeline({ paused: true });
  return tl.add(tween);
}

const verticalTransition = (element, origin, onCompleteParam) => {
  element.style.transformOrigin = origin;
  const tween = gsap.fromTo(element, 2, { scaleY: 0 }, { scaleY: 1, ease: animationEase });
  const tl = gsap.timeline({paused: true,  onComplete: onCompleteParam});
  return tl.add(tween);
}

export { horizontalTransition, verticalTransition };