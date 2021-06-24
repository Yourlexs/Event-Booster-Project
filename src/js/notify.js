const notifyElement = document.querySelector('.js-ntf-backdrop');
const titleElement = document.querySelector('.ntf-title');
const messageElement = document.querySelector('.ntf-message');


const notify = {
    good(tittle, message) {
        messageElement.innerHTML = `${message}`
        titleElement.innerHTML = `${tittle}`;
        notifyElement.addEventListener('click', notify.closeNotify);
        notifyElement.classList.add('ntf-form')
        notifyElement.classList.remove('is-hidden');

        setTimeout(notify.closeNotify, 2000);
    },
    //  на случай если захотим сделать 2 версии нотификашек
    //  bad(message) {
    //     notifyElement.classList.add('bad-open');
    //     notifyElement.addEventListener('click', notify.closeNotify);
    //     setTimeout(notify.closeNotify, 3000);
    // },

     closeNotify(event) {
         notifyElement.classList.add('is-hidden');
         notifyElement.classList.remove('ntf-form');
        notifyElement.removeEventListener('click', notify.closeNotify);
    }
};

export default notify;

// notify.successNotify('все хорошо!');
