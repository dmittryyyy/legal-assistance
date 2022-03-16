window.addEventListener('DOMContentLoaded', () => {

// modal
const modalBtn = document.querySelectorAll('.button__request-call'),
    modalForm = document.querySelector('.modal'),
    closeBtn = document.querySelector('.close__modal'),
    body = document.querySelector('body');

modalBtn.forEach(item => {
    item.addEventListener('click', showModal); 
});

function showModal() {
    modalForm.classList.add('active');
    body.style.overflow = 'hidden';
}

function closeModal() {
    modalForm.classList.remove('active');
    body.style.overflow = 'overlay';
}

closeBtn.addEventListener('click', () => {
    closeModal();
});

modalForm.addEventListener('click', (e) => {
    const modal = e.target.closest('.modal__inner');
    if (!modal) {
        closeModal();
    }
});


//request form



});