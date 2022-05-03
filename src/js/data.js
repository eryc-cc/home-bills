/**************************************************
 * Variables
 *************************************************/

// Gathers all the categories set by the user
let categories = [
	{
		name: 'Credit Card',
		slug: 'credit-card',
		key: SHA1('creditcard') // 5e667e09540800fcbba5c0215f2d09aed1fa57df
	},
	{
		name: 'Home',
		slug: 'home',
		key: SHA1('home') // e83249bd3ba79932e16fb1fb5100dafade9954c2
	},
	{
		name: 'Utility',
		slug: 'utility',
		key: SHA1('utility') // 8884fd30d64e5cf97054c14e8a217a1fb0cd7e16
	},
	{
		name: 'Health',
		slug: 'health',
		key: SHA1('health') // 834b34f16f451e00f268dd5c8c81d16e3c020275
	},
	{
		name: 'Miscellaneous',
		slug: 'misc',
		key: SHA1('misc') // 291d3e10d996b9590a718565f00bfbbd0ad02bef
	},
];


// Gathers all the spenders set by the user
let spenders = [
	{
		name: 'Spender One',
		key: SHA1('Spender One')
	},
	{
		name: 'Spender Two',
		key: SHA1('Spender Two')
	}
];


/**************************************************
 * Calculate Overview
 *************************************************/

// Sets this month and year in an object
let thisMonth = {
	month: moment().month(),
	year: moment().year(),
}

/**
 * Gets this month's bills
 * You can store it in a variable and even save it to localStorage, 
 * so you don't have to run this everytime.
 * 
 * @param {Object} thisMonth — Passes thisMonth Object with the month and year.
 * @param {Object} bills — Passes the list of current bills.
 * @returns {Object} — Returns an object with this month's bills.
 */
function getThisMonthsBills(thisMonth, bills) {
	let thisMonthsBills = [];

	bills.forEach((bill, index) => {
		let billMonth = moment(bill.duedate).month(); // Month is zero indexed
		let billYear = moment(bill.duedate).year();

		if (thisMonth.month === billMonth && thisMonth.year === billYear) {
			thisMonthsBills.push(bill);
		}
	});

	return thisMonthsBills;
}

// Stores this month's bills in a const.
const thisMonthsBills = getThisMonthsBills(thisMonth, bills);

/**
 * Calculates this month's bills
 * @param {Object} bills — Passes this month's bills from getThisMonthsBills()
 */
function calculateThisMonthsBills(bills) {
	// Inits Base structure for dataOverview
	let dataOverview = {
		month: thisMonth.month,
		year: thisMonth.year,
		total: {},
		spenders: [],
		categories: []
	};

	// Inits Base structure for totalOverview
	let totalOverview = {
		total: 0,
		paid: 0,
		due: 0
	};

	// Inits Spenders and Categories arrays
	let spendersOverview = [];
	let categoriesOverview = [];


	// Loops through each bill of the current month
	bills.forEach((bill) => {

		// Sum all bills
		totalOverview.total += bill.amount;

		// Sums paid and due bills
		if (bill.isPaid) {
			totalOverview.paid += bill.amount;
		} else {
			totalOverview.due += bill.amount;
		}
		
		// Sets this bill's spender/category key
		let thisSpenderKey = bill.spender.key;
		let thisCategoryKey = bill.category.key;
		
		// Checks whether this bill has spender
		const hasSpender = spendersOverview.some(spender => {
			if (spender.key === thisSpenderKey) {
				return true;
			}
			
			return false;
		});
		
		// Checks whether this bill has category
		const hasCategory = categoriesOverview.some(category => {
			if (category.key === thisCategoryKey) {
				return true;
			}

			return false;
		});


		// If this bill doens't have a spender that already exists...
		if (!hasSpender) {

			// Sets the Spenders amount based on the first bill looped
			spendersOverview.push({
				key: bill.spender.key,
				amount: bill.amount,
				amountPaid: bill.isPaid ? bill.amount : 0,
				amountDue: bill.isPaid ? 0 : bill.amount,
			});
		} else {

			// Sums the rest of the bills in that spender
			spendersOverview.forEach((spender, index) => {
				if (spender.key === bill.spender.key) {
					spender.amount += bill.amount;
					bill.isPaid ? spender.amountPaid += bill.amount : spender.amountDue += bill.amount;
				}
			});
		}

		// If this bill doens't have a category that already exists...
		if (!hasCategory) {

			// Sets the Categories amount based on the first bill looped
			categoriesOverview.push({
				key: bill.category.key,
				amount: bill.amount,
				amountPaid: bill.isPaid ? bill.amount : 0,
				amountDue: bill.isPaid ? 0 : bill.amount,
			});
		} else {

			// Sums the rest the bills in that category
			categoriesOverview.forEach((category, index) => {
				if (category.key === bill.category.key) {
					category.amount += bill.amount;
					bill.isPaid ? category.amountPaid += bill.amount : category.amountDue += bill.amount;
				}
			});
		}
	});
	
	
	// Calculates total percentage
	totalOverview.percentPaid = (totalOverview.paid * 100) / totalOverview.total;
	totalOverview.percentDue = (totalOverview.due * 100) / totalOverview.total;
	// Pushes totalOverview into dataOverview
	dataOverview.total = totalOverview;
	
	// Calculates spenders percentage
	spendersOverview.forEach((spender, index) => {
		spender.percentPaid = (spender.amountPaid * 100) / spender.amount;
		spender.percentDue = (spender.amountDue * 100) / spender.amount;

		dataOverview.spenders.push(spender);
	});
	
	// Calculates cateogries percentage
	categoriesOverview.forEach((category, index) => {
		category.percentPaid = (category.amountPaid * 100) / category.amount;
		category.percentDue = (category.amountDue * 100) / category.amount;
		
		dataOverview.categories.push(category);
	});
	
	return dataOverview;
}

overview = calculateThisMonthsBills(thisMonthsBills);