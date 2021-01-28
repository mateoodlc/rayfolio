<script>
import gsap from 'gsap';
export default {
  methods: {
    breakAllTitles(element, delay) {
        this.createWords(element, delay);
      },
    createWords(title, delay) {
      let titleWrapper = title;
      let sentence = titleWrapper.innerHTML;
      let words = sentence.split(" ");
      titleWrapper.innerHTML = "";
      for (let j = 0; j < words.length; j++) {
        if (!words[j] == "") {
          let letters = words[j].split("");
          const wordWrapper = document.createElement("span");
          const wordSpaceWrapper = document.createElement("span");
          wordWrapper.classList.add('title-letter__wrapper');
          wordWrapper.style.display = "inline-block";
          wordWrapper.style.overflow = "hidden";
          const wordSpaceChar = document.createTextNode(" ");
          for (let n = 0; n < letters.length; n++) {
            const letter = letters[n];
            const letterSpan = document.createElement("span");
            const letterChar = document.createTextNode(letter);
            letterSpan.appendChild(letterChar);
            letterSpan.classList.add('title-letter')
            wordWrapper.appendChild(letterSpan);
          }
          wordSpaceWrapper.appendChild(wordSpaceChar);
          titleWrapper.appendChild(wordWrapper);
          titleWrapper.appendChild(wordSpaceWrapper);
        }
      }
      this.animateLetters(delay);
    },
    animateLetters(delay) {
      gsap.from('.title-letter', 0.5, {y: '100px', rotate: '10deg', scale: 0.6, stagger: { // wrap advanced options in an object
        each: 0.1,
        ease: 'power1.inOut'
      },
      delay: delay
    });
    }
  }
}
</script>