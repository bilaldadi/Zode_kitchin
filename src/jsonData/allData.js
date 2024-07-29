import beveragesData from './beveragesData.js';
import snacksData from './snacksData.js';
import dessertsData from './dessertsData.js';
import fruitsData from './fruitsData.js';


const allItems = [
    ...beveragesData.beverages.map(item => ({ ...item, category: 'Beverage' })),
    ...snacksData.snacks.map(item => ({ ...item, category: 'Snack' })),
    ...dessertsData.desserts.map(item => ({ ...item, category: 'Dessert' })),
    ...fruitsData.fruits.map(item => ({ ...item, category: 'Fruit' })),
];

export default allItems;