'use strict';

const appData = {
    title: '',
    screens: '',
    screenPrice: 0,
    service1: '',
    service2: '',
    rollback: 10,
    adaptive: true,
    allServicePrices: 0,
    fullPrice: 0,
    servicePercentPrice: 0,
    asking: function () {
        appData.title = prompt('Как называется ваш проэкт?', 'Калькулятор вёрстки');
        appData.screens = prompt('Какие типы экранов нужно разработать?', 'Простые, сложные');

        do {
            appData.screenPrice = +prompt('Сколько будет стоить данная работа?', 15000);
        } while (!appData.isNumber(appData.screenPrice))

        appData.adaptive = confirm("Нужен ли адаптив на сайте?");
    },
    isNumber: function (num) {
        if (num) {
            return !isNaN(parseFloat(num) && isFinite(num))
        }
        ;
        return false;
    },
    getAllServicePrices: function () {
        let sum = 0;
        for (let i = 0; i < 2; i++) {
            if (i === 0) {
                appData.service1 = prompt('Какой дополнительный тип услуги нужен?')
            } else if (i === 1) {
                appData.service2 = prompt('Какой дополнительный тип услуги нужен?')
            }
            let sum1 = 0;
            do {
                sum1 = +prompt('Сколько это будет стоить?').trim()
            } while (!appData.isNumber(sum1))
            sum += sum1;
        }
        return sum;
    },
    getFullPrice: function (a, b) {
        return a + b;
    },
    getTitle: function (str) {
        let newStr = str.trim().toLowerCase();
        return newStr[0].toUpperCase() + newStr.substring(1)
    },
    getServicePercentPrices: function (fullP, rollB) {
        return Math.ceil(fullP - fullP * (rollB / 100));
    },
    getRollbackMessage: function (price) {
        let discount;
        switch (true) {
            case price > 30_000 :
                discount = price * 0.1;
                console.log(`Даем скидку в 10%, что равно ${discount} рублей`);
                break;
            case (price <= 30_000) && (price > 15_000) :
                discount = price * 0.05;
                console.log(`Даем скидку в 5%, что равно ${discount} рублей`);
                break;
            case (price <= 15_000) && (price > 0) :
                discount = 0;
                console.log(`Скидка не предусмотрена.`);
                break;
            case price <= 0 :
                discount = 0;
                console.log(`Что то пошло не так`);
                break;
        }
    },
    logger: function () {
        console.log(appData.fullPrice)
        console.log(appData.servicePercentPrice)
        for (let key in appData) {
            console.log(key)
        }
    },
    start: function () {
        appData.asking();
        appData.allServicePrices = appData.getAllServicePrices();
        appData.fullPrice = appData.getFullPrice(appData.allServicePrices, appData.screenPrice);
        appData.servicePercentPrice = appData.getServicePercentPrices(appData.fullPrice, appData.rollback);

        appData.title = appData.getTitle(appData.title);
        appData.getRollbackMessage(appData.fullPrice);
        appData.logger();
    }
}

appData.start();
