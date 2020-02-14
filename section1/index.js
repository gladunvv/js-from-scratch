let money, time;

function start() {
	money = +prompt('Ваш бюджет на месяц?', '');
	time = prompt('Введите дату в формате YYYY-MM-DD', '');

	while (isNaN(money) || money == null || money == "") {
		money = +prompt('Ваш бюджет на месяц?', '');
	}
}

start();


appData = {
	budget: money,
	expenses: {},
	optionalExpenses: {},
	income: [],
	timeData: time,
	salving: true,
	chooseExpenses: function () {
		for (let i = 0; i < 2; i++) {
			let a = prompt('Введите обязательную статью расходов в этом месяце');
			let b = prompt('Во сколько обойдется?');

			if (typeof a === 'string' && typeof a != null && typeof b != null &&
				a != '' && b != '' && a.length < 50) {
				console.log('done');
				appData.expenses[a] = b;
			} else {
				i -= 1;
			}
		}
	},
	detectDayBudget: function () {
		appData.moneyPerDay = (appData.budget / 30).toFixed();
		alert('Ежедневный бюджет: ' + appData.moneyPerDay);
	},
	detectLevel: function () {
		if (appData.moneyPerDay < 100) {
			console.log('Минимальный уровень достатка');
		} else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
			console.log('Средний уровень достатка');
		} else if (appData.moneyPerDay > 2000) {
			console.log('Высокий уровень достатка');
		} else {
			console.log('Произошла ошибка');
		}
	},
	checkSavings: function () {
		if (appData.salving == true) {
			let save = +prompt('Какова сумма накоплений?');
			let percent = +prompt('Под какой процент?');

			appData.monthIncome = save / 100 * 12 * percent;
			alert('Доход в месяц с вашего депозита:' + appData.monthIncome);
		}
	},
	chooseOptExpenses: function () {
		for (let i = 1; i <= 3; i++) {
			let opt = +prompt('Статья необязательных расходов?');
			appData.optionalExpenses[i] = opt;
		}
	},
	chooseIncome: function () {
		let items;
		do {
			items = prompt('Что принесет дополнительный доход? (Перечислите через запятую)', '');
		} while (typeof items != 'string' || items === '' || typeof items === null);

		appData.income = items.split(', ');
		appData.income.push(prompt('Может что-то ещё?'));
		appData.income.sort();
		appData.income.forEach(function (itemMassive, i) {
			alert('Способы доп.заработка: ' + (i + 1) + " - " + itemMassive);
		});
	}
};

for (let key in appData) {
	console.log('Наша программа включает в себя данные: ' + key + ' - ' + appData[key]);
}