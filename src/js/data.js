/**************************************************
 * Variables
 *************************************************/

// Gathers all the categories set by the user
let categories = {
	creditcard: {
		name: 'Credit Card',
		key: 1651056654886
	},
	home: {
		name: 'Home',
		key: 1651056656009
	}
};
// console.group('Categories');
// console.table(categories);
// console.groupEnd();

// Gathers all the spenders set by the user
let spenders = [
	{
		name: 'Spender One',
		key: 1651056656974
	},
	{
		name: 'Spender Two',
		key: 1651056657897
	}
];
// console.group('Spenders');
// console.table(spenders);
// console.groupEnd();



// Gathers a list of bills
let bills = [
	{
		key: 1651056838809,
		isPaid: false,
	
		amount: 2000,
		amountFormatted: "R$ 2,000.00",
		category: categories.creditcard,
		duedate: "2022-03-08", // YYYY-MM-DD
		spender: spenders[0],
	},
	{
		key: 1651056839561,
		isPaid: true,
	
		amount: 4000,
		amountFormatted: "R$ 4,000.00",
		category: categories.creditcard,
		duedate: "2022-04-08", // YYYY-MM-DD
		spender: spenders[1],
	},
	{
		key: 1651056840224,
		isPaid: true,
	
		amount: 3000,
		amountFormatted: "R$ 3,000.00",
		category: categories.home,
		duedate: "2022-04-28", // YYYY-MM-DD
		spender: spenders[1],
	},
	{
		key: 1651056840856,
		isPaid: false,
	
		amount: 1000,
		amountFormatted: "R$ 1,000.00",
		category: categories.home,
		duedate: "2022-04-13", // YYYY-MM-DD
		spender: spenders[1],
	}
];

// Gather all DOM elements in this array
let elementsDOM = {};

let overview = [];

let overviewData = [
	{
		month: 01,
		year: 2022,

		total: {
			amount: 20000,
			amountFormatted: "R$ 20,000.00",
			amountPaid: 8000,
			percentPaid: 40,
			amountDue: 12000,
			percentDue: 60
		},

		spenders: [
			{
				key: 1651056656974,
				amount: 16000,
				amountFormatted: "R$ 16,000.00",
				amountPaid: 8000,
				percentPaid: 50,
				amountDue: 8000,
				percentDue: 50
			},
			{
				key: 1651056657897,
				amount: 4000,
				amountFormatted: "R$ 4,000.00",
				amountPaid: 0,
				percentPaid: 0,
				amountDue: 4000,
				percentDue: 100
			},
		],
		
		categories: [
			{
				key: 1651056654886,
				amount: 4000,
				amountFormatted: "R$ 4,000.00",
				amountPaid: 0,
				percentPaid: 0,
				amountDue: 4000,
				percentDue: 100
			},
			{
				key: 1651056656009,
				amount: 4000,
				amountFormatted: "R$ 4,000.00",
				amountPaid: 0,
				percentPaid: 0,
				amountDue: 4000,
				percentDue: 100
			},
		]
	},
];

// console.group('Overview');
// console.table(overview[0]);
// console.group('Spenders');
// console.table(overview[0].spenders[0]);
// console.groupEnd();
// console.group('Categories');
// console.table(overview[0].categories[0]);
// console.groupEnd();



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

