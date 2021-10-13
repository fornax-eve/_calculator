'use strict';

const calculator = document.getElementsByTagName('h1')[0];
const btnStart = document.getElementsByClassName('handler_btn')[0];
const btnReset = document.getElementsByClassName('handler_btn')[1];
const btnScreen = document.querySelector('.screen-btn');
const otherPercent = document.querySelectorAll('.other-items.percent');
const otherNumber = document.querySelectorAll('.other-items.number');
const inputRange = document.querySelector('.rollback [type="range"]');
const spanValue = document.querySelector('.rollback [class = "range-value"]')
const screenPrice = document.getElementsByClassName('total-input')[0];
const screenNumbers = document.getElementsByClassName('total-input')[1];
const servicePrices = document.getElementsByClassName('total-input')[2];
const fullPrice = document.getElementsByClassName('total-input')[3];
let screen = document.querySelectorAll('.screen');


// const appData = {
//     title: '',
//     screens: [],
//     screenPrice: 0,
//     services: {},
//     rollback: 10,
//     adaptive: true,
//     allServicePrices: 0,
//     fullPrice: 0,
//     servicePercentPrice: 0,
//     asking: function () {
//         do {
//             appData.title = prompt('Как называется ваш проэкт?', 'Калькулятор вёрстки');
//         } while (!appData.isString(appData.title));
//
//         for (let i = 0; i < 2; i++) {
//             let name;
//             do {
//                 name = prompt('Какие типы экранов нужно разработать?');
//                 console.log(name)
//             } while (!appData.isString(name));
//
//             let price = 0;
//             do {
//                 price = prompt('Сколько будет стоить данная работа?', 15000);
//             } while (!appData.isNumber(price))
//             appData.screens.push({id: i, name: name, price: +price})
//         }
//
//         for (let i = 0; i < 2; i++) {
//             let name;
//             do {
//                 name = prompt('Какой дополнительный тип услуги нужен?');
//             } while (!appData.isString(name));
//             if (typeof appData.services[name] != 'undefined') {
//                 name += i;
//             }
//             let price = 0;
//             do {
//                 price = prompt('Сколько это будет стоить?');
//             } while (!appData.isNumber(price))
//             appData.services[name] = +price;
//         }
//
//         appData.adaptive = confirm("Нужен ли адаптив на сайте?");
//     },
//     addPrices: function () {
//         appData.screenPrice = appData.screens.reduce(function(total, amount) {
//             return total += amount.price
//         }, 0)
//
//         for (let key in appData.services) {
//             appData.allServicePrices += appData.services[key];
//         }
//     },
//     isNumber: function (num) {
//         if (num) {
//             num = num.trim();
//             return !isNaN(parseFloat(num) && isFinite(num))
//         }        ;
//         return false;
//     },
//     isString: function (str) {
//
//         let pattern = /^[\s]+$/
//
//         if (appData.isNumber(str)) {
//             return false
//         } else if (pattern.test(str)) {
//             alert('Сами пробелы не подходят');
//             return false;
//         } else if (str) {
//             return true
//         } else {
//             return false
//         }
//     },
//     getFullPrice: function () {
//         appData.fullPrice = +appData.screenPrice + appData.allServicePrices;
//     },
//     getTitle: function () {
//         appData.title = appData.title.trim()[0].toUpperCase() + appData.title.trim().substr(1).toLowerCase();
//     },
//     getServicePercentPrices: function () {
//         appData.servicePercentPrice = Math.round(appData.fullPrice - (appData.fullPrice * (appData.rollback / 100)));
//     },
//     getRollbackMessage: function (price) {
//         let discount;
//         switch (true) {
//             case price > 30_000 :
//                 discount = price * 0.1;
//                 console.log(`Даем скидку в 10%, что равно ${Math.round(discount)} рублей`);
//                 break;
//             case (price <= 30_000) && (price > 15_000) :
//                 discount = price * 0.05;
//                 console.log(`Даем скидку в 5%, что равно ${Math.round(discount)} рублей`);
//                 break;
//             case (price <= 15_000) && (price > 0) :
//                 discount = 0;
//                 console.log(`Скидка не предусмотрена.`);
//                 break;
//             case price <= 0 :
//                 discount = 0;
//                 console.log(`Что то пошло не так`);
//                 break;
//         }
//     },
//     logger: function () {
//         console.log(appData.fullPrice)
//         console.log(appData.servicePercentPrice)
//         console.log(appData.screens)
//         for (let key in appData) {
//             console.log(key)
//         }
//     },
//     start: function () {
//         appData.asking();
//         appData.addPrices();
//         appData.getFullPrice();
//         appData.getServicePercentPrices();
//
//         appData.title = appData.getTitle(appData.title);
//         appData.getRollbackMessage(appData.fullPrice);
//         appData.logger();
//     }
// }
//
// appData.start();
