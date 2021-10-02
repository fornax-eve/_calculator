let     title = "_calculator";
let     screens = "Simple, Complex, Interactive";
let    screenPrice = 15_000;
let    rollback = 7;
let    fullPrice = 93_000;
let    adaptive = true;

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
console.log(fullPrice * (rollback/100))
console.groupEnd()
