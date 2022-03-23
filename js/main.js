window.addEventListener('DOMContentLoaded', () => {

    //footerLinks
    const textFooterLinks = document.querySelector('.footer__contacts'),
        iconFooterLinks = document.querySelector('.contacts__icon');


    function showIconFooterLinks() {
        if (document.documentElement.clientWidth < 769) {
            textFooterLinks.style.display = 'none';
            iconFooterLinks.style.display = 'flex';
        }
    }
    showIconFooterLinks();



    // modal
    const modalBtn = document.querySelectorAll('.button__request-call'),
        modalForm = document.querySelector('form'),
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

    modalForm.addEventListener('click', (e) => {
        if(e.target === modalForm || e.target === closeBtn) {
            closeModal();
        }
    });


    //FORM
    const form = document.getElementById('form');
    userMessage = document.querySelector('.user-message');
    form.addEventListener('submit', formSend);


    const message = {
        validationError: 'Заполните обязательные поля',
        success: 'Спасибо, скоро c вами свяжутся!',
        failure: 'Похоже возникли неполадки, попробуйте позже',
        loading: './images/spinner.svg'
    };

    async function formSend(e) {
        e.preventDefault();

        let error = formValidate(form);

        const formData = new FormData(form);
        
        let statusMessage = document.createElement('img');
        statusMessage.src = message.loading;

        if (error === 0) {
            userMessage.innerHTML = '';
            userMessage.insertAdjacentElement('afterend', statusMessage);
            let response = await fetch('send.php', {
                method: 'post',
                body: formData
            });
            if (response.ok) {
                statusMessage.parentNode.removeChild(statusMessage);
                let json = await response.text();
                userMessage.classList.add('success');
                userMessage.innerHTML = message.success;
                form.reset();
            } else {
                userMessage.classList.remove('success');
                userMessage.innerHTML = message.failure;
            }
        } else {
            userMessage.classList.remove('success');
            userMessage.innerHTML = message.validationError;
        }
    }

    //VALIDATION FORM
    jQuery(document).ready(function () {
        $(".input__tel").mask("+7 (999) 999-99-99");
    });

    function formValidate(form) {
        let error = 0;
        let formReq = document.querySelectorAll('._req');

        for (let i = 0; i < formReq.length; i++) {
            const input = formReq[i];
            formRemoveError(input);

            if (input.classList.contains('email')) {
                if (emailTest(input)) {
                    formAddError(input);
                    error++;
                }
            } else if (input.classList.contains('name')) {
                if (nameTest(input)) {
                    formAddError(input);
                    error++;
                }
            } else if (input.getAttribute('type') === 'checkbox' && input.checked === false) {
                formAddError(input);
                error++;
            } else {
                if (input.value === '') {
                    formAddError(input);
                    error++;
                }
            }
        }
        return error;
    }

    function formAddError(input) {
        input.parentElement.classList.add('error');
        input.classList.add('error');
    }
    function formRemoveError(input) {
        input.parentElement.classList.remove('error');
        input.classList.remove('error');
    }

    function emailTest(input) {
        return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
    }

    function nameTest(input) {
        return !/^[a-zA-Zа-яА-ЯёЁ'][a-zA-Z-а-яА-ЯёЁ' ]+[a-zA-Zа-яА-ЯёЁ']?$/.test(input.value);
    }


});
