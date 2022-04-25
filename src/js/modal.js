//////////////////////////////// 
// Add Bills Modal Handlers
//////////////////////////////// 

// Define Elements
const modal = document.getElementById('addBillsModal');
const openModalButton = document.getElementById('openModal');
const closeModalArea = document.getElementById('closeModal');
const closeModalButton = document.getElementById('closeModalButton');

/***********************************************
 * toggleModal() - Toggles modal on and off
 */
function toggleModal () {
  const firstInput = document.querySelector('.modal-wrapper .input[name="amount"]');

  modal.classList.toggle('open');

  if (modal.classList.contains('open')) {
    firstInput.focus();
  }
}

openModalButton.addEventListener('click', toggleModal);
closeModalArea.addEventListener('click', toggleModal);
closeModalButton.addEventListener('click', toggleModal);