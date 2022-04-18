//////////

// const addBills = document.querySelector('.add-bill');
// const billsList = document.querySelector('.bills-list');

// let bills = [];


// addBills.addEventListener('submit', (e) => {
//     e.preventDefault();

//     const bill = {
//         paid: false,

//         desc: (document.querySelector('[name=name]')).value,
//         amount: (document.querySelector('[name=amount]')).value,
//         category: (document.querySelector('[name=category]')).value,
//         duedate: (document.querySelector('[name=duedate]')).value
//     };

//     addBill(bill);
//     addBills.reset();
// });

// function addBill(details) {
//     if (details !== '') {
//         const bill = {
//             desc: details.desc,
//             amount: details.amount,
//             category: details.category,
//             duedate: details.duedate,
//             paid: details.paid,
//             key: Date.now()
//         };

//         bills.push(bill);
//         addToLocalStorage(bills);
//     }
// }

// function renderBills(bills) {
//     billsList.innerHTML = '';

//     bills.forEach(bill => {
        
//         // Create Bill Wrapper
//         const wrapper = document.createElement('div');
//         wrapper.setAttribute('class', 'bill ' + (bill.paid ? 'paid' : 'due'));
//         wrapper.setAttribute('data-key', bill.key);

//         wrapper.innerHTML = `
//             <div class="bill-details">
//                 <div class="bill-name">
//                     ${bill.desc}
//                 </div>
//                 <div class="bill-category">
//                     ${bill.category}
//                 </div>
//             </div>
//             <div class="bill-details">
//                 <div class="bill-amount">
//                     ${bill.amount}
//                 </div>
//                 <div class="bill-duedate">
//                     ${bill.duedate}
//                 </div>
//             </div>
//             <div class="bill-actions">
//                 <button class="edit-button">Edit</button>
//                 <button class="delete-button">Delete</button>
//             </div>
//         `;

//         billsList.append(wrapper);
//     });
// }

// function addToLocalStorage(bills) {
//     localStorage.setItem('bills', JSON.stringify(bills));
//     renderBills(bills);
// }

// function getFromLocalStorage() {
//     const reference = localStorage.getItem('bills');

//     if (reference) {
//         bills = JSON.parse(reference);
//         renderBills(bills);
//     }
// }

// function deleteBill(id) {
//     bills = bills.filter((bill) => {
//         return bill.key != id;
//     });

//     addToLocalStorage(bills);
// }

// getFromLocalStorage();

// billsList.addEventListener('click', (e) => {

//     if (e.target.classList.contains('delete-button')) {
//         deleteBill(e.target.parentElement.parentElement.getAttribute('data-key'));
//     }
    
//     if (e.target.classList.contains('edit-button')) {
//         console.log('is edit');
//     }

// })


const currencyArgs = {
    afterFormat(e) { console.log('afterFormat', e); },
    allowNegative: false,
    beforeFormat(e) { console.log('beforeFormat', e); },
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
  input.formatToNumber();