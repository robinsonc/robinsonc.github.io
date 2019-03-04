let width = 0;
let thickness = 0;
let totalCubicSum = 0;
let grandTotalCubic = 0;
let grandTotalAmount = 0;

// Method to store initial form elements 
let storeWidthThickness = () => {
    const initialForm = document.getElementById('initial-form');
    const lengthForm = document.getElementById('length-form');
    width       = initialForm.elements.namedItem('width').value;
    thickness   = document.getElementById('initial-form').elements.namedItem('thickness').value;
    initialForm.classList.add('d-none');
    lengthForm.classList.remove('d-none');
}

// Method to calculate total cubic
let calculateTotalCubic = () => {
    const lengthForm = document.getElementById('length-form');
    const totalCubic = document.getElementById('total-cubic');
    let length = lengthForm.elements.namedItem('length').value;
    sum = (width * thickness * length)/144;
    totalCubicSum += sum;
    document.getElementById('cubic-sum').textContent = totalCubicSum.toFixed(2);
    lengthForm.classList.add('d-none');
    totalCubic.classList.remove('d-none');
    lengthForm.reset();
}

// Method to repeat the sizes and enable length form
let addMoreLength = () => {
    const lengthForm = document.getElementById('length-form');
    const totalCubic = document.getElementById('total-cubic');
    totalCubic.classList.add('d-none');
    lengthForm.classList.remove('d-none');
}


// Calculate grand total of total cubic added and enable amount form
let calcGrandTotal = () => {
  grandTotalCubic += totalCubicSum;
  const amountForm = document.getElementById('amount-form');
  const totalCubic = document.getElementById('total-cubic');
  totalCubic.classList.add('d-none');
  amountForm.classList.remove('d-none');
}


// Method to get amount and find total amount
let calculateTotalAmount = () => {
  const amountForm = document.getElementById('amount-form');
  const totalAmount = document.getElementById('total-amount');
  let rate = amountForm.elements.namedItem('amount').value;
  let amount = rate * totalCubicSum;
  document.getElementById('amount').textContent = amount.toFixed(2);
  amountForm.classList.add('d-none');
  totalAmount.classList.remove('d-none');
  grandTotalAmount += amount;
  amountForm.reset();
}


// Method to show Grand Cubic and Grand Total
let showGrandTotal = () => {
  const finalOutput = document.getElementById('final-output');
  const totalAmount = document.getElementById('total-amount');
  document.getElementById('grand-cubic').textContent = grandTotalCubic.toFixed(2);
  document.getElementById('grand-amount').textContent = grandTotalAmount.toFixed(2);
  totalAmount.classList.add('d-none');
  finalOutput.classList.remove('d-none');
}

// Method to add total cubic and amount to grand total for next sizes
let addMoreSizes = () => {
  const totalAmount = document.getElementById('total-amount');
  const initialForm = document.getElementById('initial-form');
  initialForm.reset();
  totalAmount.classList.add('d-none');
  initialForm.classList.remove('d-none');
  totalCubicSum = 0;
}

// Event Listener to handle initial form submission
window.addEventListener("load",function() {
    document.getElementById('initial-form').addEventListener("submit",function(e) {
      e.preventDefault(); // before the code
      // Should be triggered on form submit
      storeWidthThickness();
    });
});

// Event Listener to handle length form submission
window.addEventListener("load",function() {
    document.getElementById('length-form').addEventListener("submit",function(e) {
      e.preventDefault(); // before the code
      // Should be triggered on form submit
      calculateTotalCubic();
    });
});


// Event Listener to handle amount form submission
window.addEventListener("load",function() {
  document.getElementById('amount-form').addEventListener("submit",function(e) {
    e.preventDefault(); // before the code
    // Should be triggered on form submit
    calculateTotalAmount();
  });
});
 