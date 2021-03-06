'use strict';

let isNumber = function(n){
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let money;

let start = function(){
    do {
        money = prompt('Ваш месячный доход?');
    } while (!isNumber(money));
};

start();

let appData = {
    income: {},
    addIncome: [],
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    expenses: {},
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    mission: 50000,
    period: 3,
    asking: function(){

        if(confirm('Есть ли у вас дополнительный источник заработка?')){
            let itemIncome = prompt('Укажите ваш дополнительный заработок', 'Такси');
            while(isNumber(itemIncome)){
                itemIncome = prompt('Укажите ваш дополнительный заработок (Введите корректное значение)', 'Такси');
            }

            let cashIncome = prompt('Сколько вы зарабатываете на этом?', 20000);
            while(!isNumber(cashIncome)){
                cashIncome = prompt('Сколько вы зарабатываете на этом? (Введите корректное значение)', 20000);
            }

            appData.income[itemIncome] = cashIncome;
        }

        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
        appData.addExpenses = addExpenses.toLowerCase().split(', ');
        appData.deposit = confirm('Есть ли у вас депозит в банке?');
        

        let expenseItem,
            expenseItemPrice;

        for(let i = 0; i < 2; i++){
            expenseItem = prompt('Введите обязательную статью расходов?');
            while(isNumber(expenseItem)){
                expenseItem = prompt('Введите обязательную статью расходов? (Введите корректное значение)');
            }

            expenseItemPrice = prompt('Во сколько это обойдется?');
            while(!isNumber(expenseItemPrice)){
                expenseItemPrice = prompt('Во сколько это обойдется? (Введите корректное значение)');
            }

            appData.expenses[expenseItem] = +expenseItemPrice;
        }
    },
    getExpensesMonth: function (){
        let sum = 0;

        for (let expens in appData.expenses) {
            sum += appData.expenses[expens];
        }
        appData.expensesMonth = sum;
    },
    getBudget: function (){
        appData.budgetMonth = appData.budget - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);
    },
    getTargetMonth: function (){
        let res = Math.ceil(appData.mission / appData.budgetMonth);
        if(res > 0){
            return 'Цель будет достигнута';
        } else {
            return 'Цель не будет достигнута';
        }
    },
    getStatusIncome: function(){
        if(appData.budgetDay >= 1200) {
            return ('Высокий уровень дохода');
        }
        else if(appData.budgetDay >= 600) {
            return ('У вас средний уровень дохода');
        }
        else if(appData.budgetDay < 600) {
            return ('К сожалению у вас уровень дохода ниже среднего');
        }
        else if(appData.budgetDay < 0) {
            return ('Что то пошло не так');
        }
    },
    getInfoDeposit: function(){
        if(appData.deposit){
            appData.percentDeposit = prompt('Какой годовой процент?', '10');
            while(!isNumber(appData.percentDeposit)){
                appData.percentDeposit = prompt('Какой годовой процент? (Введите корректное значение)', '10');
            }
            appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);
            while(!isNumber(appData.moneyDeposit)){
                appData.moneyDeposit = prompt('Какая сумма заложена? (Введите корректное значение)', 10000);
            }
        }
    },
    calcSavedMoney: function(){
        return appData.budgetMonth * appData.period;
    }
};

appData.asking();
appData.getExpensesMonth();
appData.getBudget();
console.log(appData.getTargetMonth());
console.log(appData.getStatusIncome());

for (let key in appData) {
    console.log(key + " " + appData[key]);
}

console.log(appData.addExpenses.join(', '));