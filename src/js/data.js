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

