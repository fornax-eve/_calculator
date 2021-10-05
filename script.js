let title = "calculator";
let screens = "Simple, Complex, Interactive";
let screenPrice = 15_000;
let rollback = 7;
let adaptive = true;
let allServicePrices; //суммa всех дополнительных услуг
let fullPrice; //суммa стоимости верстки и стоимости дополнительных услуг
let servicePercentPrice; //итоговая стоимость(fullPrice) минус сумма отката
let discount = 0;

title = prompt('Как называется ваш проэкт?');
screens = prompt('Какие типы экранов нужно разработать? Ввод через запятую');
screenPrice = parseInt(prompt('Сколько будет стоить данная работа?'));
adaptive = confirm("Нужен ли адаптив на сайте?");


let service1 = prompt('Какой дополнительный тип услуги нужен?');
let servicePrice1 = 0;
service1 ? servicePrice1 = parseInt(prompt('Сколько это будет стоить?')) : servicePrice1;

let service2 = prompt('Какой дополнительный тип услуги нужен?');
let servicePrice2 = 0;
service2 ? servicePrice2 = parseInt(prompt('Сколько это будет стоить?')) : servicePrice2;

const showTypeOf = function (variable) {
    console.log(variable, typeof variable)
}

const getAllServicePrices = function (x, y) {
    return x + y;
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

allServicePrices = getAllServicePrices(servicePrice1, servicePrice2);
fullPrice = getFullPrice(allServicePrices, screenPrice);
servicePercentPrice = getServicePercentPrices(fullPrice, rollback);

getRollbackMessage(fullPrice)
showTypeOf(title)
showTypeOf(screenPrice)
showTypeOf(adaptive)

console.log(screens.split(', '))

console.log(getServicePercentPrices(fullPrice, rollback))
