//////////////////////////////// 
// Add Bills
//////////////////////////////// 
const addBills = document.querySelector('.modal-wrapper .add-bills');
const txList = document.querySelector('.tx-list');

let bills = [];


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

  console.log(bill);

  addBill(bill);
  addBills.reset();
});

function addBill(details) {
  if (details !== '') {
    const bill = {
        desc: details.desc,
        amount: details.amount,
        category: details.category,
        duedate: details.duedate,
        spender: details.spender,
        paid: details.paid,
        key: Date.now()
    };

    bills.push(bill);
    addToLocalStorage(bills);
  }
}

function renderBills(bills) {
  txList.innerHTML = '';

  bills.forEach(bill => {
    // Create TX Wrapper
    const wrapper = document.createElement('article');
    wrapper.classList.add('tx');
    wrapper.classList.add(bill.paid ? '--paid' : '--due');
    wrapper.setAttribute('data-key', bill.key);

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
      status.classList.add('--due');
      status.innerText = "Due";
    } else {
      status.classList.add('--paid');
      status.innerText = "Paid";
    }

    // Append Status to Description Details
    amountDetails.append(status);
    
    
    // Append Wrapper to Transaction List
    txList.append(wrapper);

    console.log(wrapper);

  });
}

function addToLocalStorage(bills) {
  localStorage.setItem('bills', JSON.stringify(bills));
  renderBills(bills);
}

function getFromLocalStorage() {
  const reference = localStorage.getItem('bills');

  if (reference) {
      bills = JSON.parse(reference);
      renderBills(bills);
  }
}

function deleteBill(id) {
  bills = bills.filter((bill) => {
      return bill.key != id;
  });

  addToLocalStorage(bills);
}

getFromLocalStorage();

// Modal

const modal = document.getElementById('addBillsModal');
const openModalButton = document.getElementById('openModal');
const closeModalArea = document.getElementById('closeModal');

openModalButton.addEventListener('click', toggleModal);
closeModalArea.addEventListener('click', toggleModal);

function toggleModal () {
  const firstInput = document.querySelector('.modal-wrapper .input[name="amount"]');

  modal.classList.toggle('open');

  if (modal.classList.contains('open')) {
    firstInput.focus();
  }
}


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



// HotKeys

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