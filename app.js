//Filter

const tabs = document.querySelectorAll('.nav__item');
const boxes = document.querySelectorAll('.slider__item')
;
const dotsInner = document.querySelector('.dots');

const screenReturn  = () => {
  if (window.screen.width >= '1024') return 'desktop';
  if (window.screen.width >= '768') return 'tablet';
  return 'mobile';
};

const getWidth = () => {
  return boxes[0].clientWidth;
}

const getHeight = () => {
  return boxes[0].clientHeight;
}

const getMarginRight = () => {
  return Number(window.getComputedStyle(boxes[0]).marginRight.slice(0, -2));
}

const getMarginBottom = () => {
  return Number(window.getComputedStyle(boxes[0]).marginBottom.slice(0, -2));
}

let getContainer = () => {
  let height = getHeight();
  let margin = getMarginBottom();
  const container = document.querySelector('.slider');

  if(screenReturn () === 'tablet') {
    container.style.height = `${height * 2 + margin * 2 + 40}px`;
  } else {
    container.style.height  = 'auto'
  }
}

getContainer()

//Slider
const getNumber = () => {
  let newBoxes = [];
  boxes.forEach(box => {
    if (!box.classList.contains('hide')) {
      newBoxes.push(box)
    }
  })

  if (screenReturn() === 'desktop') {
    let number  = Math.ceil(newBoxes.length / 3);
    return number
  };
  if (screenReturn() === 'tablet') {
    let number  = Math.ceil(newBoxes.length / 4)
    return number
  };
  if (screenReturn() === 'mobile') {
    let number  = Math.ceil(newBoxes.length / 3)
    return number
  };
}

let number = getNumber()


let renderDots = () => {
  if (number > 1) {
    for (let i = 0; i < number; i++) {
      let dot = document.createElement("div");
      dot.className = "dot";
      dotsInner.appendChild(dot);
    }
  }

  let dots = document.querySelectorAll('.dot');
  if (dots.length > 1) {
    dots[0].classList.add('active');
  }

  //Переключение dots
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      let width = getWidth();
      let marginRight = getMarginRight();
      console.log('click')

      dots.forEach(dot => {
        dot.classList.remove('active');
      })

      if (screenReturn() === 'desktop') {
        for (let i = 0; i < dots.length; i++) {
          if (dot === dots[i]) {
            dot.classList.add('active');
            slider.style.transform = `translateX(-${i * 3 * (width + marginRight)}px)`
          }
        }
      } else if (screenReturn() === 'tablet') {
        for (let i = 0; i < dots.length; i++) {
          if (dot === dots[i]) {
            dot.classList.add('active');
            slider.style.transform = `translateX(-${i * 2 * (width + marginRight)}px)`
          }
        }
      }
    })
  })
}

renderDots();

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    let theme = tab.getAttribute('dataset-f');
    let dots = document.querySelectorAll('.dot');

    boxes.forEach(box => {
      box.classList.remove('hide');
      if (!box.classList.contains(theme) && theme !== 'all') {
        box.classList.add('hide');
      }
    })

    dots.forEach(dot => {
      dotsInner.removeChild(dot);
    })

    renderDots();
    slider.style.transform = `translateX(0px)`;
  })
});

const next = document.querySelector('.right');
const prev = document.querySelector('.left');
const slider = document.querySelector('.slider');
const slidesCount = boxes.length;
let activeSlideIndex = 0;

next.addEventListener('click', () => {
  changeSlide('next');
});

prev.addEventListener('click', () => {
  changeSlide('prev');
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft') {
    changeSlide('prev');
  } else if (event.key === 'ArrowRight') {
    changeSlide('next');
  }
});

function changeSlide(direction) {
  let newBoxes = [];
  let width = getWidth();
  let margin = getMarginRight();
  let count = 0;

  if (screenReturn() === 'desktop') count = 3;
  if (screenReturn() === 'tablet') count = 2;
  console.log(count)

  console.log(count)

  boxes.forEach(box => {
    if (!box.classList.contains('hide')) {
      newBoxes.push(box)
    }
  })

  let dots = document.querySelectorAll('.dot');
  if (direction === 'next') {
    activeSlideIndex++;

    if (activeSlideIndex === number) {
      activeSlideIndex = 0;
    }

    slider.style.transform = `translateX(-${activeSlideIndex * count * (width + margin)}px)`;

    for (let i = 0; i < dots.length; i++) {
      if (dots[i].className === 'dot active') {
        dots[i].classList.remove('active');
        i++;
        if (i === dots.length) {
          i = 0;
        }
        dots[i].classList.add('active');
        break;
      }
    }
  } else if (direction === 'prev') {
    activeSlideIndex--;

    if (activeSlideIndex < 0) {
      activeSlideIndex = number - 1;
    }

    slider.style.transform = `translateX(-${activeSlideIndex * count * (width + margin)}px)`;

    for (let i = dots.length - 1; i >= 0; i--) {
      if (dots[i].className === 'dot active') {
        dots[i].classList.remove('active');
        i--;
        if (i < 0) {
          i = dots.length - 1;
        }
        dots[i].classList.add('active');
        break;
      }
    }
  }
}

window.onresize = function() {
  slider.style.transform = `translateX(0px)`;
  screenReturn();
  getContainer();
  number = getNumber();
  let dots = document.querySelectorAll('.dot');
  dots.forEach(dot => {
    dotsInner.removeChild(dot);
  })
  renderDots();
}
