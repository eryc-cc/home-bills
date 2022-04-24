/**************************************************
 * DOM Elements
 *************************************************/

// Form to Add Bills
const addBillsForm = document.querySelector('.modal-wrapper .add-bills');

// Transaction (Bills) List
const txList = document.querySelector('.tx-list');





/**************************************************
 * DOM Events
 *************************************************/


/**
 * Sends Form
 * 
 * TODO: Add multiple bills behavior — will keep modal open when adding new bills
 * TODO: Add single bill behavior — will add bill and close the modal
 */
addBillsForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const bill = {
    paid: false,
    desc: (document.querySelector('[name=description]')).value,
    amount: (document.querySelector('[name=amount]')).value,
    category: (document.querySelector('[name=category]')).value,
    duedate: (document.querySelector('[name=duedate]')).value,
    spender: (document.querySelector('[name=spenders]')).value
  };
  
  addBill(bill);

  // Resets form
  addBills.reset();

  //TODO: Focus on amount
});





//////////////////////////////// 
// Format Currency Input
//////////////////////////////// 
const currencyArgs = {
  // afterFormat(e) { console.log('afterFormat', e); },
  allowNegative: false,
  // beforeFormat(e) { console.log('beforeFormat', e); },
  negativeSignAfter: false,
  prefix: 'R$',
  suffix: '',
  fixed: true,
  fractionDigits: 2,
  decimalSeparator: '.',
  thousandsSeparator: ',',
  cursor: 'end'
};

// Select the element
const currencyInput = SimpleMaskMoney.setMask('input[name="amount"]', currencyArgs);
// Convert the input value to a number, which you can save e.g. to a database:
currencyInput.formatToNumber();



//////////////////////////////// 
// HotKey Handlers
//////////////////////////////// 

const hotKeys = (e) => {
  let windowEvent = window.event ? window.event : e;

  if (windowEvent.keyCode === 78 && e.ctrlKey) {
    if (!modal.classList.contains('open')) {
      toggleModal();
    }
  }

  if (windowEvent.keyCode === 27) {
    if (modal.classList.contains('open')) {
      // Add conditional:
      // If inputs are filled, ask if you want to clear changes
      toggleModal();
    }
  }
}

document.onkeydown = hotKeys;