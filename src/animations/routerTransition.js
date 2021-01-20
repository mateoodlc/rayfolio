import { gsap } from 'gsap';
import { Timeline } from 'gsap/gsap-core';

/* const animationEase = 'power4.inOut'; */

const enterTransition = (element, direction, onCompleteParam) => {
  const directions = {
    top: 'inset(100% 0% 0% 0%)',
    right: 'inset(0% 100% 0% 0%)',
    bottom: 'inset(0% 0% 100% 0%)',
    left: 'inset(0% 0% 0% 100%)',
  }
  const tween = gsap.fromTo(element, 2, { webkitClipPath: directions[direction], clipPath: directions[direction] }, { webkitClipPath: 'inset(0% 0% 0% 0%)', clipPath: 'inset(0% 0% 0% 0%)', delay: 0, ease: 'power3.out', onComplete: onCompleteParam });
  const tl = new Timeline();
  return tl.add(tween);
}

export { enterTransition };