let money = +prompt('Ваш бюджет на месяц?', '');
let time = prompt('Введите дату в формате YYYY-MM-DD', '');

appData = {
    budget: money,
    expenses: {},   
    optionalExpenses: {},
    income: [],
    timeData: time,
    salving: false,
};

for (let i = 0; i < 2; i++) {
    let a = prompt('Введите обязательную статью расходов в этом месяце'),
        b = prompt('Во сколько обойдется?');
    
    if ( (typeof(a)) ==='string' && (typeof(a)) != null && (typeof(b)) != null
        && a != '' && b != '' && a.length < 50 ) {
            console.log('done');
            appData.expenses[a] = b
        } else {
            i -= 1;
    }
};

appData.moneyPerDay = appData.budget / 30;

alert('Ежедневный бюджет: ' + appData.moneyPerDay);

if (appData.moneyPerDay < 100) {
    console.log('Минимальный уровень достатка');
} else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
    console.log('Средний уровень достатка');
} else if (appData.moneyPerDay > 2000) {
    console.log('Высокий уровень достатка');
} else {
    console.log('Произошла ошибка');
}