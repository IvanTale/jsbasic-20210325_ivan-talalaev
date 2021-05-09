import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.modalWindow = this.render();
    document.addEventListener('keydown', event => {
      if (event.code === 'Escape'){
        this.close();
      }
    })
  }

  render() {
    return createElement(`
      <div class="modal">
        <div class="modal__overlay"></div>
        <div class="modal__inner">
          <div class="modal__header">
            <button type="button" class="modal__close">
              <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
            </button>
            <h3 class="modal__title">
            </h3>
          </div>
          <div class="modal__body">
          </div>
        </div>
      </div>
    `);
  }

  open(){
    document.body.classList.add('is-modal-open');
    this.modalWindow.querySelector('.modal__close').addEventListener('click', () => { this.close(); })
    document.body.append(this.modalWindow);
  }
  setTitle(title){
    let modalTitle = this.modalWindow.querySelector('.modal__title')
    modalTitle.innerHTML = title;
  }
  setBody(myBody){
    let modalBody = this.modalWindow.querySelector('.modal__body')
    modalBody.append(myBody);
  }
  close(){
    document.body.classList.remove('is-modal-open');
    this.modalWindow.remove();
  }
}
