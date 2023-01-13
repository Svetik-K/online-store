import { Product } from '../../utils/types';
import './header.css';

class Header {
    private container: HTMLElement;

    constructor() {
        this.container = document.createElement('header');
        this.container.className = 'header header__main';
    }

    private createContactsSection() {
        const contactsWrapper = document.createElement('div');
        contactsWrapper.className = 'header__contacts contacts';
        this.container.prepend(contactsWrapper);

        const phone = document.createElement('a');
        phone.className = 'contacts__phone';
        phone.href = 'tel:+46760325015';
        phone.textContent = '(+46) 76 032 50 15';
        contactsWrapper.append(phone);

        const mail = document.createElement('a');
        mail.className = 'contacts__mail';
        mail.href = 'mailto:allforyou_online@yahoo.com';
        mail.textContent = 'allforyou_online@yahoo.com';
        contactsWrapper.append(mail);

        const location = document.createElement('a');
        location.className = 'contacts__location';
        location.target = '_blank';
        location.href = 'https://www.google.com/maps/place/M%C3%A4ster+Samuelsgatan+69,+111+21+Stockholm/@59.332035,18.0592677,19z/data=!4m5!3m4!1s0x465f9d6099d8584b:0x5e6a93c33bd4da61!8m2!3d59.3319501!4d18.0593388';
        location.textContent = 'Our location';
        contactsWrapper.append(location);

        const sign = document.createElement('a');
        sign.className = 'contacts__sign';
        // sign.href = '#';
        sign.textContent = 'Sign In';
        contactsWrapper.append(sign);
    }

    private createLogo(logoName: string) {
        const logo = document.createElement('div');
        logo.className = ' logo header__logo';
        const logoText = document.createElement('h1');
        const logoLink = document.createElement('a');
        logoLink.className = 'logo__link';
        logoText.className = 'logo__text';
        logoText.textContent = logoName;
        logoLink.href = '#main-page';
        logoLink.append(logoText);
        logo.appendChild(logoLink);
        return logo;
    }

    private createCartButton() {
        const btnWrapper = document.createElement('div');
        btnWrapper.className = 'header__button-wrapper';
        const cartButton = document.createElement('a');
        cartButton.className = 'header__button button_cart';
        cartButton.href = '#cart-page';
        const productsNum = document.createElement('div');
        productsNum.className = 'header__products-number';
        if (localStorage.cartItems) {
            const storageProducts: Product[] = JSON.parse(localStorage.cartItems);
            let test = JSON.parse(localStorage.cartItems);
            let sumOfItems = 0;
            for (let i = 0; i < test.length; i++) {
                if (test[i]['count'] == undefined) {
                    test[i]['count'] = 1;
                }
                sumOfItems += test[i]['count'];
                console.log(test[i]['count'])
            }
            productsNum.textContent = `${sumOfItems}`;
            console.log(productsNum.textContent);
        } else {
            productsNum.textContent = '0';
        }

        btnWrapper.appendChild(cartButton);
        btnWrapper.appendChild(productsNum);
        return btnWrapper;
    }

    draw() {
        this.createContactsSection();

        const headerWrapper = document.createElement('div');
        headerWrapper.className = 'header__wrapper';
        this.container.appendChild(headerWrapper);

        const logo = this.createLogo('Online Store');
        headerWrapper.appendChild(logo);

        const cartTotal = document.createElement('div');
        cartTotal.className = 'header__total';

        const totalText = document.createElement('span');
        totalText.className = 'header__total-text';
        totalText.textContent = 'Cart total: ';

        const totalSum = document.createElement('span');
        totalSum.className = 'header__total-sum';
        let finalSumLocalStorage = JSON.parse(localStorage.cartItems)
        let sum = 0;
        for (let i = 0; i < finalSumLocalStorage.length; i++) {
            if (finalSumLocalStorage[i]['count'] == undefined) {
                finalSumLocalStorage[i]['count'] = 1;
            }
            sum += finalSumLocalStorage[i]['count'] * finalSumLocalStorage[i]['price'];
        }

        totalSum.textContent = `${sum} $`;
        
        cartTotal.appendChild(totalText);
        cartTotal.appendChild(totalSum);
        headerWrapper.appendChild(cartTotal);

        const cartBtn = this.createCartButton();
        headerWrapper.appendChild(cartBtn);

        return this.container;
    }
}

export default Header;