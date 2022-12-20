import Header from './components/header/header';
import Filters from './components/filters/filters';
import Cards from './components/Cards/cards';
import './global.css';

import products from './utils/products';

const header = new Header();
const headerContainer = header.draw();
document.body.prepend(headerContainer)

const filters = new Filters();
const mainFilters = filters.drawFilters();
const content = document.querySelector('.content');
content?.append(mainFilters);

const cards = new Cards();
cards.drawCards();

