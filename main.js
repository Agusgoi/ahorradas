const $ = (selector) => document.querySelector(selector);

window.addEventListener("load", () => {
  // --------------- VARIABLES ---------------

  let operations = [];
  let EditOp = {};

  // Regex
  const regExpAlpha = /^[a-zA-Z0-9-\sñáéíóúüª!:?'¡].{4,20}$/;
  const regExpNumber = /^[1-9]\d*(,\d+)?$/;

  //body elements
  const $balanceSection = $("#balance-section");
  const $opSection = $("#op-section");
  const $editOpSection = $("#edit-op-section");
  const $divImgOp = $("#div-img-op");
  const $opForm = $("#op-form");
  const $editOpForm = $("#edit-op-form");
  const $opTable = $("#op-table");
  const $tableBody = $("#table-body");
  let $profitTotal = $("#profit-total");
  let $expensesTotal = $("#expenses-total");
  let $balanceTotal = $("#balance-total");
  const $categSection = $("#category-section");
  const $categTableBody = $("#body-table-categ");
  const $editCateg = $("#edit-categ");
  const $reportSection = $("#report-section");

  //buttons
  const $btnNewOp = $("#btn-newop");
  const $btnCancel = $("#btn-cancel");
  const $btnEditCancel = $("#edit-btn-cancel");
  const $btnAddCateg = $("#add-categ");
  const $btnBalance = $("#btn-balance");
  const $btnCateg = $("#btn-categ");
  const $btnReport = $("#btn-report");
  const $btnEditCategCancel = $("#editcateg-btn-cancel");
  const $btnEditCategSave = $("#editcateg-btn-save");

  //inputs
  const $descriptionInput = $("#description-input");
  const $amountInput = $("#amount-input");
  const $typeSelect = $("#type-select");
  const $categSelect = $("#categ-select");
  const $dateInput = $("#date-input");
  const $newCategInput = $("#new-categ");

  //edit inputs
  const $editDescriptionInput = $("#edit-description-input");
  const $editAmountInput = $("#edit-amount-input");
  const $editTypeSelect = $("#edit-type-select");
  const $editCategSelect = $("#edit-categ-select");
  const $editDateInput = $("#edit-date-input");

  const $editCategNameInput = $("#edit-categ-name");

  //filter inputs
  const $typeFilter = $("#type-filter");
  const $categoryFilter = $("#category-filter");
  const $dateFilter = $("#date-filter");
  const $orderByFilter = $("#orderby-filter");

  //errors
  const $descriptionError = $(".description-error");
  const $amountError = $(".amount-error");
  const $dateError = $(".date-error");
  const $formError = $(".form-error");

  // ----------- BUTTONS EVENTS -----------

  $btnNewOp.addEventListener("click", (event) => {
    $balanceSection.classList.add("is-hidden");
    $opSection.classList.remove("is-hidden");
  });

  $btnCancel.addEventListener("click", (event) => {
    $balanceSection.classList.remove("is-hidden");
    $opSection.classList.add("is-hidden");
  });

  $btnBalance.addEventListener("click", () => {
    $categSection.classList.add("is-hidden");
    $balanceSection.classList.remove("is-hidden");
  });

  $btnCateg.addEventListener("click", () => {
    $categSection.classList.remove("is-hidden");
    $balanceSection.classList.add("is-hidden");
  });

  $btnReport.addEventListener("click", () => {
    $reportSection.classList.remove("is-hidden");
    $balanceSection.classList.add("is-hidden");
  });

  // ********************************** BALANCE ********************************** //

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
  };

  // Paint

  const paint = (array) => {
    $tableBody.innerHTML = "";

    array.forEach((element) => {
      if (element.Type === "profit") {
        $tableBody.innerHTML += `<tr><td>${element.Description}</td>
      <td>${element.Category}</td>
      <td class="has-text-success has-text-weight-bold">$ ${element.Amount}</td>
      <td>${element.Date}</td>
      <td><button class="btn-edit" id=${element.id}>Editar</button>
      <button class="btn-delete" id=${element.id}>Eliminar</button></td></tr>`;
      } else {
        $tableBody.innerHTML += `<tr><td>${element.Description}</td>
      <td>${element.Category}</td>
      <td class="has-text-danger has-text-weight-bold">$ ${element.Amount}</td>
      <td>${element.Date}</td>
      <td><button class="btn-edit" id=${element.id}>Editar</button>
      <button class="btn-delete" id=${element.id}>Eliminar</button></td></tr>`;
      }
    });

    // Delete

    $btnDeleteOp = document.querySelectorAll(".btn-delete");
    $btnDeleteOp.forEach((button) => {
      button.addEventListener("click", (event) => {
        console.log("click delete");
        operations = operations.filter((op) => op.id !== event.target.id);
        paint(operations);
        // localStorage.setItem("operations", JSON.stringify(operations));
        generateOperationTable(JSON.parse(localStorage.getItem("operations")));
      });
    });

    // Edit

    $btnEditOp = document.querySelectorAll(".btn-edit");
    $btnEditOp.forEach((button) => {
      button.addEventListener("click", (event) => {
        $editOpSection.classList.remove("is-hidden");
        $balanceSection.classList.add("is-hidden");
        editOp = operations.find((op) => op.id === event.target.id);

        $editDescriptionInput.value = editOp.Description;
        $editAmountInput.value = editOp.Amount;
        $editTypeSelect.value = editOp.Type;
        $editCategSelect.value = editOp.Category;
        $editDateInput.value = editOp.Date;
      });
    });
  };

  // ----------- EDIT OP FORM -----------

  $btnEditCancel.addEventListener("click", (event) => {
    event.preventDefault();
    $editOpSection.classList.add("is-hidden");
    $balanceSection.classList.remove("is-hidden");
    $opTable.classList.remove("is-hidden");
  });

  $editDescriptionInput.addEventListener("blur", () => {
    editOp.Description = $editDescriptionInput.value;
  });

  $editAmountInput.addEventListener("blur", () => {
    editOp.Amount = $editAmountInput.value;
  });

  $editTypeSelect.addEventListener("blur", () => {
    editOp.Type = $editTypeSelect.value;
  });

  $editCategSelect.addEventListener("blur", () => {
    editOp.Category = $editCategSelect.value;
  });

  $editDateInput.addEventListener("blur", () => {
    editOp.Date = $editDateInput.value;
  });

  // EDIT Submit

  $editOpForm.addEventListener("submit", (event) => {
    event.preventDefault();
    $editOpSection.classList.add("is-hidden");
    $balanceSection.classList.remove("is-hidden");
    $opTable.classList.remove("is-hidden");
    paint(operations);

    localStorage.setItem("operations", JSON.stringify(operations));

  });

  // Balance Function

  const totalSum = (array) => {
    let profitTotal = 0;
    let expenseTotal = 0;

    array.forEach((op) => {
      if (op.Type === "expense") {
        expenseTotal = expenseTotal += Number(op.Amount);
      } else {
        profitTotal = profitTotal += Number(op.Amount);
      }
    });

    $profitTotal.innerText = `$ ${profitTotal}`;
    $expensesTotal.innerText = `$ ${expenseTotal}`;
    $balanceTotal.innerText = `$ ${profitTotal + expenseTotal}`;
  };

  //  ------------ FILTERS -------------  //

  // Filter per Type


  let opFiltered = [];
  const filterPerType = () => {
    //let opFiltered = [];
    if ($typeFilter.value !== "all") {
      opFiltered = operations.filter((op) => op.Type === $typeFilter.value);
      paint(opFiltered);
    } else {
      paint(operations);
    }
  };

  $typeFilter.addEventListener("input", filterPerType);

  // Filter per Category

  const filterPerCategory = () => {
    // let opFiltered = [];
    if ($categoryFilter.value !== "all") {
      opFiltered = operations.filter(
        (op) => op.Category === $categoryFilter.value
      );
      paint(opFiltered);
    } else {
      paint(operations);
    }
  };

  $categoryFilter.addEventListener("input", filterPerCategory);



  // Order per Status

  $orderByFilter.addEventListener("input", () => {
    console.log(operations);
    let orderAlpha = [...operations];

    if ($orderByFilter.value === "a-z") {
      orderAlpha.sort(function (a, b) {
        if (a.Description > b.Description) {
          return 1;
        }
        if (a.Description < b.Description) {
          return -1;
        }
        return 0;
      });
      paint(orderAlpha);
    } else if ($orderByFilter.value === "z-a") {
      orderAlpha.sort(function (a, b) {
        if (a.Description < b.Description) {
          return 1;
        }
        if (a.Description > b.Description) {
          return -1;
        }
        return 0;
      });
      paint(orderAlpha);
    }
  });

 

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
      $amountError.innerText =
        "Monto invalido. Debe ser mayor a 0, puede usar coma.";
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

    // PUSH to Operations array

    if (!errors && !validationErrors) {
      operations.push({
        id: crypto.randomUUID(),
        Description: $descriptionInput.value,
        Amount: $amountInput.value,
        Type: $typeSelect.value,
        Category: $categSelect.value,
        Date: $dateInput.value,
      });

      paint(operations);
      reseatInputs();

      $opSection.classList.add("is-hidden");
      $balanceSection.classList.remove("is-hidden");
      $divImgOp.classList.add("is-hidden");
      $opTable.classList.remove("is-hidden");
    }

    totalSum(operations);

    localStorage.setItem("operations", JSON.stringify(operations));
   
  });

  // ********************************** CATEGORIES ********************************** //

  let defaultCategories = [
    { id: crypto.randomUUID(), Name: "Comida" },
    { id: crypto.randomUUID(), Name: "Servicios" },
    { id: crypto.randomUUID(), Name: "Salidas" },
    { id: crypto.randomUUID(), Name: "Educacion" },
    { id: crypto.randomUUID(), Name: "Trabajo" },
  ];

  let categories = [...defaultCategories];

  const udpateCategories = (array, input) => {
    input.innerHTML = "";

    if (input === $categoryFilter) {
      input.innerHTML = `<option value="all">Todas</option>`;
    }

    array.forEach((element) => {
      input.innerHTML += `<option value="${element.Name}">${element.Name}</option>`;
    });
  };
  udpateCategories(categories, $categoryFilter);
  udpateCategories(categories, $categSelect);
  udpateCategories(categories, $editCategSelect);

  // Category Paint

  const categoryPaint = (array) => {
    $categTableBody.innerHTML = "";
    array.forEach((element) => {
      $categTableBody.innerHTML += `
  <tr><td>${element.Name}</td>
  <td><button class="btn-edit-categ button is-info is-small" id=${element.id}>Editar</button>
  <button class="btn-delete-categ button is-danger is-outlined is-small" id=${element.id}>Eliminar</button></td></tr>`;
    });

    localStorage.setItem("categories", JSON.stringify(categories));

    // Delete Category

    $btnDeleteCategory = document.querySelectorAll(".btn-delete-categ");
    $btnDeleteCategory.forEach((button) => {
      button.addEventListener("click", (event) => {
        categories = categories.filter((op) => op.id !== event.target.id);
        categoryPaint(categories);
        udpateCategories(categories, $categoryFilter);
        udpateCategories(categories, $categSelect);
        udpateCategories(categories, $editCategSelect);

        localStorage.setItem("categories", JSON.stringify(categories));
        const getCategFromLocalStorage = JSON.parse(
          localStorage.getItem("categories")
        );
        categoryPaint(getCategFromLocalStorage);
      });
    });

    // Edit Category

    $btnEditCategory = document.querySelectorAll(".btn-edit-categ");
    $btnEditCategory.forEach((button) => {
      button.addEventListener("click", (event) => {
        $categSection.classList.add("is-hidden");
        $balanceSection.classList.add("is-hidden");
        $editCateg.classList.remove("is-hidden");

        editCategory = categories.find((categ) => categ.id === event.target.id);
        $editCategNameInput.value = editCategory.Name;
      });
    });
  };

  $btnEditCategCancel.addEventListener("click", (event) => {
    event.preventDefault();
    $editCateg.classList.add("is-hidden");
    $categSection.classList.remove("is-hidden");
  });

  $editCategNameInput.addEventListener("blur", () => {
    editCategory.Name = $editCategNameInput.value;
  });

  // Edit Category Submit

  $btnEditCategSave.addEventListener("click", (event) => {
    event.preventDefault();

    $editCateg.classList.add("is-hidden");
    $categSection.classList.remove("is-hidden");
    categoryPaint(categories);
    udpateCategories(categories, $categoryFilter);
    udpateCategories(categories, $categSelect);
    udpateCategories(categories, $editCategSelect);

    localStorage.setItem("operations", JSON.stringify(operations));

  });

  categoryPaint(defaultCategories);

  // New Category

  $btnAddCateg.addEventListener("click", (event) => {
    categories.push({
      id: crypto.randomUUID(),
      Name: $newCategInput.value,
    });
    categoryPaint(categories);

    $categoryFilter.innerHTML += `<option value="${$newCategInput.value}">${$newCategInput.value}</option>`;
    $categSelect.innerHTML += `<option value="${$newCategInput.value}">${$newCategInput.value}</option>`;
    $editCategSelect.innerHTML += `<option value="${$newCategInput.value}">${$newCategInput.value}</option>`;
  });



// ********************************** REPORTS ********************************** //



const profitPerCategory = (array, category) => {
  let profitCateg = 0;

array.forEach((element) => {
  console.log('entre al array')
  console.log(element.Category)
  if (element.Category === category) {
    profitCateg = profitCateg += Number(element.Amount);
  };
});
};


profitPerCategory (operations, 'comida')







  // PENDIENTES
  // no pude aplicar validacion ala fecha
  // no pude filtrar por fecha
  // cambiar las categorias a espa;ol cuando hago el print
  // localstorage, se guardan las op en el array pero cuando hago refresh pierdo la info
  // los filtros funcionan pero no se aplican encadenados
  // Reportes


 // DATE FUNCTIONS

  /* let day = new Date();
$("#dateOperation").value =
  day.getFullYear() +
  "-" +
  ("0" + (day.getMonth() + 1)).slice(-2) +
  "-" +
  ("0" + day.getDate()).slice(-2);

const formatDate = (day) => {
  const newDate = day.split("-").reverse();
  return newDate.join("-");
};
 */


  //estos cierran la funcion window-load
});
