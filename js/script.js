'use strict';

const title = document.getElementsByTagName('h1')[0];
const buttonPlus = document.querySelector('.screen-btn');
const otherItemsPercent = document.querySelectorAll('.other-items.percent');
const otherItemsNumber = document.querySelectorAll('.other-items.number');

const inputRange = document.querySelector('.rollback [type="range"]');
const inputRangeValue = document.querySelector('.rollback [class = "range-value"]');

const startBtn = document.getElementsByClassName('handler_btn')[0];
const resetBtn = document.getElementsByClassName('handler_btn')[1];

const total = document.getElementsByClassName('total-input')[0];
const totalCount = document.getElementsByClassName('total-input')[1];
const totalCountOther = document.getElementsByClassName('total-input')[2];
const fullTotalCount = document.getElementsByClassName('total-input')[3];
let totalCountRollback = document.getElementsByClassName('total-input')[4];

let screens = document.querySelectorAll('.screen');

const appData = {
    title: '',
    screens: [],
    count: 0,
    screenPrice: 0,
    servicesPercent: {},
    servicesNumber: {},
    rollback: 10,
    adaptive: true,
    servicePricesPercent: 0,
    servicePricesNumber: 0,
    fullPrice: 0,
    rollbackFullPrice: 0,
    checkVariable: true,
    init: function () {
        appData.addTitle();
        console.log(appData.screens);
        inputRange.value = appData.rollback;
        inputRangeValue.textContent = appData.rollback + '%';
        startBtn.addEventListener('mouseover', appData.checkAllFieldsInput);
        startBtn.addEventListener('click', appData.start);
        buttonPlus.addEventListener('click', appData.addScreenBlock);
        inputRange.addEventListener('input', appData.rollbackPersent)
    },
    addTitle: function () {
        document.title = title.textContent;
    },
    addScreens: function () {
        appData.screens = [];

        screens.forEach((screen, index) => {
            const select = screen.querySelector('select');
            const input = screen.querySelector('input');
            const selectName = select[select.selectedIndex].textContent;
            appData.screens.push({
                id: index,
                name: selectName,
                price: +select.value * +input.value,
                count: +input.value
            })
        })
    },
    addScreenBlock: function () {

        const cloneScreen = screens[0].cloneNode(true);
        cloneScreen.querySelector('input').value = '';
        screens[screens.length - 1].after(cloneScreen);
        screens = document.querySelectorAll('.screen');
    },
    checkAllFieldsInput: function () {
        screens.forEach((screen, index) => {
            const select = screen.querySelector('select');
            const input = screen.querySelector('input');
            if (select[select.selectedIndex] == 0 || !appData.isNumber(+input.value)) {
                appData.checkVariable = false;
                alert('Для расчётов Вы должны корректно заполнить все обязательные поля!');
            } else {
                appData.checkVariable = true;
            }
        })
    },
    addServices: function () {
        appData.servicePricesNumber = 0;
        appData.servicePricesPercent = 0;
        otherItemsPercent.forEach(function (element) {
            const check = element.querySelector('input[type = "checkbox"]');
            const label = element.querySelector('label');
            const input = element.querySelector('input[type = "text"]');
            console.log(check);
            console.log(label);
            console.log(input);
            if (check.checked) {
                appData.servicesPercent[label.textContent] = +input.value;
            }
        })
        otherItemsNumber.forEach(function (element) {
            const check = element.querySelector('input[type = "checkbox"]');
            const label = element.querySelector('label');
            const input = element.querySelector('input[type = "text"]');
            if (check.checked) {
                appData.servicesNumber[label.textContent] = +input.value;
            }
        })
    },
    addPrices: function () {
        appData.screenPrice = appData.screens.reduce(function (total, amount) {
            return total += amount.price
        }, 0)
        for (let key in appData.servicesNumber) {
            appData.servicePricesNumber += appData.servicesNumber[key];
        }
        for (let key in appData.servicesPercent) {
            appData.servicePricesPercent += Math.round(appData.screenPrice * (appData.servicesPercent[key] / 100));
        }
        appData.fullPrice = +appData.screenPrice + appData.servicePricesPercent + appData.servicePricesNumber;
        appData.rollbackFullPrice = Math.round(appData.fullPrice - (appData.fullPrice * (appData.rollback / 100)));
        totalCountRollback.value = appData.rollbackFullPrice;
        totalCount.value = appData.screens.reduce(function (total, current) {
            return total += current.count;
        }, 0)
    },
    rollbackPersent: function () {
        appData.rollback = inputRange.value;
        inputRangeValue.textContent = appData.rollback + '%';
        if (totalCountRollback.value) {
            totalCountRollback.value = Math.round(appData.fullPrice - (appData.fullPrice * (appData.rollback / 100)));
        }
    },
    showResult: function () {
        total.value = appData.screenPrice;
        totalCountOther.value = appData.servicePricesPercent + appData.servicePricesNumber;
        fullTotalCount.value = appData.fullPrice;
    },
    isNumber: function (num) {
        if (num) {
            if (!isNaN(parseFloat(num) && isFinite(num)) && (num ^ 0) === num) {
                return true;
            }
        }
        return false;
    },
    // isString: function (str) {
    //
    //     let pattern = /^[\s]+$/
    //
    //     if (appData.isNumber(str)) {
    //         return false
    //     } else if (pattern.test(str)) {
    //         alert('Сами пробелы не подходят');
    //         return false;
    //     } else if (str) {
    //         return true
    //     } else {
    //         return false
    //     }
    // },
    getServicePercentPrices: function () {
        appData.rollbackFullPrice = Math.round(appData.fullPrice - (appData.fullPrice * (appData.rollback / 100)));
    },
    start: function () {
        if (appData.checkVariable) {
            appData.addScreens();
            appData.addServices();
            appData.addPrices();
            console.log(appData);
            appData.showResult();
        } else {
            return;
        }

    }
}

appData.init();
