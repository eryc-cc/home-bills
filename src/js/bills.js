/**************************************************
 * Variables
 *************************************************/

// Gathers a list of bills
let bills = [];

// Gather all DOM elements in this array
let elementsDOM = [];








/**************************************************
 * Functions: Managing Data
 *************************************************/

/**
 * Adds a new bill
 * 
 * @param {Object} data - Passes the object from a form or manual input.
 */
function addBill(data) {
    if (data !== '') {
        const bill = {
            amount: details.amount,
            desc: details.desc,
            category: details.category,
            duedate: details.duedate,
            spender: details.spender,
            paid: !details.paid ? false : true,
            key: Date.now()
        };
    }

    bills.push(bill);
    addToLocalStorage('bills', bills);
    // TODO: Update DOM
}

/**
 * Removes a Bill
 * 
 * @param {String} billKey - Passes the key to the bill that'll be removed
 */
function removeBill(billKey) {
    bills = bill.filter((bill) => {
        return bill.key != billKey;
    });
    
    addToLocalStorage(bills);
    // TODO: Update DOM
}

function updateTxListDOM() {} // Updates the DOM tx list

/**
 * Adds data to a specific key in localStorage
 * 
 * @param {String} key - Defines the localStorage key
 * @param {Object} data - Passes an object with the data
 */
function addToLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

/**
 * Gets data from a specific key in localStorage
 * 
 * @param {String} key - Defines the localStorage key you want to grab data from
 * @param {Array} array - Defines the Array you want to parse the data into
 */
function getFromLocalStorage(key, array) {
    const ref = localStorage.getItem(key);

    if (ref) {
        array = JSON.parse(ref);
    }
}

function togglePaid(el) {} // Updates bill to paid or unpaid




/**************************************************
 * Functions: Manages DOM States
 *************************************************/

/**
 * Toggles transaction boxes open/closed.
 * 
 * @param {Event} e - Passes the event information.
 */
function toggleTxOpen(e) {
    // Finds a transaction that was already opened
    const openTx = document.querySelector('.tx.--open');

    // If openTx is not null and is not this event, then close it.
    if (!!openTx && openTx !== this) {
        openTx.classList.remove('--open');
    }

    // Finds whether the user is clicking the transaction's actions.
    const isActions = e.target.closest('.tx-actions');
    // If user is not clicking inside the actions div, then toggle it open or closed.
    if (!isActions) {
        this.classList.toggle('--open');
    }
}

/**
 * Creates a new HTML element
 * 
 * @param {Object} {} - Defines the element's attributes.
 * @param {String} {ns} - Defines the namespaceURI. Default: null
 * @param {String} {tag} - Defines the HTML tag. Default: 'div'
 * @param {Array}  {classes} - Defines one or more classNames.
 * @param {Array.<{name: String, value: String}>}  {attrs} - Defines one or more attributes.
 * @param {String} {id} — Defines the element id
 * 
 * @returns {Object} the element you just created
 */
function newElement({ns = null, tag = 'div', classes = [], attrs = [], id = null} = {}) {

    // Creates the element
    const el = !!ns ? document.createElementNS(ns, tag) : document.createElement(tag);

    // Adds identifiers to the element
    !!id ? el.id = id : id;

    // Adds attributes to the element
    // const attr = attr;
    attrs.forEach((attr, index) => {
        el.setAttribute(attr.name, attr.value);
    });

    // Adds classes to the element
    // const classes = classes;
    classes.forEach((item, index) => {
        el.classList.add(item);
    });

    // Pushes new Element to the elementsDOM Array
    elementsDOM.push(el);

    // Returns the element
    return el;
}