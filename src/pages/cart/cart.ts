import Page from "../../components/templates/page";
import Header from '../../components/header/header';
import CartProduct from '../../components/cartProduct/cartProduct';
import Modal from '../../components/modal/modal';
import { Product } from '../../utils/types';
import './cart.css';

class CartPage extends Page {
    header: Header;
    summary: HTMLDivElement;
    products: HTMLDivElement;
    pageLength: number;
    pageNumber: number;
    cards: any;
    maxPage: number;
    main: HTMLElement;

    constructor(pageName: string) {
        super(pageName);
        this.header = new Header();
        this.main = document.createElement('main');
        this.main.className = 'main';
        this.summary = document.createElement('div');
        this.summary.className = 'main__summary';
        this.products = document.createElement('div');
        this.products.className = 'main__products';
        this.cards = document.createElement('div');
        this.cards.className = 'main__cards';
        this.pageLength = 3;
        this.pageNumber = 1;
        this.maxPage = 1;
    }

    private createProductsCounter() {
        const url = new URL(window.location.href);
        const pageParam = url.searchParams.get('page') || '';
        const lengthParam = url.searchParams.get('length') || '';

        const productsPanel = document.createElement('div');
        productsPanel.className = 'main__products-panel products-panel';

        const title = document.createElement('h2');
        title.className = 'products-panel__title';
        title.textContent = 'Products In Cart';
        productsPanel.append(title);

        const counters = document.createElement('div');
        counters.className = 'products-panel__counters';
        productsPanel.append(counters);

        const itemsWrapper = document.createElement('div');
        itemsWrapper.className = 'items-wrapper';
        counters.append(itemsWrapper);

        const itemsLabel = document.createElement('label');
        itemsLabel.className = 'items__label';
        itemsLabel.htmlFor = 'items';
        itemsLabel.textContent = 'items: ';
        itemsWrapper.append(itemsLabel);

        const itemsCounter = document.createElement('input');
        itemsCounter.type = 'number';
        itemsCounter.id = 'items';
        itemsCounter.min = '3';
        itemsCounter.max = '10';
        if (lengthParam) {
            itemsCounter.value = `${lengthParam}`;
            this.pageLength = Number(lengthParam);
        } else {
            itemsCounter.value = '3';
        }
        itemsWrapper.append(itemsCounter);

        const pages = document.createElement('div');
        pages.className = 'products-panel__pages pages';
        counters.append(pages);

        const pagesTitle = document.createElement('span');
        pagesTitle.className = 'pages__title';
        pagesTitle.textContent = 'page: ';
        pages.append(pagesTitle);

        const leftButton = document.createElement('button');
        leftButton.className = 'pages__button button_left';
        pages.append(leftButton);

        const pagesNumber = document.createElement('span');
        pagesNumber.className = 'pages__number';
        if (pageParam) {
            pagesNumber.textContent = `${pageParam}`;
            this.pageNumber = Number(pageParam);
        } else {
            pagesNumber.textContent = '1';
        }

        pages.append(pagesNumber);

        const rightButton = document.createElement('button');
        rightButton.className = 'pages__button button_right';
        pages.append(rightButton);

        leftButton.addEventListener('click', (e) => {
            e.preventDefault();
            const numberSpan = <HTMLSpanElement>document.querySelector('.pages__number');
            const pageNumber = numberSpan.textContent;
            if (pageNumber === '1') {
                return;
            } else {
                const page = Number(pageNumber) - 1;
                this.drawPage(page, this.pageLength);
                numberSpan.textContent = `${page}`;
            }
        })

        rightButton.addEventListener('click', (e) => {
            e.preventDefault();
            const numberSpan = <HTMLSpanElement>document.querySelector('.pages__number');
            const pageNumber = numberSpan.textContent;
            if (Number(pageNumber) === this.maxPage) {
                return;
            }
            else if (this.getLocalStorage().length === 0) {
                return;
            }
            const page = Number(pageNumber) + 1;
            this.drawPage(page, this.pageLength);
            numberSpan.textContent = `${page}`;
        })

        itemsCounter.addEventListener('change', (e) => {
            const target = <HTMLInputElement>e.target;
            const newValue = target.value;
            if (this.getLocalStorage().length === 0) {
                return;
            }
            this.pageLength = Number(newValue);
            this.drawPage(1, this.pageLength);
            const numberSpan = <HTMLSpanElement>document.querySelector('.pages__number');
            numberSpan.textContent = '1';
            this.setLengthParams(this.pageLength);
        })

        return productsPanel;
    }

    private createSummary() {
        const summary = document.createElement('div');
        summary.className = 'summary';

        const title = document.createElement('h3');
        title.className = 'summary__title';
        title.textContent = 'Summary';
        summary.append(title);

        const productsCounter = document.createElement('div');
        productsCounter.className = 'summary__products';
        summary.append(productsCounter);

        const productsTitle = document.createElement('h4');
        productsTitle.className = 'summary__products-title';
        productsTitle.textContent = 'Products: ';
        productsCounter.append(productsTitle);

        let finalSumLocalStorage = JSON.parse(localStorage.cartItems)
        let sum = 0;
        let sumCount = 0;
        for (let i = 0; i < finalSumLocalStorage.length; i++) {
            if (finalSumLocalStorage[i]['count'] == undefined) {
                finalSumLocalStorage[i]['count'] = 1;
            }
            sum += finalSumLocalStorage[i]['count'] * finalSumLocalStorage[i]['price'];
            sumCount += finalSumLocalStorage[i]['count'];
        }

        const productsNumber = document.createElement('span');
        productsNumber.className = 'summary__products-number';
        const storageProducts: Product[] = JSON.parse(localStorage.cartItems);

        productsNumber.textContent = `${sumCount}`;
        productsCounter.append(productsNumber);

        const total = document.createElement('div');
        total.className = 'summary__total';
        summary.append(total);

        const totalTitle = document.createElement('h4');
        totalTitle.className = 'summary__total-title';
        totalTitle.textContent = 'Total: ';
        total.append(totalTitle);

        const totalNumber = document.createElement('span');
        totalNumber.className = 'summary__total-number';
        const storageSum: number = storageProducts.reduce((sum: number, el: Product) => sum + el.price, 0);

        totalNumber.textContent = `$${sum}` || '$0';
        total.append(totalNumber);

        const totalPromo = document.createElement('div');
        totalPromo.className = 'summary__total_promo';
        summary.append(totalPromo);

        const totalTitlePromo = document.createElement('h4');
        totalTitlePromo.className = 'summary__total-title_promo';
        totalPromo.append(totalTitlePromo);

        const totalNumberPromo = document.createElement('span');
        totalNumberPromo.className = 'summary__total-number_promo';
        totalPromo.append(totalNumberPromo);

        const promo = document.createElement('div');
        promo.className = 'summary__promo';
        summary.append(promo);

        const promoInput = document.createElement('input');
        promoInput.type = 'text';
        promoInput.className = 'summary__promo-input';
        promoInput.placeholder = 'Enter promo code';
        const promoText = document.createElement('p');
        promoText.className = 'summary__promo-text';
        promoText.textContent = 'Test promo codes: EX22, SV22';

        promo.append(promoInput);
        promo.append(promoText);

        let promoArray = ['EX22', 'SV22'];

        let couponLocalstorage = JSON.parse(localStorage.promoItems);
        console.log(couponLocalstorage);

        if (couponLocalstorage.length !== 0) {
            for (let i = 0; i < couponLocalstorage.length; i++) {

                let couponLocalstorageUpdated = JSON.parse(localStorage.promoItems);

                totalNumberPromo.textContent = `$${Number(totalNumber.textContent?.substring(1)) - (Number(totalNumber.textContent?.substring(1)) * 10 * (couponLocalstorageUpdated.length)) / 100}`

                totalTitle.style.textDecoration = 'line-through'
                totalNumber.style.textDecoration = 'line-through'
                totalTitlePromo.textContent = 'Total: ';

                const promoItemsContainer = document.createElement('div');
                promoItemsContainer.className = 'promo-container';
                const promoItem = document.createElement('p');
                const promoButtonAddCoupon = document.createElement('button');
                promoButtonAddCoupon.className = 'button-add-coupon remove';
                promoButtonAddCoupon.textContent = 'drop';
                promoItem.className = 'promo-item';
                promoItem.textContent = `${couponLocalstorage[i]} coupon = -10%`
                promoItemsContainer.append(promoItem);
                promoItemsContainer.append(promoButtonAddCoupon);
                promo.append(promoItemsContainer);

                promoButtonAddCoupon.addEventListener('click', (e) => {
                    e.preventDefault();
                    if (promoButtonAddCoupon.classList.contains('remove')) {
                        promoButtonAddCoupon.className = 'button-add-coupon remove'
                        promoButtonAddCoupon.textContent = 'drop';
                        const totalSumm = <HTMLDivElement>document.querySelector('.summary__total-number');
                        const changeStyleTitle = <HTMLDivElement>document.querySelector('.summary__total-title');
                        const changeStyleNumber = <HTMLDivElement>document.querySelector('.summary__total-number');

                        promoButtonAddCoupon.remove();
                        promoItem.remove();
                        totalNumberPromo.textContent = `$${Number(totalNumber.textContent?.substring(1)) - (Number(totalNumber.textContent?.substring(1)) * 10 * (couponLocalstorageUpdated.length)) / 100}`



                        let couponLocalstorage = JSON.parse(localStorage.promoItems);
                        let newArray = couponLocalstorage.filter((item: string) => item !== couponLocalstorage[i]);
                        localStorage.promoItems = JSON.stringify(newArray);

                        let result = JSON.parse(localStorage.promoItems);




                        totalTitlePromo.textContent = 'Total: ';
                        changeStyleTitle.style.textDecoration = 'line-through';
                        changeStyleNumber.style.textDecoration = 'line-through';


                    }


                })






            }
        }


        promoInput.addEventListener('input', updateValue);
        function updateValue(this: HTMLInputElement, ev: Event) {
            let couponLocalstorage = JSON.parse(localStorage.promoItems);
            console.log(couponLocalstorage);

            if (promoArray.includes(promoInput.value.toUpperCase()) && !couponLocalstorage.includes(promoInput.value.toUpperCase())) {
                let couponLocalstorage = JSON.parse(localStorage.promoItems);




                const promoItemsContainer = document.createElement('div');
                promoItemsContainer.className = 'promo-container';
                const promoItem = document.createElement('p');
                const promoButtonAddCoupon = document.createElement('button');
                promoButtonAddCoupon.className = 'button-add-coupon';
                promoButtonAddCoupon.textContent = 'add';
                promoItem.className = 'promo-item';
                promoItem.textContent = `${promoInput.value} coupon = -10%`



                promoItemsContainer.append(promoItem);
                promoItemsContainer.append(promoButtonAddCoupon);
                promo.append(promoItemsContainer);



                console.log(`you added promocode ${promoInput.value}`);

                console.log('aaa')


                promoButtonAddCoupon.addEventListener('click', (e) => {
                    e.preventDefault();

                    promoButtonAddCoupon.classList.toggle('remove')
                    if (promoButtonAddCoupon.classList.contains('remove')) {
                        promoButtonAddCoupon.className = 'button-add-coupon remove'
                        promoButtonAddCoupon.textContent = 'drop';
                        const totalSumm = <HTMLDivElement>document.querySelector('.summary__total-number');
                        const changeStyleTitle = <HTMLDivElement>document.querySelector('.summary__total-title');
                        const changeStyleNumber = <HTMLDivElement>document.querySelector('.summary__total-number');


                        let couponLocalstorageUpdated = JSON.parse(localStorage.promoItems);
                        if (couponLocalstorageUpdated.length === 0) {
                            totalNumberPromo.textContent = `$${Number(totalSumm.textContent?.substring(1)) - (Number(totalSumm.textContent?.substring(1)) * 10) / 100}`
                        } else {
                            totalNumberPromo.textContent = `$${Number(totalSumm.textContent?.substring(1)) - (Number(totalSumm.textContent?.substring(1)) * 10 * (couponLocalstorageUpdated.length + 1)) / 100}`
                        }

                        couponLocalstorage.push(promoInput.value.toUpperCase());
                        localStorage.promoItems = JSON.stringify(couponLocalstorage)
                        totalTitlePromo.textContent = 'Total: ';
                        changeStyleTitle.style.textDecoration = 'line-through';
                        changeStyleNumber.style.textDecoration = 'line-through';


                    } else {
                        promoButtonAddCoupon.className = 'button-add-coupon'
                        promoButtonAddCoupon.textContent = 'add';

                        let couponLocalstorage = JSON.parse(localStorage.promoItems);
                        let newArray = couponLocalstorage.filter((item: string) => item !== promoInput.value.toUpperCase());
                        localStorage.promoItems = JSON.stringify(newArray);



                        promoButtonAddCoupon.remove();
                        promoItem.remove();

                        let couponLocalstorageUpdated = JSON.parse(localStorage.promoItems);
                        const totalSumm = <HTMLDivElement>document.querySelector('.summary__total-number');
                        const changeStyleTitle = <HTMLDivElement>document.querySelector('.summary__total-title');
                        const changeStyleNumber = <HTMLDivElement>document.querySelector('.summary__total-number');

                        if (couponLocalstorageUpdated.length === 0) {
                            totalTitlePromo.textContent = '';
                            totalNumberPromo.textContent = ''
                            changeStyleTitle.style.textDecoration = 'none'
                            changeStyleNumber.style.textDecoration = 'none'
                        } else {
                            totalNumberPromo.textContent = `$${Number(totalSumm.textContent?.substring(1)) - (Number(totalSumm.textContent?.substring(1)) * 10 * (couponLocalstorageUpdated.length)) / 100}`

                        }



                    }


                })


            }

        }


        const buyButton = document.createElement('button');
        buyButton.className = 'summary__button';
        buyButton.textContent = 'BUY NOW';
        summary.append(buyButton);

        buyButton.addEventListener('click', (e) => {
            e.preventDefault();
            const modal = new Modal();
            modal.draw();
        })

        this.summary.append(summary);
    }

    private setLengthParams(length: number) {
        const url = new URL(window.location.href);
        const pageParam = url.searchParams.get('length');
        if (pageParam) {
            url.searchParams.delete('length');
            url.searchParams.set('length', length.toString());
        } else {
            url.searchParams.set('length', length.toString());
        }
        window.history.pushState(null, '', url);
    }

    private setPageParams(page: number) {
        const url = new URL(window.location.href);
        const pageParam = url.searchParams.get('page');
        if (pageParam) {
            url.searchParams.delete('page');
            url.searchParams.set('page', page.toString());
        } else {
            url.searchParams.set('page', page.toString());
        }
        window.history.pushState(null, '', url);
    }

    private createPaginationArray(itemsPerPage: number) {
        const cartItems = this.getLocalStorage();
        if (cartItems.length === 0) {
            this.main.innerHTML = '';
            this.summary.style.display = 'none';
            this.showNothingAdded();
        }
        const paginationArr = [];
        for (let i = 0; i < cartItems.length; i += itemsPerPage) {
            paginationArr.push(cartItems.slice(i, i + itemsPerPage));
        }
        this.maxPage = paginationArr.length;
        return paginationArr;
    }

    private drawPage(pageNumber: number, pageLength: number) {
        this.cards.innerHTML = '';
        const pageItems = this.createPaginationArray(pageLength);
        if (pageNumber > pageItems.length) {
            return;
        }
        const itemsToDraw = pageItems[pageNumber - 1];
        let counter = 0;
        if (pageNumber > 1) {
            counter = pageLength * (pageNumber - 1);
        }
        itemsToDraw.forEach((item, index) => {
            const orderNumber = counter + (index + 1);
            const card = new CartProduct(item, orderNumber);
            const productCard = card.draw();
            this.cards.append(productCard);
        })
        this.setPageParams(pageNumber);
        this.setLengthParams(pageLength);
    }

    getLocalStorage() {
        const storageItems: Product[] = JSON.parse(localStorage.cartItems);
        return storageItems;
    }

    showNothingAdded() {
        const noAdded = document.createElement('h2');
        noAdded.className = 'no-added';
        noAdded.textContent = 'Cart is empty';
        this.main.append(noAdded);
    }

    draw() {
        const url = new URL(window.location.href);
        // url.searchParams.delete('category');
        // url.searchParams.delete('brand');
        // url.searchParams.delete('price');
        // url.searchParams.delete('stock');
        // url.searchParams.delete('sort');
        // url.searchParams.delete('search');
        // url.searchParams.delete('layout');
        // window.history.pushState(null, '', url);

        const cartHeader = this.header.draw();
        this.container.append(cartHeader);

        this.container.append(this.main);

        this.main.append(this.products);

        const productsPanel = this.createProductsCounter();
        this.products.append(productsPanel);

        this.products.append(this.cards);

        const pageParam = url.searchParams.get('page') || '';
        const lengthParam = url.searchParams.get('length') || '';

        if (pageParam && lengthParam) {
            this.drawPage(Number(pageParam), Number(lengthParam));
        } else {
            this.drawPage(this.pageNumber, this.pageLength);
        }



        this.main.append(this.summary);

        this.createSummary();

        return this.container;

    }
}

export default CartPage;