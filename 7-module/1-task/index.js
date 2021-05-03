import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.template = '';
    this.render();
  }

  render() {
    this.elem = document.createElement('div');
    this.elem.classList = 'ribbon';
    this.elem.insertAdjacentHTML('beforeend',`<button class="ribbon__arrow ribbon__arrow_left">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button>`);
    let ribbonInner = document.createElement('nav');
    ribbonInner.classList = 'ribbon__inner';

    for (const {id, name} of this.categories) {
      this.template += `<a href="#" class="ribbon__item" data-id="${id}">${name}</a>`
    }
    ribbonInner.insertAdjacentHTML('beforeend', this.template);
    this.elem.append(ribbonInner);
    this.elem.insertAdjacentHTML('beforeend',`<button class="ribbon__arrow ribbon__arrow_right">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button>`);
    let arrowRigth = this.elem.querySelector('.ribbon__arrow_right');
    arrowRigth.classList += ` ribbon__arrow_visible`;

    let arrowLeft = this.elem.querySelector('.ribbon__arrow_left');

    //Event listener Arrow LEft <-
    arrowLeft.addEventListener('click', function(){
      ribbonInner.scrollBy(-350, 0);
      let scrollLeft = ribbonInner.scrollLeft;

      if (scrollLeft >= 535){
        arrowRigth.classList.add('ribbon__arrow_visible');
      } else if (scrollLeft <= 185) {
        arrowLeft.classList.remove('ribbon__arrow_visible');
      }
    })
    //Event listener Arrow RIGHT ->
    arrowRigth.addEventListener('click',function(){
      ribbonInner.scrollBy(350, 0);
      let scrollWidth = ribbonInner.scrollWidth;
      let scrollLeft = ribbonInner.scrollLeft;
      let clientWidth = ribbonInner.clientWidth;
      let scrollRight = scrollWidth - scrollLeft - clientWidth;

      if (scrollRight > 500){
        arrowLeft.classList.add('ribbon__arrow_visible');
      } else if (scrollRight <= 185) {
        arrowRigth.classList.remove('ribbon__arrow_visible');
      }
    })

    this.elem.addEventListener('click', function(event){
      let isRibbon = event.target.classList == 'ribbon__item';
      let ribbonId = event.target.dataset.id;
      event.preventDefault();
      if (isRibbon){
          const event = new CustomEvent('ribbon-select', {
            detail: ribbonId,
            bubbles: true
          });
          this.dispatchEvent(event);
      }
    })
  }
}
