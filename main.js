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

 $opForm.addEventListener ('submit', (event)=>{
   event.preventDefault ();
   $tableBody.innerHTML += `<td>${event.target.description.value}</td>`;
   $tableBody.innerHTML += `<td>${event.target.category.value}</td>`;
   $tableBody.innerHTML += `<td>$ ${event.target.amount.value}</td>`;
   $tableBody.innerHTML += `<td>${event.target.date.value}</td>`;
   $tableBody.innerHTML += `<td><a href="">Editar</a>
   <a href="">Eliminar</a></td>`;   
 })

 
   
 


