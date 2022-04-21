// Gather all DOM elements in this array
const elementsDOM = [];




function addBill(data) {} // Adds bill: to DOM && localStorage

function removeBill(bill) {} // Removes a specific bill: from DOM & localStorage

function addToLocalStorage(bills) {} // Adds bills to localStorage

function getFromLocalStorage() {} // Gets bills from localStorage



function toggleOpen(el, className = '--open') {} // Toggles open (anything).

function togglePaid(el) {} // Updates bill to paid or unpaid



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