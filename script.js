'use strict';

const appData = {
    title: '',
    screens: [],
    screenPrice: 0,
    services: {},
    rollback: 10,
    adaptive: true,
    allServicePrices: 0,
    fullPrice: 0,
    servicePercentPrice: 0,
    asking: function () {
        do {
            appData.title = prompt('Как называется ваш проэкт?', 'Калькулятор вёрстки');
        } while (!appData.isString(appData.title));
        // appData.screens = prompt('Какие типы экранов нужно разработать?', 'Простые, сложные');
        //
        // do {
        //     appData.screenPrice = +prompt('Сколько будет стоить данная работа?', 15000);
        // } while (!appData.isNumber(appData.screenPrice))

        for (let i = 0; i < 2; i++) {
            let name;
            do {
                name = prompt('Какие типы экранов нужно разработать??');
            } while (!appData.isString(name));

                let price = 0;
                do {
                    price = +prompt('Сколько будет стоить данная работа?', 15000);
                } while (!appData.isNumber(price))
                appData.screens.push({id: i, name: name, price: price})
        }

        for (let i = 0; i < 2; i++) {
            let name;
            do {
                name = prompt('Какой дополнительный тип услуги нужен?');
            } while (!appData.isString(name));
                let price = 0;
                do {
                    price = +prompt('Сколько это будет стоить?').trim()
                } while (!appData.isNumber(price))
                appData.services[name] = price;
        }

        appData.adaptive = confirm("Нужен ли адаптив на сайте?");
    },
    addPrices: function () {
        for (let screen of appData.screens) {
            appData.screenPrice += +screen.price
        }
        for (let key in appData.services) {
            appData.allServicePrices += appData.services[key];
        }
    },
    isNumber: function (num) {
        if (num) {
            return !isNaN(parseFloat(num) && isFinite(num))
        }
        ;
        return false;
    },
    isString: function (str) {
        if (appData.isNumber(str)) {
            return false
        } else if (str) {
            return true
        } else {
            return false
        }
    },
    getFullPrice: function () {
        appData.fullPrice = +appData.screenPrice + appData.allServicePrices;
    },
    getTitle: function () {
        appData.title = appData.title.trim()[0].toUpperCase() + appData.title.trim().substr(1).toLowerCase();
    },
    getServicePercentPrices: function () {
        appData.servicePercentPrice = Math.round(appData.fullPrice - (appData.fullPrice * (appData.rollback / 100)));
    },
    getRollbackMessage: function (price) {
        let discount;
        switch (true) {
            case price > 30_000 :
                discount = price * 0.1;
                console.log(`Даем скидку в 10%, что равно ${Math.round(discount)} рублей`);
                break;
            case (price <= 30_000) && (price > 15_000) :
                discount = price * 0.05;
                console.log(`Даем скидку в 5%, что равно ${Math.round(discount)} рублей`);
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
        console.log(appData.screens)
        for (let key in appData) {
            console.log(key)
        }
    },
    start: function () {
        appData.asking();
        appData.addPrices();
        appData.getFullPrice();
        appData.getServicePercentPrices();

        appData.title = appData.getTitle(appData.title);
        appData.getRollbackMessage(appData.fullPrice);
        appData.logger();
    }
}

appData.start();
