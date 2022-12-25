document.addEventListener('DOMContentLoaded', function () {

  const scroller = new Scroller('#root');
  document.addEventListener('wheel', scroller.listenScroll);
})

class Scroller {
  constructor(rootSelector) {
    const rootElement = document.querySelector(rootSelector);

    this.sections = document.querySelectorAll('section');

    this.visibleSectionIndex = this.sections.find

    this.currentSectionIndex = 0;

    this.isThrottled = false;

    this.isScrolledIntoView(this.sections[0]);
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


    this.scroll(direction);
  }

  scroll = (direction) => {


    if (direction === 1) {
      const isLastSection = this.currentSectionIndex === this.sections.length - 1;
      if (isLastSection) return;
    } else if (direction === -1) {
      const firstSection = this.currentSectionIndex === 0;
      if (firstSection) return;
    }




    const sectionButton = document.querySelectorAll('.sectionScrollTo');

    sectionButton.forEach((section, index) => {
      section.addEventListener('click', () => {

        const CurrentElementClass = `section${index}`
        const element =
          document.querySelector(`[data-name="${CurrentElementClass}"]`);


        element.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });

        this.currentSectionIndex = index;
      })
    })










    this.currentSectionIndex = this.currentSectionIndex + direction;


    console.log(this.currentSectionIndex);






    this.scrollToCurrentSection();

  }

  scrollToCurrentSection = () => {
    this.sections[this.currentSectionIndex].scrollIntoView({
      behavior: "smooth",
      block: "start",
    })

  }
}



// Button Carret


const buttonCarret = document.querySelector('#buttonCarret');
const scroller = document.querySelector('.scroller');

buttonCarret.addEventListener('click', () => {
  scroller.classList.toggle('left');
  buttonCarret.classList.toggle('rotation');
})