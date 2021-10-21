'use strict';

const title = document.getElementsByTagName('h1')[0];
const buttonPlus = document.querySelector('.screen-btn');
const otherItemsPercent = document.querySelectorAll('.other-items.percent');
const otherItemsNumber = document.querySelectorAll('.other-items.number');

const forBlockingCheckAfterCalculating = document.querySelectorAll('.main-controls__item.other-items');

const cms = document.getElementById('cms-open');
const cmsSelect = document.getElementById('cms-select');
const hiddenCmsVariants = document.querySelector('.hidden-cms-variants');
const inputHidden = hiddenCmsVariants.querySelector('.main-controls__input');

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
        this.addTitle();
        // console.log(appData.screens);
        inputRange.value = this.rollback;
        inputRangeValue.textContent = this.rollback + '%';
        startBtn.addEventListener('mouseover', this.checkAllFieldsInput.bind(appData));
        startBtn.addEventListener('click', this.start.bind(appData));
        buttonPlus.addEventListener('click', this.addScreenBlock.bind(appData));
        inputRange.addEventListener('input', this.rollbackPersent.bind(appData));
        resetBtn.addEventListener('click', this.resetAll.bind(appData));
        cms.addEventListener('change', this.openCmsBlock.bind(appData));
        forBlockingCheckAfterCalculating.forEach(elem => {
            const check = elem.querySelector('[type="checkbox"]');
            const input = elem.querySelector('[type="text"]');
            const value = +input.value;
            check.addEventListener('change', () => {
                if (check.checked) {
                    input.removeAttribute('disabled')
                } else {
                    input.value = value;
                    input.setAttribute('disabled', 'disabled')
                }
            })
            resetBtn.addEventListener('mouseup', () => {
                input.value = value;
            })
        })
    },
    addTitle: function () {
        document.title = title.textContent;
    },
    addScreens: function () {
        this.screens = [];

        screens.forEach((screen, index) => {
            const select = screen.querySelector('select');
            const input = screen.querySelector('input');
            const selectName = select[select.selectedIndex].textContent;
            this.screens.push({
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
            if (select[select.selectedIndex] == 0 || !this.isNumber(+input.value)) {
                this.checkVariable = false;
            } else {
                this.checkVariable = true;
            }
        });
        if (this.checkVariable == true) {
            otherItemsPercent.forEach(percent => {
                const check = percent.querySelector('[type="checkbox"]');
                const input = percent.querySelector('[type="text"]');
                if (check.checked) {
                    if (!this.isNumber(+input.value) || !((0 < +input.value) && (+input.value < 100))) {
                        this.checkVariable = false;
                    }
                }
            });
            otherItemsNumber.forEach(number=> {
                const check = number.querySelector('[type="checkbox"]');
                const input = number.querySelector('[type="text"]');
                if (check.checked) {
                    if (!this.isNumber(+input.value) || !(+input.value > 0)) {
                        this.checkVariable = false;
                    }
                }
            })
        }
    },
    addServices: function () {
        this.servicePricesNumber = 0;
        this.servicePricesPercent = 0;
        otherItemsPercent.forEach((element) => {
            const check = element.querySelector('input[type = "checkbox"]');
            const label = element.querySelector('label');
            const input = element.querySelector('input[type = "text"]');
            if (check.checked) {
                this.servicesPercent[label.textContent] = +input.value;
            }
        }/*.bind(appData)*/)
        otherItemsNumber.forEach(function (element) {
            const check = element.querySelector('input[type = "checkbox"]');
            const label = element.querySelector('label');
            const input = element.querySelector('input[type = "text"]');
            if (check.checked) {
                check.setAttribute('checked', 'checked')
                this.servicesNumber[label.textContent] = +input.value;
            }
        }.bind(appData))
    },
    addPrices: function () {
        this.screenPrice = this.screens.reduce(function (total, amount) {
            return total += amount.price
        }, 0)
        for (let key in this.servicesNumber) {
            this.servicePricesNumber += this.servicesNumber[key];
        }
        for (let key in this.servicesPercent) {
            this.servicePricesPercent += Math.round(this.screenPrice * (this.servicesPercent[key] / 100));
        }
        this.fullPrice = +this.screenPrice + this.servicePricesPercent + this.servicePricesNumber;
        cmsSelect.value == '50' ? this.fullPrice *= 1.5 : this.fullPrice;

        this.rollbackFullPrice = Math.round(this.fullPrice - (this.fullPrice * (this.rollback / 100)));
        totalCountRollback.value = this.rollbackFullPrice;
        totalCount.value = this.screens.reduce(function (total, current) {
            return total += current.count;
        }, 0)
    },
    rollbackPersent: function () {
        this.rollback = inputRange.value;
        inputRangeValue.textContent = appData.rollback + '%';
        if (totalCountRollback.value) {
            totalCountRollback.value = Math.round(this.fullPrice - (this.fullPrice * (this.rollback / 100)));
        }
    },
    showResult: function () {
        total.value = this.screenPrice;
        totalCountOther.value = this.servicePricesPercent + this.servicePricesNumber;
        fullTotalCount.value = this.fullPrice;
    },
    isNumber: function (num) {
        if (num) {
            if (!isNaN(parseFloat(num) && isFinite(num)) && (num ^ 0) === num) {
                return true;
            }
        }
        return false;
    },
    blockAfterCalculating: function () {
        forBlockingCheckAfterCalculating.forEach((element) => {
            const check = element.querySelector('input[type = "checkbox"]');
            const input = element.querySelector('[type="text"]');
            check.setAttribute('disabled', 'disabled');
            input.setAttribute('disabled', 'disabled');
        });
        screens.forEach((screen, index) => {
            const select = screen.querySelector('select');
            const input = screen.querySelector('input');
            select.setAttribute('disabled', 'disabled');
            input.setAttribute('disabled', 'disabled');
        });
        startBtn.setAttribute('style', 'display:none');
        resetBtn.removeAttribute('style', 'display:none');
        cmsSelect.setAttribute('disabled', 'disabled');
        cms.setAttribute('disabled', 'disabled');
        buttonPlus.disabled = true;
    },
    resetAll: function () {
        cms.removeAttribute('disabled');
        cmsSelect.disabled = false;
        cmsSelect.selectedIndex = 0;
        while (screens.length > 1) {
            screens[1].parentNode.removeChild(screens[1])
            screens = document.querySelectorAll('.screen');
        }
        ;
        // for (let i=1; screen = screens[i]; i++) {
        //     screen.parentNode.removeChild(screen);
        // }
        screens[0].querySelector('select').removeAttribute('disabled');
        screens[0].querySelector('select').selectedIndex = 0;
        screens[0].querySelector('input').removeAttribute('disabled');
        screens[0].querySelector('input').value = '';

        forBlockingCheckAfterCalculating.forEach((element) => {
            const check = element.querySelector('input[type = "checkbox"]');
            check.removeAttribute('disabled');
            if (check.checked = true) {
                check.checked = false
            }
        });
        startBtn.removeAttribute('style', 'display:none');
        resetBtn.setAttribute('style', 'display:none');


        hiddenCmsVariants.setAttribute('style', 'display: none');
        if (cms.checked = true) {
            cms.checked = false
        }
        buttonPlus.disabled = false;
        inputRange.value = 10;
        inputRangeValue.textContent = 10 + '%';
    },
    openCmsBlock: function () {
        if( cms.checked == true) {
            hiddenCmsVariants.setAttribute('style', 'display: flex');
        } else {
            hiddenCmsVariants.setAttribute('style', 'display: none');
        }

        let mainControlsInput = () => {
            switch (cmsSelect.value) {
                case 'other':
                    inputHidden.setAttribute('style', 'display: flex');
                    break;
                case '50':
                    inputHidden.setAttribute('style', 'display: none');
                    break;
                case '':
                    inputHidden.setAttribute('style', 'display: none');
                    break;
            }
        }
        cmsSelect.addEventListener('change', mainControlsInput);
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
    start: function () {
        if (this.checkVariable) {
            this.addScreens();
            this.addServices();
            this.addPrices();
            console.log(this);
            this.showResult();
            this.blockAfterCalculating();
        } else {
            return;
        }
    }
}

const bind = Function.prototype.call.bind(Function.prototype.bind);
bind(appData.init, appData)();

// appData.init();
