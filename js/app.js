let width = 0;
let thickness = 0;
let totalCubicSum = 0;
let grandTotalCubic = 0;
let grandTotalAmount = 0;
let finalArray = [];
let currentobject = {};

// Method to store initial form elements 
let storeWidthThickness = () => {
    const initialForm = document.getElementById('initial-form');
    const lengthForm = document.getElementById('length-form');
    width       = initialForm.elements.namedItem('width').value;
    thickness   = document.getElementById('initial-form').elements.namedItem('thickness').value;
    initialForm.classList.add('d-none');
    lengthForm.classList.remove('d-none');
    currentobject.width = width;
    currentobject.thickness = thickness;
    currentobject.sizes = [];
}

// Method to calculate total cubic
let calculateTotalCubic = () => {
    let lengthObject = {};
    const lengthForm = document.getElementById('length-form');
    const totalCubic = document.getElementById('total-cubic');
    let length = lengthForm.elements.namedItem('length').value;
    let quantity = lengthForm.elements.namedItem('length').value;
    sum = ((width * thickness * length)/144) * quantity;
    totalCubicSum += sum;
    document.getElementById('cubic-sum').textContent = sum.toFixed(4);
    lengthForm.classList.add('d-none');
    totalCubic.classList.remove('d-none');
    lengthForm.reset();
    lengthObject.length = length;
    lengthObject.quantity = quantity;
    lengthObject.cubic = sum.toFixed(4);
    currentobject.sizes.push(lengthObject);
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
  document.getElementById('total-cubic-sum').textContent = totalCubicSum.toFixed(4);
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
  document.getElementById('amount').textContent = amount.toFixed(4);
  amountForm.classList.add('d-none');
  totalAmount.classList.remove('d-none');
  grandTotalAmount += amount;
  amountForm.reset();
  currentobject.rate = rate;
}


// Method to show Grand Cubic and Grand Total
let showGrandTotal = () => {
  const finalOutput = document.getElementById('final-output');
  const totalAmount = document.getElementById('total-amount');
  document.getElementById('grand-cubic').textContent = grandTotalCubic.toFixed(4);
  document.getElementById('grand-amount').textContent = grandTotalAmount.toFixed(4);
  totalAmount.classList.add('d-none');
  finalOutput.classList.remove('d-none');
  finalArray.push(currentobject);
  createExportTable();
  // console.log(finalArray);
}

// Method to add total cubic and amount to grand total for next sizes
let addMoreSizes = () => {
  const totalAmount = document.getElementById('total-amount');
  const initialForm = document.getElementById('initial-form');
  initialForm.reset();
  totalAmount.classList.add('d-none');
  initialForm.classList.remove('d-none');
  totalCubicSum = 0;
  finalArray.push(currentobject);
  currentobject = {};
}

let exportTable = () => {
  exportTableToExcel('export-table');
}

// Method to EXPORT a table using JS
function exportTableToExcel(tableID, filename = ''){
  var downloadLink;
  var dataType = 'application/csv;charset=utf-8;';
  var tableSelect = document.getElementById(tableID);
  var tableHTML = tableSelect.innerHTML.replace(/ /g, '%20');
  
  // Specify file name
  filename = filename?filename+'.xls':'excel_data.xlsx';
  
  // Create download link element
  downloadLink = document.createElement("a");
  
  document.body.appendChild(downloadLink);
  
  if(navigator.msSaveOrOpenBlob){
      var blob = new Blob(['\ufeff', tableHTML], {
          type: dataType
      });
      navigator.msSaveOrOpenBlob( blob, filename);
  }else{
      // Create a link to the file
      downloadLink.href = 'data:' + dataType + ', ' + tableHTML;
  
      // Setting the file name
      downloadLink.download = filename;
      
      //triggering the function
      downloadLink.click();
  }
}


// Method to create table element from the final array

let createExportTable = () => {
  let myTableDiv = document.getElementById('export-table');
  let table = document.createElement('table');
  let tableBody = document.createElement('tbody');
  table.border = '1';
  table.appendChild(tableBody);
  console.log(finalArray);
  const heading = ['Width', 'Thickness', 'Length', 'Quantity', 'Cubic', 'Rate', 'Amount'];
  // Table heading
  let tr = document.createElement('tr');
  for(let i=0; i< heading.length; i++) {
    let th = document.createElement('th');
    th.appendChild(document.createTextNode(heading[i]));
    tr.appendChild(th);
  }
  tableBody.appendChild(tr);
  let totalCubic = 0;
  let totalAmount = 0;
  finalArray.forEach(function(element){
    // Table Rows
    for(let i =0; i< element.sizes.length; i++) {
      let tr = document.createElement('tr');
      let amount = element.rate * element.sizes[i].cubic;
      let row = ` <td>${element.width}</td>
                  <td>${element.thickness}</td>
                  <td>${element.sizes[i].length}</td>
                  <td>${element.sizes[i].quantity}</td>
                  <td>${element.sizes[i].cubic}</td>
                  <td>${element.rate}</td>
                  <td>${amount.toFixed(4)}</td>`;
      tr.innerHTML = row;
      tableBody.appendChild(tr);
      totalCubic += parseFloat(element.sizes[i].cubic);
      totalAmount+= parseFloat(amount);
    }
  })
  let footer = document.createElement('tr');
  var finalRow = `<th></th><th></th><th></th>
                  <th></th>
                  <th align="right">${totalCubic.toFixed(4)}</th>
                  <th></th>
                  <th align="right">${totalAmount.toFixed(4)}</th>`;
  footer.innerHTML = finalRow;
  tableBody.appendChild(footer);
  myTableDiv.append(table);
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



 