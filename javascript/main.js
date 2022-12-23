document.addEventListener('DOMContentLoaded', function () {

  const scroller = new Scroller('#root');
  console.log(scroller);

  document.addEventListener('wheel', scroller.listenScroll);



  function scroll(direction) {


  }

  function scrollToCurrentSection() {


  }

})

class Scroller {
  constructor(rootSelector) {
    const rootElement = document.querySelector(rootSelector);

    this.sections = document.querySelectorAll('section');

    this.visibleSectionIndex = this.sections.find

    this.currentSectionIndex = 0;

    this.isThrottled = false;

    this.isScrolledIntoView(this.sections[0]);

    // Alternatyywa dla arrow function
    // this.listenScroll = this.listenScroll.bind(this);
  }

  isScrolledIntoView(el) {
    const rect = el.getBoundingClientRect();
    const elemTop = rect.top;
    const elemBot = Math.floor(rect.bottom);


    const isVisible = (elemTop >= 0) && (elemBot <= window.innerHeight);


    return isVisible;
  }

  listenScroll = (event) => {
    if (this.isThrottled) return;
    this.isThrottled = true;

    setTimeout(() => {


      this.isThrottled = false;
    }, 1000)


    const direction = event.wheelDelta < 0 ? 1 : -1;
    console.log(event.wheelDelta);

    this.scroll(direction);
  }

  scroll = (direction) => {
    console.log(direction);

    if (direction === 1) {
      const isLastSection = this.currentSectionIndex === this.sections.length - 1;
      if (isLastSection) return;
    } else if (direction === -1) {
      const firstSection = this.currentSectionIndex === 0;
      if (firstSection) return;
    }

    this.currentSectionIndex = this.currentSectionIndex + direction;

    this.scrollToCurrentSection();

  }

  scrollToCurrentSection = () => {
    this.sections[this.currentSectionIndex].scrollIntoView({
      behavior: "smooth",
      block: "start",
    })

  }
}