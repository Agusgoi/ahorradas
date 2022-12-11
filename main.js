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




let $description = $ ('#description');
let $amountInput = $ ('#amount-input');
let $typeSelect = $ ('#type-select');

console.log ($opForm)

$btnNewOp.addEventListener ("click", (event)=>{
    $balanceSection.classList.add ("is-hidden");
    $opSection.classList.remove ("is-hidden");

 })

 $btnCancel.addEventListener ("click", (event)=>{
    $balanceSection.classList.remove ("is-hidden");
    $opSection.classList.add ("is-hidden");
 })

/* $btnAdd.addEventListener ("click", (event)=>{
   $opSection.classList.add ("is-hidden");
   $balanceSection.classList.remove ("is-hidden");
   $divImgOp.classList.remove ("is-hidden");
}) */



 $opForm.addEventListener ('submit', (event)=>{
   event.preventDefault ();
   console.log (event.target.description.value)
   console.log (event.target.amount.value)
   console.log (event.target.type.value)
   console.log (event.target.category.value)
   console.log (event.target.date.value)

   let descriptionValue = event.target.description.value
   

   
 })
   
  // textInf.innerText = event.target.value;


