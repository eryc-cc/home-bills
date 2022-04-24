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
    
    // If `data` isn't empty...
    if (data !== '') {
        // Grab all the data passed and add it to an Object
        const bill = {
            amount: data.amount,
            desc: data.desc,
            category: data.category,
            duedate: data.duedate,
            spender: data.spender,
            paid: !data.paid ? false : true,
            key: Date.now()
        };
        
        // Push the object into the `bills` Array
        bills.push(bill);
        
        // Add bills to localStorage
        addToLocalStorage('bills', bills);
        
        // TODO: Update DOM
    }
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
 * @param {Array} data - Defines the Array you want to parse the data into
 * @returns {Array}
 */
function getFromLocalStorage(key, data) {
    // Use item key as a reference
    const ref = localStorage.getItem(key);

    // If the item key exists, add it to the bills 
    if (ref) {
        data = JSON.parse(ref);
    }
    
    // Returns the 
    return data;
}

/**
 * Toggles Paid
 * 
 * @param {Event} e - Passes the event.
 */
function togglePaid(e) {
    // Gets the key to the currentTarget
    const key = e.currentTarget.closest('.tx').getAttribute('data-key');

    // Will map through bills Array and update the current bill to paid or not paid.
    bills = bills.map((bill) => {
        if (bill.key == key) {
            if (bill.paid === false) {
                bill.paid = true;
            } else {
                bill.paid = false;
            }
        }
        return bill;
    });

    // Adds new Array to localStorage
    addToLocalStorage(bills);
    // TODO: Update DOM
}




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
function newElement({ns = null, tag = 'div', classes = [], attrs = [], id = null, innerText = null} = {}) {

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

    // Adds innerText
    !!innerText ? el.innerText = innerText : innerText;

    // Returns the element
    return el;
}