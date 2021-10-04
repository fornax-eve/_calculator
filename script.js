let title = "_calculator";
let screens = "Simple, Complex, Interactive";
let screenPrice = 15_000;
let rollback = 7;
let fullPrice = 27_000;
let adaptive = true;

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

title = prompt('Как называется ваш проэкт?');
screens = prompt('Какие типы экранов нужно разработать?');
screenPrice = parseInt(prompt('Сколько будет стоить данная работа?'));
adaptive = confirm("Нужен ли адаптив на сайте?");

if (screenPrice) {
    let service1 = prompt('Какой дополнительный тип услуги нужен?');
    let servicePrice1 = 0;
    service1 ? servicePrice1 = parseInt(prompt('Сколько это будет стоить?')) : servicePrice1;

    let service2 = prompt('Какой дополнительный тип услуги нужен?');
    let servicePrice2 = 0;
    service2 ? servicePrice2 = parseInt(prompt('Сколько это будет стоить?')) : servicePrice2;

    fullPrice = screenPrice + servicePrice1 + servicePrice2;
    alert(fullPrice)
} else {
    alert('Вы не ввели стоимость проэкта')
};

let servicePercentPrice = Math.ceil(fullPrice * (rollback / 100));
console.log(servicePercentPrice);

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
console.log(discount);
