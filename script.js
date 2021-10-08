'use strict';
let title;
let screens;
let screenPrice;
let service1;
let service2;
let rollback = 7;
let adaptive;
let allServicePrices; //суммa всех дополнительных услуг
let fullPrice; //суммa стоимости верстки и стоимости дополнительных услуг
let servicePercentPrice; //итоговая стоимость(fullPrice) минус сумма отката
let discount = 0;

const asking = function() {
    title = prompt('Как называется ваш проэкт?', 'Калькулятор вёрстки');
    screens = prompt('Какие типы экранов нужно разработать?', 'Простые, сложные');

    do {
        screenPrice = +prompt('Сколько будет стоить данная работа?', 15000);
    } while (!isNumber(screenPrice))

    adaptive = confirm("Нужен ли адаптив на сайте?");
}

const isNumber = function(num) {
    if (num) {
        return !isNaN(parseFloat(num) && isFinite(num))
    };
    return false;
}

const getAllServicePrices = function (x, y) {
    let sum = 0;
    for (let i = 0; i < 2; i++){
        if (i === 0) {
            service1 = prompt('Какой дополнительный тип услуги нужен?')
        } else if (i === 1) {
            service2 = prompt('Какой дополнительный тип услуги нужен?')
        }
        let sum1 = 0;
        do {
            sum1 = +prompt('Сколько это будет стоить?').trim()
        } while (!isNumber(sum1))
        sum += sum1;
    }
    return sum;
}

const showTypeOf = function (variable) {
    console.log(variable, typeof variable)
}

function getFullPrice(a, b) {
    return a + b;
}

function getTitle(str) {
    let newStr = str.trim().toLowerCase();
    return newStr[0].toUpperCase() + newStr.substring(1)
}

function getServicePercentPrices(fullP, rollB) {
    return Math.ceil(fullP - fullP * (rollB / 100));
}

function getRollbackMessage(price) {
    switch (true) {
        case price > 30_000 :
            discount = price * 0.1;
            console.log(`Даем скидку в 10%, что равно ${discount} рублей`);
            break;
        case price <= 30_000 && fullPrice > 15_000 :
            discount = fullPrice * 0.05;
            console.log(`Даем скидку в 5%, что равно ${discount} рублей`);
            break;
        case price <= 15_000 && price > 0 :
            discount = 0;
            console.log(`Скидка не предусмотрена.`);
            break;
        case price <= 0 :
            discount = 0;
            console.log(`Что то пошло не так`);
            break;
    }
}

asking();
allServicePrices = getAllServicePrices();
fullPrice = getFullPrice(allServicePrices, screenPrice);
servicePercentPrice = getServicePercentPrices(fullPrice, rollback);

title = getTitle(title)
getRollbackMessage(fullPrice)
showTypeOf(title)
showTypeOf(screenPrice)
showTypeOf(adaptive)

console.log("allServicePrices", allServicePrices)
console.log(screens.split(', '))
console.log(getServicePercentPrices(fullPrice, rollback))
