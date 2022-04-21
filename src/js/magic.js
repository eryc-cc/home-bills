//////////////////////////////// 
// Add Bills
//////////////////////////////// 
const addBills = document.querySelector('.modal-wrapper .add-bills');
const txList = document.querySelector('.tx-list');


addBills.addEventListener('submit', (e) => {
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
  addBills.reset();
});


function renderBills(bills) {
  txList.innerHTML = '';

  bills.forEach(bill => {
    // Create TX Wrapper
    const tx = document.createElement('article');
    tx.classList.add('tx');
    tx.classList.add(!!bill.paid ? '--paid' : '--due');
    tx.setAttribute('data-key', bill.key);
    
    const wrapper = document.createElement('section');
    wrapper.classList.add('tx-wrapper');
    tx.append(wrapper);

    // Create Meta Information Elements
    const category = document.createElement('div');
    category.classList.add('tx-category');
    category.classList.add(bill.category ? '--' + bill.category : '');
    // Append Category to Wrapper
    wrapper.append(category);

    // Create Block with Meta information
    const block = document.createElement('section');
    block.classList.add('tx-block');
    // Append Block to Wrapper
    wrapper.append(block);

    // Create Description Details
    const descDetails = document.createElement('section');
    descDetails.classList.add('tx-details');
    descDetails.classList.add('--desc');
    // Append Description Details to Block
    block.append(descDetails);

    // Create Title
    const title = document.createElement('h3');
    title.classList.add('tx-title');
    title.append(bill.desc);
    // Append Title to Description Details
    descDetails.append(title);
    
    // Create Date
    const date = document.createElement('time');
    date.classList.add('tx-date');
    date.setAttribute('datetime', bill.duedate);
    date.append(moment(bill.duedate).format("MMM DD, YYYY"));
    // Append Date to Description Details
    descDetails.append(date);
    
    // Create Amount Details
    const amountDetails = document.createElement('section');
    amountDetails.classList.add('tx-details');
    amountDetails.classList.add('--amount');
    // Append Title to Description Details
    block.append(amountDetails);

    // Create Amount
    const amount = document.createElement('span');
    amount.classList.add('tx-amount');
    amount.append(bill.amount);
    // Append Amount to Description Details
    amountDetails.append(amount);
    
    // Create Status
    const status = document.createElement('span');
    status.classList.add('tx-status');
    
    if (!bill.paid) {
      if (moment(new Date()).format("DDMMYYYY") > moment(bill.duedate).format('DDMMYYYY')) {

        status.classList.add('--due');
        status.innerText = "Due";
      } else {
        status.classList.add('--late');
        status.innerText = "Late";
      }
    } else {
      status.classList.add('--paid');
      status.innerText = "Paid";
    }

    // Append Status to Description Details
    amountDetails.append(status);

    // Create Actions
    const actions = document.createElement('section');
    actions.classList.add('tx-actions');
    tx.append(actions);

    // Create Switch
    const switchWrapper = document.createElement('div');
    switchWrapper.classList.add('tx-action');
    switchWrapper.classList.add('switch-wrapper');
    actions.append(switchWrapper);
    switchWrapper.addEventListener('click', (e) => {
      togglePaid(e.currentTarget);
    });
    
    const switchButton = document.createElement('button');
    switchButton.classList.add('switch');
    switchButton.setAttribute('type', 'button');
    switchButton.setAttribute('role', 'switch');
    switchButton.setAttribute('aria-checked', bill.paid ? "true" : "false");
    switchButton.setAttribute('data-state', bill.paid ? "checked" : "unchecked");
    switchButton.setAttribute('value', 'paid');
    switchWrapper.append(switchButton);
    
    const switchToggle = document.createElement('span');
    switchToggle.classList.add('switch-toggle');
    switchButton.append(switchToggle);

    const switchLabel = document.createElement('label');
    switchLabel.classList.add('label');
    switchLabel.setAttribute('for', 'tx-' + bill.key);
    switchLabel.innerText = bill.paid ? "Paid" : "Not Paid"
    switchWrapper.append(switchLabel);

    const switchCheckbox = document.createElement('input');
    switchCheckbox.classList.add('switch-checkbox');
    switchCheckbox.setAttribute('type', 'checkbox');
    switchCheckbox.setAttribute('aria-hidden', 'true');
    switchCheckbox.setAttribute('value', 'paid');
    switchCheckbox.setAttribute('name', 'tx-' + bill.key);
    bill.paid ? switchCheckbox.setAttribute('checked', '') : null
    switchWrapper.append(switchCheckbox);

    // Create Edit Button
    const editButton = document.createElement('button');
    editButton.classList.add('tx-action');
    editButton.classList.add('--edit');
    actions.append(editButton);

    const editButtonIcon = `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="inherit" xmlns="http://www.w3.org/2000/svg">
        <path d="M7 17.013L11.413 16.998L21.045 7.45802C21.423 7.08002 21.631 6.57802 21.631 6.04402C21.631 5.51002 21.423 5.00802 21.045 4.63002L19.459 3.04402C18.703 2.28802 17.384 2.29202 16.634 3.04102L7 12.583V17.013V17.013ZM18.045 4.45802L19.634 6.04102L18.037 7.62302L16.451 6.03802L18.045 4.45802ZM9 13.417L15.03 7.44402L16.616 9.03002L10.587 15.001L9 15.006V13.417Z" fill="inherit"/>
        <path d="M5 21H19C20.103 21 21 20.103 21 19V10.332L19 12.332V19H8.158C8.132 19 8.105 19.01 8.079 19.01C8.046 19.01 8.013 19.001 7.979 19H5V5H11.847L13.847 3H5C3.897 3 3 3.897 3 5V19C3 20.103 3.897 21 5 21Z" fill="inherit"/>
      </svg>
    
    `;
    editButton.innerHTML += editButtonIcon;
    
    const editButtonText = document.createElement('span');
    editButtonText.innerText = "Edit";
    editButton.append(editButtonText);
    
    // Create Delete Button
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('tx-action');
    deleteButton.classList.add('--delete');
    actions.append(deleteButton);
    
    const deleteButtonIcon = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="inherit" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 7H5V20C5 20.5304 5.21071 21.0391 5.58579 21.4142C5.96086 21.7893 6.46957 22 7 22H17C17.5304 22 18.0391 21.7893 18.4142 21.4142C18.7893 21.0391 19 20.5304 19 20V7H6ZM10 19H8V10H10V19ZM16 19H14V10H16V19ZM16.618 4L15 2H9L7.382 4H3V6H21V4H16.618Z" fill="inherit"/>
    </svg>
    `;
    deleteButton.innerHTML += deleteButtonIcon;
    
    const deleteButtonText = document.createElement('span');
    deleteButtonText.innerText = "Delete";
    deleteButton.append(deleteButtonText);
    deleteButton.addEventListener('click', (e) => {
      deleteBill(e.target.closest('.tx').getAttribute('data-key'));
    });
    
    // Append Wrapper to Transaction List
    txList.append(tx);

    tx.addEventListener('click', toggleTx);
  });
}

getFromLocalStorage();



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