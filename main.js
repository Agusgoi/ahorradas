const $ = (selector) => document.querySelector (selector);

window.addEventListener("load", () => {

// --------------- VARIABLES ---------------

let operations = [];

// Regex
const regExpAlpha = /^[a-zA-Z0-9-\sñáéíóúüª!:?'¡].{4,20}$/;
const regExpNumber = /^[1-9]\d*(,\d+)?$/;

//body elements
const $balanceSection = $ ('#balance-section');
const $opSection = $ ('#op-section');
const $divImgOp = $ ('#div-img-op');
const $opForm = $ ('#op-form');
const $opTable = $ ('#op-table');
const $tableBody = $ ('#table-body');

//buttons
const $btnNewOp = $ ('#btn-newop');
const $btnCancel = $ ('#btn-cancel');

//inputs
const $descriptionInput = $ ('#description-input');
const $amountInput = $ ('#amount-input');
const $typeSelect = $ ('#type-select');
const $categSelect = $ ('#categ-select');
const $dateInput = $ ('#date-input');
const $profitTotal = $ ('#profit-total');
const $expensesTotal = $ ('#expenses-total');

//errors
const $descriptionError = $ ('.description-error');
const $amountError = $ ('.amount-error');
const $dateError = $ ('.date-error');
const $formError = $ ('.form-error');

// ----------- BUTTONS EVENTS -----------

$btnNewOp.addEventListener ("click", (event)=>{
    $balanceSection.classList.add ("is-hidden");
    $opSection.classList.remove ("is-hidden");
})

$btnCancel.addEventListener ("click", (event)=>{
    $balanceSection.classList.remove ("is-hidden");
    $opSection.classList.add ("is-hidden");
})




// ----------- BALANCE SECTION - FUNCTIONS -----------


// Reseat Form inputs
const reseatInputs = () => {
  $descriptionInput.value = "";
  $amountInput.value = "";
  $typeSelect.value = "expense";
  $categSelect.value = "food";
  $dateInput.value = "";
  $descriptionError.innerText = "";
  $amountError.innerText = "";
  $dateError.innerText = "";
} 


// Paint

const paint = (array) => {
 
  array.forEach((element) => {

    if ($typeSelect.value === "profit") {
      $tableBody.innerHTML += `<tr><td>${$descriptionInput.value}</td>
      <td>${$categSelect.value}</td>
      <td class="has-text-success has-text-weight-bold">$ ${$amountInput.value}</td>
      <td>${$dateInput.value}</td>
      <td><button class="btn-edit" id=${element.id}>Editar</button>
      <button class="btn-delete" id=${element.id}>Eliminar</button></td></tr>`
    }else{
      $tableBody.innerHTML += `<tr><td>${$descriptionInput.value}</td>
      <td>${$categSelect.value}</td>
      <td class="has-text-danger has-text-weight-bold">$ ${$amountInput.value}</td>
      <td>${$dateInput.value}</td>
      <td><button class="btn-edit" id=${element.id}>Editar</button>
      <button class="btn-delete" id=${element.id}>Eliminar</button></td></tr>`
    }


// amountTotals (); ???????
  });
}





//  ------------ Inputs & Form Validation -------------  //

  // Inputs Validation

  let validationErrors = false;

  $descriptionInput.addEventListener("input", (event) => {
    if (!$descriptionInput.value.trim()) {
      $descriptionError.innerText = "Campo obligatorio";
      $descriptionError.style.color = "red";
      $descriptionError.style.fontSize = "12px";
      validationErrors = true;
    } else if (!regExpAlpha.test($descriptionInput.value)) {
      $descriptionError.innerText = "Requiere minimo de 5 caracteres";
      $descriptionError.style.color = "red";
      $descriptionError.style.fontSize = "12px";
      validationErrors = true;
    } else {
      $descriptionError.innerText = "Descripcion valida";
      $descriptionError.style.color = "blue";
      $descriptionError.style.fontSize = "12px";
      validationErrors = false;
    }
  });

  $amountInput.addEventListener("input", (event) => {
    if (!$amountInput.value.trim()) {
      $amountError.innerText = "Campo obligatorio";
      $amountError.style.color = "red";
      $amountError.style.fontSize = "12px";
      validationErrors = true;
    } else if (!regExpNumber.test($amountInput.value)) {
      $amountError.innerText = "Monto invalido. Debe ser mayor a 0, puede usar coma.";
      $amountError.style.color = "red";
      $amountError.style.fontSize = "12px";
      validationErrors = true;
    } else {
      $amountError.innerText = "Monto valido";
      $amountError.style.color = "blue";
      $amountError.style.fontSize = "12px";
      validationErrors = false;
    }
  });


  $dateInput.addEventListener("input", (event) => {
    console.log (event)
    if (!$dateInput.value.trim()) {
      $dateError.innerText = "Campo obligatorio";
      $dateError.style.color = "red";
      $dateError.style.fontSize = "12px";
      validationErrors = true;
      // como validar la fecha? tiene que ser igual o menor que hoy
   /*  } else if (!regExpNumber.test($amountInput.value)) {
      $amountError.innerText = "Monto invalido. Debe ser mayor a 0, puede usar coma.";
      $amountError.style.color = "red";
      $amountError.style.fontSize = "12px";
      validationErrors = true; */
    } else {
      $dateError.innerText = "Monto valido";
      $dateError.style.color = "blue";
      $dateError.style.fontSize = "12px";
      validationErrors = false;
    }
  });


  // Form Validation
  
  $opForm.addEventListener("submit", (event) => {
    event.preventDefault();

    let errors = false;
    let elementsForm = $opForm.elements;

    for (let i = 0; i < elementsForm.length - 2; i++) {
      if (elementsForm[i].value == "") {
        elementsForm[i].style.outline = "auto";
        elementsForm[i].style.outlineColor = "red";
        $formError.style.color = "red";
        $formError.style.fontSize = "12px";
        $formError.innerText = "Los campos indicados son obligatorios";
        errors = true;
      } else {
        elementsForm[i].style.backgroundColor = "none";
      }
    }
    
    
    if (!errors && !validationErrors) {
        operations.push({
          id: crypto.randomUUID(),
          Description: $descriptionInput.value,
          Amount: $amountInput.value,
          Type: $typeSelect.value,
          Category: $categSelect.value,
          Date: $dateInput.value
        });
        console.log(operations)

        $opSection.classList.add ("is-hidden");
        $balanceSection.classList.remove ("is-hidden");
        $divImgOp.classList.add ("is-hidden");
        $opTable.classList.remove ("is-hidden");

        paint(operations);
        reseatInputs();
     
        //$form.submit()
      }
    })
  












  //// LO QUE TENIA HECHO ES ESTO //////

/* $Form.addEventListener ('submit', (event)=>{
   event.preventDefault ();
  if ($typeSelect.value === "profit") {
    $tableBody.innerHTML += `<tr><td>${$description.value}</td>
    <td>${$categSelect.value}</td>
    <td class="has-text-success has-text-weight-bold">+$ ${$amountInput.value}</td>
    <td>${$dateInput.value}</td>
    <td><a href="">Editar</a>
    <a href="">Eliminar</a></td></tr>`;  
  }else{
    $tableBody.innerHTML += `<tr><td>${$description.value}</td>
   <td>${$categSelect.value}</td>
   <td class="has-text-danger has-text-weight-bold">-$ ${$amountInput.value}</td>
   <td>${$dateInput.value}</td>
   <td><a href="">Editar</a>
   <a href="">Eliminar</a></td></tr>`; 
  } */

  //reseatInputs();
 // amountTotals ();
 

 //})

 //console.log ($amountInput.value)


/*  const amountTotals = () => {
  if ($typeSelect.value === "profit") {
    $amountInput.addEventListener ("input", (event)=>{
      $profitTotal.innerText = event.target.value;
      
    })
  }else{
    $amountInput.addEventListener ("input", (event)=>{
      $expensesTotal.innerText = event.target.value;
      console.log ($expensesTotal)
    } )
  }}

  */
 


  const amountTotals = () => {
    $amountInput.addEventListener ("input", (event)=>{
      if ($typeSelect.value === "expense") {
        $expensesTotal.innerText += event.target.value;
      }else {
        $profitTotal.innerText += event.target.value;
      }})
    
    } 


    amountTotals ();
    
/*    
$amountInput.addEventListener ("change", (event)=>{
      if ($typeSelect.value === "expense") {
        $expensesTotal.innerText += event.target.value;
      }else{
        $profitTotal.innerText += event.target.value;
      }})

  console.log ($profitTotal.value)
  console.log ($expensesTotal.value)
 */

  /* const totalBalance = () => {
    const { ganancias, gastos, balance } = obtenerBalance(operaciones)
    $('#ganancias').innerHTML = `+$${Math.abs(ganancias)}`
    $('#gastos').innerHTML = `-$${Math.abs(gastos)}`
  
    $('#balance').classList.remove('has-text-danger', 'has-text-success')
    let operador = ''
  
    if (balance > 0) {
      $('#balance').classList.add('has-text-success')
      operador = '+'
    } else if (balance < 0) {
      $('#balance').classList.add('has-text-danger')
      operador = '-'
    }
  
    $('#balance').innerHTML = `${operador}$${Math.abs(balance)}`
  }
  


  const calcularTotal = () => {
    let total = 0;
    for (const product of cart) {
      total += product.price * product.quantity;
    }
    return total;
  }; */
  

/* 1. En la rama de desarrollo hago git merge main para traerme los cambios de main
2. Luego hago cambios nuevos en la rama de desarrollo, git commit, git push, y si esta todo bien, vuelvo a main
3. Para en main, hago git merge rama-de-desarrollo
 */










  //estos cierran la funcion window-load

});
