<script>
import gsap from 'gsap';
export default {
  methods: {
    breakText(textElement) {
      const textLines = textElement.split(/\r?\n/);
      return textLines;
    },
    createTextLine(content, elementWrapper) {
      const spanElement = document.createElement('span');
      elementWrapper.innerHTML = '';
      spanElement.innerHTML = content;
      spanElement.style.display = 'inline-block';
      elementWrapper.appendChild(spanElement);
      return spanElement;
    },
    animateTextLines(textElement, elementWrapper, entryDelay) {
      const textLines = this.breakText(textElement);
      const textLinesElementsArray = [];
      textLines.forEach((element) => {
        const spanElement = this.createTextLine(element, elementWrapper);
        textLinesElementsArray.push(spanElement);
      })
      gsap.from(textLinesElementsArray, 0.3, {y: '20px', opacity: 0, stagger: 0.1, delay: entryDelay});
    },
  }
}
</script>