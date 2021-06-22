const refs = {
  regBackdrop: document.querySelector('.js-reg-backdrop'),
  openRegistration: document.querySelector('.reg-button'),
  closeRegistration: document.querySelector('.js-close-reg'),
};

refs.openRegistration.addEventListener('click', onOpenRegistration);

function onOpenRegistration() {
  refs.regBackdrop.classList.remove('is-hidden');
    refs.regBackdrop.addEventListener('click', onCloseBackdropReg);
    refs.closeRegistration.addEventListener('click', onCloseRegistration);
}

function onCloseRegistration() {
  refs.regBackdrop.classList.add('is-hidden');
  removeEvLis();
}

function onCloseBackdropReg(e) {
  if (e.target === e.currentTarget) {
      refs.regBackdrop.classList.add('is-hidden');
    removeEvLis();
  }
}

function removeEvLis() {
  refs.closeRegistration.removeEventListener('click', onCloseRegistration);
  refs.regBackdrop.removeEventListener('click', onCloseRegistration);
}
export default onCloseRegistration;
