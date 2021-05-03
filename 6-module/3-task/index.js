import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.template = ``;
    this.render();
  }

  render() {
    this.elem = document.createElement('div');
    this.elem.className = 'carousel';
    this.elem.insertAdjacentHTML('beforeend', `<div class="carousel__arrow carousel__arrow_right">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </div>
      <div class="carousel__arrow carousel__arrow_left">
        <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
      </div>`
    )

    let innerDiv = document.createElement('div');
    innerDiv.className = 'carousel__inner';

    for (const { name, price, image, id } of this.slides) {
      this.template += `
      <div class="carousel__slide" data-id="${id}">
        <img src="/assets/images/carousel/${image}" class="carousel__img" alt="slide">
        <div class="carousel__caption">
          <span class="carousel__price">€${price.toFixed(2)}</span>
          <div class="carousel__title">${name}</div>
          <button type="button" class="carousel__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>
      </div>
      `
    }

    this.elem.addEventListener('click', event => {
      const isButton = event.target.nodeName === 'BUTTON';
      const id = event.path[2].dataset.id;
      if (isButton) {
        const event = new CustomEvent("product-add", {
          detail: id,
          bubbles: true
        });
        this.elem.dispatchEvent(event);
      }
    });
    innerDiv.insertAdjacentHTML('beforeend', this.template);
    this.elem.append(innerDiv);

    let carouselArrowLeft = this.elem.querySelector(".carousel__arrow_left");
    let carouselArrowRight = this.elem.querySelector(".carousel__arrow_right");
    let slideQuantity = this.elem.querySelectorAll('.carousel__slide').length;
    let slider = this.elem.querySelector(".carousel__inner");
    let x = 0;
    carouselArrowLeft.style.display = 'none';
    carouselArrowLeft.addEventListener('click', function() {
    let sliderWidth = slider.offsetWidth;
    console.log('offset',sliderWidth)
      if (x < 0){
        x += sliderWidth;
        slider.style.transform = `translateX(${x}px)`;
        carouselArrowRight.style.display = '';
        if (x == 0) {
          this.style.display = 'none';
        }
      }
    } );
    carouselArrowRight.addEventListener('click', function() {
      let sliderWidth = slider.offsetWidth;
      console.log('offset',sliderWidth);
      if (x > -1 * slideQuantity * sliderWidth) {
        x -= sliderWidth;
        slider.style.transform = `translateX(${x}px)`;
        carouselArrowLeft.style.display = '';
        if (x < -1 * (slideQuantity - 2) * sliderWidth) {
          this.style.display = 'none';
        }
      }
    });
  }
}
