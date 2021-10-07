'use strict';
let rollback = 7;

let title = prompt('Как называется ваш проэкт?');
let screens = prompt('Какие типы экранов нужно разработать?', 'Simple, Complex, Interactive');
let screenPrice = parseInt(prompt('Сколько будет стоить данная работа?', '15000'));
let adaptive = confirm("Нужен ли адаптив на сайте?");


let service1 = prompt('Какой дополнительный тип услуги нужен?');
let servicePrice1 = parseInt(prompt('Сколько это будет стоить?'));
let service2 = prompt('Какой дополнительный тип услуги нужен?');
let servicePrice2 = parseInt(prompt('Сколько это будет стоить?'));

let fullPrice = screenPrice + servicePrice1 + servicePrice2;

let servicePercentPrice = Math.ceil(fullPrice * (rollback / 100));

let discount = 0;
switch (true) {
    case fullPrice > 30_000 :
        discount = fullPrice * 0.1;
        alert(`Даем скидку в 10%, что равно ${discount} рублей`);
        break;
    case fullPrice <= 30_000 && fullPrice > 15_000 :
        discount = fullPrice * 0.05;
        alert(`Даем скидку в 5%, что равно ${discount} рублей`);
        break;
    case fullPrice <= 15_000 && fullPrice > 0 :
        discount = 0;
        alert(`Скидка не предусмотрена.`);
        break;
    case fullPrice <= 0 :
        discount = undefined;
        alert(`Что то пошло не так`);
        break;
};

console.group("Types of data")
console.log("title - " + typeof title)
console.log("fullPrice - " + typeof fullPrice)
console.log("adaptive - " + typeof adaptive)
console.groupEnd()

console.group("Length of screens")
console.log(screens.length)
console.groupEnd()

console.group("Prices :")
console.log("Стоимость верстки экранов (" + screenPrice + ") рублей/ долларов/гривен/юани")
console.log("Стоимость разработки сайта (" + fullPrice + ") рублей/ долларов/гривен/юани")
console.groupEnd()

console.log(screens.toLowerCase().split(", "))

console.group("Percentage of rollback to the intermediary for work :")
console.log(fullPrice * (rollback / 100))
console.groupEnd()

console.log(servicePercentPrice);
console.log(Math.round(discount));
