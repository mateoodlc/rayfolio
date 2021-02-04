import { gsap } from 'gsap';
import grained from '../animations/grained';

const animationEase = 'expo.inOut';
let blurElement = { a: 30 };

const frameOne = (elements) => {
  const { circle, picture, circleSvgRef } = elements;
  function applyBlur() {
    gsap.set(picture, {webkitFilter:"blur(" + blurElement.a + "px)",filter:"blur(" + blurElement.a + "px)"});  
  }
  return gsap.timeline().add([
    gsap.to(circle, 3, { strokeDashoffset: 0, ease: animationEase }),
    gsap.fromTo(circleSvgRef, 1.75, { scale: 0.3, x: '-50%', y: '-50%'}, {scale: 1, x: '-50%', y: '-50%', ease: animationEase, delay: 1.75}),
    gsap.fromTo(picture, 1, { opacity: 0 }, { opacity: 1, ease: animationEase, delay: 1.6 }),
    gsap.to(blurElement, 1.5, {a: 0, onUpdate:applyBlur, delay: 1.9}),
    gsap.from(picture, 1, { scale: 0.26, ease: animationEase, delay: 2.4 }),
  ]);
}

const frameTwo = (elements) => {
  const { wrapper, heading, designBtn, reelBtn, about } = elements;
  return gsap.timeline({delay: 0}).add([
    gsap.fromTo(wrapper, 1.5, { y: -150 }, { y: 0, ease: animationEase, delay: 0 }),
    gsap.from(heading, 1.5, { y: "100%", ease: animationEase, delay: 0 }),
    gsap.fromTo(reelBtn, 1.5, { y: "100%" }, { y: 0, ease: animationEase, delay: 0.5 }),
    gsap.fromTo(designBtn, 1.5, { y: "100%" }, { y: 0, ease: animationEase, delay: 0.6 }),
    gsap.fromTo(about, 1.5, { y: "100%", opacity: 0 }, { y: 0, opacity: 1, ease: animationEase, delay: 0.4 })
  ])
}

const getMainTimeline = (elements) => {
  return gsap.timeline({delay: 1, onComplete: grained('#global-container')})
  .add(frameOne(elements))
  .add(frameTwo(elements), '-=0.25')
}



export { getMainTimeline };