import './modal.css';

class Modal {
    private container: HTMLDivElement;

    constructor() {
        this.container = document.createElement('div');
        this.container.className = 'module-layer';
    }

    draw() {
        const formContainer = document.createElement('form');
        formContainer.className = 'form';
        this.container.append(formContainer);

        const detailsTitle = document.createElement('h3');
        detailsTitle.className = 'form__title';
        detailsTitle.textContent = 'Personal details';
        formContainer.append(detailsTitle);  
        
        const nameInput = document.createElement('input');
        nameInput.className = 'form__name';
        nameInput.type = 'text';
        nameInput.placeholder = 'Enter Your name & surname';
        nameInput.pattern = "[\w]{3,}[ ]+[\w]{3,}";
        nameInput.required = true;
        formContainer.append(nameInput);

        const nameWarning = document.createElement('p'); 
        nameWarning.className = 'name-warning';
        nameWarning.textContent = 'Your name and surname must not be shorter than 3 symbols each';
        formContainer.append(nameWarning);
        
        let nameValid = false;

        nameInput.addEventListener('input', () => {
            const valueItems = nameInput.value.split(' ');
            if(valueItems.length < 2) {
                nameInput.classList.add('invalid');
                nameWarning.classList.add('shown');
                nameValid = false;
                return;
            }

            valueItems.forEach((item) => {
                if(item.length < 3) {
                    nameInput.classList.add('invalid');
                    nameWarning.classList.add('shown');
                    nameValid = false;
                } else {
                    nameInput.classList.remove('invalid');
                    nameInput.classList.add('valid');
                    nameWarning.classList.remove('shown');
                    nameValid = true;
                }   
            })
        })
        
        const phoneInput = document.createElement('input');
        phoneInput.className = 'form__phone';
        phoneInput.type = 'tel';
        phoneInput.placeholder = '+375 XXX XXX';
        phoneInput.pattern = "^(?:\\+)[0-9\\s.\\/-]{9,20}$"; //работает
        phoneInput.required = true;
        formContainer.append(phoneInput);

        const phoneWarning = document.createElement('p'); 
        phoneWarning.className = 'phone-warning';
        phoneWarning.textContent = 'Please enter valid phone number';
        formContainer.append(phoneWarning);

        let phoneValid = false;

        phoneInput.addEventListener('input', () => {
            if(phoneInput.value.length < 9) {
                phoneWarning.classList.add('shown');
                phoneInput.classList.add('invalid');
                phoneValid = false;
            }
            phoneWarning.classList.remove('shown');
            phoneInput.classList.add('valid');
            phoneValid = true;
        })
        
        const addressInput = document.createElement('input');
        addressInput.className = 'form__address';
        addressInput.type = 'text';
        addressInput.placeholder = 'Delivery address';
        addressInput.required = true;
        formContainer.append(addressInput);

        let addressValid = false;

        addressInput.addEventListener('input', () => {
            const valueItems = addressInput.value.split(' ');
            if(valueItems.length < 3) {
                addressInput.classList.add('invalid');
                addressWarning.classList.add('shown');
                addressValid = false;
                return;
            }

            valueItems.forEach((item) => {
                if(item.length < 5) {
                    addressInput.classList.add('invalid');
                    addressWarning.classList.add('shown');
                    addressValid = false;
                } else {
                    addressInput.classList.remove('invalid');
                    addressInput.classList.add('valid');
                    addressWarning.classList.remove('shown');
                    addressValid = true;
                }   
            })
        })

        const addressWarning = document.createElement('p'); 
        addressWarning.className = 'address-warning';
        addressWarning.textContent = 'Your address must contain 3 words(minimum 5 symbols each)';
        formContainer.append(addressWarning);
        
        const emailInput = document.createElement('input');
        emailInput.className = 'form__email';
        emailInput.type = 'email';
        emailInput.placeholder = 'E-mail: ex. john2022@yahoo.com';
        emailInput.required = true;
        formContainer.append(emailInput);

        const emailWarning = document.createElement('p'); 
        emailWarning.className = 'email-warning';
        emailWarning.textContent = 'Please enter valid email';
        formContainer.append(emailWarning);

        const cardTitle = document.createElement('h3');
        cardTitle.className = 'form__card-title';
        cardTitle.textContent = 'Credit card details';
        formContainer.append(cardTitle);

        const cardInfo = document.createElement('div');
        cardInfo.className = 'form__card-info card-info';
        formContainer.append(cardInfo);

        const labelNumber = document.createElement('label');
        labelNumber.htmlFor = 'card-number';
        labelNumber.textContent = 'Card\'s number:';
        cardInfo.append(labelNumber);

        const cardNumberInput = document.createElement('input');
        cardNumberInput.id = 'card-number';
        cardNumberInput.type = 'text';
        cardNumberInput.maxLength = 16;
        cardNumberInput.pattern = "^[0-9\\s.\\/-]{16}$";
        cardNumberInput.required = true;
        cardInfo.append(cardNumberInput);

        const cardNumberWarning = document.createElement('p'); 
        cardNumberWarning.className = 'card-number-warning';
        cardNumberWarning.textContent = 'Please enter valid card number';
        cardInfo.append(cardNumberWarning);

        // cardNumberInput.addEventListener('input', () => {
        //     if(cardNumberInput.value.startsWith('4')) {
        //         cardNumberInput.style.background = `url('../../assets/svg/visa.svg')`;
        //         cardNumberInput.style.backgroundPosition = 'left 10px center';
        //         cardNumberInput.style.backgroundSize = 'contain';
        //         cardNumberInput.style.backgroundRepeat = 'no-repeat';
        //     }
        //     else if(cardNumberInput.value.startsWith('5')) {
        //         cardNumberInput.style.background = `url('/assets/svg/mastercard.svg')`;
        //         cardNumberInput.style.backgroundPosition = 'left 10px center';
        //         cardNumberInput.style.backgroundSize = 'contain';
        //         cardNumberInput.style.backgroundRepeat = 'no-repeat';
        //     }
        // })

        const cardsAdd = document.createElement('div');
        cardsAdd.className = 'card-info__add';
        cardInfo.append(cardsAdd);

        const labelValid = document.createElement('label');
        labelValid.htmlFor = 'valid';
        labelValid.textContent = 'Valid:';
        cardsAdd.append(labelValid);

        const cardValidInput = document.createElement('input');
        cardValidInput.id = 'valid';
        cardValidInput.type = 'text';
        cardValidInput.maxLength = 5;
        cardValidInput.pattern = "/^(0[1-9]|1[0-2])\/\d{2}$/"; // возможно
        cardValidInput.required = true;
        cardsAdd.append(cardValidInput);

        cardValidInput.addEventListener("input", () => {

        })

        const labelCvv = document.createElement('label');
        labelCvv.htmlFor = 'cvv';
        labelCvv.textContent = 'CVV:';
        cardsAdd.append(labelCvv);

        const cardCvvInput = document.createElement('input');
        cardCvvInput.id = 'cvv';
        cardCvvInput.type = 'text';
        cardCvvInput.maxLength = 3;
        cardCvvInput.pattern = '^[0-9\\s.\\/-]{3}$';
        cardCvvInput.required = true;
        cardsAdd.append(cardCvvInput);

        const submitButton = document.createElement('button');
        submitButton.type = 'submit';
        submitButton.className = 'form__button button_submit inactive';
        submitButton.textContent = 'Submit';
        submitButton.disabled = true;
        formContainer.append(submitButton);

        window.addEventListener('click', (e) => {
            const target = <HTMLElement>e.target;
            if(target.classList.contains('module-layer')) {
                this.container.style.display = 'none';
            }
        })

        document.body.prepend(this.container);
    }
}

export default Modal;