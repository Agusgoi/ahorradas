const $ = (selector) => document.querySelector (selector);

// --------------- VARIABLES ---------------


//general
let $btnNewOp = $ ('#btn-newop');
let $btnAdd = $ ('#btn-add');
let $btnCancel = $ ('#btn-cancel');

let $balanceSection = $ ('#balance-section');

let $opSection = $ ('#op-section');
let $divImgOp = $ ('#div-img-op');
let $opForm = $ ('#op-form');
let $opTable = $ ('#op-table');
let $tableBody = $ ('#table-body');


let $description = $ ('#description');
let $amountInput = $ ('#amount-input');
let $typeSelect = $ ('#type-select');
let $categSelect = $ ('#categ-select');
let $dateInput = $ ('#date-input');
let $tdAmount = $ ('#td-amount');



$btnNewOp.addEventListener ("click", (event)=>{
    $balanceSection.classList.add ("is-hidden");
    $opSection.classList.remove ("is-hidden");
})

 $btnCancel.addEventListener ("click", (event)=>{
    $balanceSection.classList.remove ("is-hidden");
    $opSection.classList.add ("is-hidden");
})

   $btnAdd.addEventListener ("click", (event)=>{
   $opSection.classList.add ("is-hidden");
   $balanceSection.classList.remove ("is-hidden");
   $divImgOp.classList.add ("is-hidden");
   $opTable.classList.remove ("is-hidden");

}) 

const reseatInputs = () => {
  $description.value = "";
  $amountInput.value = "";
  $typeSelect.value = "expense";
  $categSelect.value = "food";
  $dateInput.value = "";
 } 



 $opForm.addEventListener ('submit', (event)=>{
   event.preventDefault ();
   if ($typeSelect.value === "profit") {
    $tableBody.innerHTML += `<tr><td>${$description.value}</td>
    <td>${event.target.category.value}</td>
    <td class="has-text-success">+$ ${event.target.amount.value}</td>
    <td>${event.target.date.value}</td>
    <td><a href="">Editar</a>
    <a href="">Eliminar</a></td></tr>`;  
   }else{
    $tableBody.innerHTML += `<tr><td>${$description.value}</td>
   <td>${event.target.category.value}</td>
   <td class="has-text-danger">-$ ${event.target.amount.value}</td>
   <td>${event.target.date.value}</td>
   <td><a href="">Editar</a>
   <a href="">Eliminar</a></td></tr>`; 
     }
    reseatInputs();

 })



