import { gsap } from 'gsap';

const animationEase = 'power4.inOut';
let blurElement = { a: 30 };

const frameOne = (elements) => {
  const { circle, picture } = elements;
  function applyBlur() {
    gsap.set(picture, {webkitFilter:"blur(" + blurElement.a + "px)",filter:"blur(" + blurElement.a + "px)"});  
  }
  return gsap.timeline().add([
    gsap.to(circle, 2, { strokeDashoffset: 0, ease: animationEase }),
    gsap.fromTo(circle, 2, { scale: 0.3 }, { scale: 1, ease: animationEase, delay: 1.5}),
    gsap.fromTo(picture, 1, { opacity: 0 }, { opacity: 1, ease: 'linear', delay: 1.5 }),
    gsap.to(blurElement, 1, {a: 0, onUpdate:applyBlur, delay: 1.6}),
    gsap.fromTo(picture, 2, { scale: 0.26, x: 3, y: 3 }, { scale: 1, x: 0, y: 0, ease: animationEase, delay: 1.6 }),
  ]);
}

const frameTwo = (elements) => {
  const { wrapper, heading, line1, line2, designBtn, reelBtn, about } = elements;
  return gsap.timeline({delay: 3.5}).add([
    gsap.fromTo(wrapper, 1.5, { y: -150 }, { y: 0, ease: animationEase, delay: 0.2 }),
    gsap.fromTo(heading, 1.5, { y: "100%" }, { y: 0, ease: animationEase, delay: 0.4 }),
    gsap.fromTo(line1, 1.5, { y: "100%" }, { y: 0, ease: animationEase, delay: 0.6 }),
    gsap.fromTo(line2, 1.5, { y: "100%" }, { y: 0, ease: animationEase, delay: 0.7 }),
    gsap.fromTo(reelBtn, 1.5, { y: "100%" }, { y: 0, ease: animationEase, delay: 0.8 }),
    gsap.fromTo(designBtn, 1.5, { y: "100%" }, { y: 0, ease: animationEase, delay: 1 }),
    gsap.fromTo(about, 1.5, { y: "100%", opacity: 0 }, { y: 0, opacity: 1, ease: animationEase, delay: 1 })
  ])
}

const getMainTimeline = (elements) => {
  return gsap.timeline({paused: true, delay: 1}).add([
    frameOne(elements),
    frameTwo(elements)
  ])
}



export { getMainTimeline };