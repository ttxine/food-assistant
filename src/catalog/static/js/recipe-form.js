const foodSelects = document.querySelectorAll("#foodSelect");
const unitSelects = document.querySelectorAll(".form-unit");

// Отключение поля количества, если "на вкус"
function disableAmountInput(unitSelect) {
    option = unitSelect.options[unitSelect.selectedIndex];
    if (option.getAttribute('countable') == 'false') {
        unitSelect.parentNode.parentNode.querySelector(".form-amount").setAttribute("disabled", "");
        unitSelect.parentNode.parentNode.querySelector(".form-amount").value = null;
    } else {
        unitSelect.parentNode.parentNode.querySelector(".form-amount").removeAttribute("disabled");
    }
}


function changeUnitInput(event) {
    disableAmountInput(event.target);
}

// Меняем queryset unit-ов
function changeUnitQueryset() {
    const number = this.parentNode.parentNode.getAttribute("form-number");
    const foodId = $(this).val();
    const url = $("#recipeForm").attr("url-load-units");

    $.ajax({
        url: url,
        data: {
        'food_id': foodId
        },
        success: function (data) {
            let selectHTML = "<option value=\"\" selected=\"\">---------</option>"
            for (unit of data) {
                selectHTML += `<option countable="${unit.is_countable}" value="${unit.id}">${unit.name}</option>`
            }
            $(`#id_ingredient-${number}-unit`).html(selectHTML);
        }
    })
}

// Ingredient Formset
const ingredientForm = document.querySelector("#emptyIngredient"),
      addIngredientBtn = document.querySelector("#addIngredientBtn"),
      ingredientFormSet = document.querySelector("#ingredientFormSet");


function addIngredientForm() {
    newFormNumber = ingredientFormSet.querySelectorAll("#ingredientForm").length;
    document.querySelector("#id_ingredient-TOTAL_FORMS").value = newFormNumber + 1;

    newForm = ingredientForm.cloneNode(true);
    newForm.innerHTML = newForm.innerHTML.replaceAll('__prefix__', newFormNumber);
    removeBtn = newForm.querySelector("#removeIngredient");
    removeBtn.setAttribute('onclick', removeBtn.getAttribute('onclick').replace('__prefix__', newFormNumber));
    newForm.setAttribute('form-number', newFormNumber);
    newForm.removeAttribute('style');
    newForm.id = "ingredientForm";
    newForm.querySelector("#foodSelect").onchange = changeUnitQueryset;
    newForm.querySelector(".form-unit").onchange = changeUnitInput;
    ingredientFormSet.appendChild(newForm);
}


function removeIngredientForm(formNumber) {
    form = ingredientFormSet.querySelector(`#ingredientForm[form-number="${formNumber}"]`);
    number = Number(form.getAttribute('form-number'));
    form.remove();
    for (form of ingredientFormSet.children) {
        if (form.getAttribute('form-number') > number) {
            form.setAttribute('form-number', form.getAttribute('form-number') - 1);
            for (child of form.children) {
                for (field of child.children) {
                    if (field.getAttribute('for') != null) {
                        newFor = field.getAttribute('for').replace(/ingredient-\d/g, `ingredient-${number}`);
                        field.setAttribute('for', newFor);
                    }
                    if (field.getAttribute('name') != null) {
                        newName = field.getAttribute('name').replace(/ingredient-\d/g, `ingredient-${number}`);
                        field.setAttribute('name', newName);
                    }
                    if (field.id != null) {
                        newId = field.id.replace(/ingredient-\d/g, `ingredient-${number}`);
                        field.id = newId;
                    }
                }
                if (child.getAttribute('onclick') != null) {
                    newOnclick = `removeIngredientForm(${number})`;
                    child.setAttribute('onclick', newOnclick);
                }    
            }
            number += 1;
        }
    }
    document.querySelector("#id_ingredient-TOTAL_FORMS").value -= 1;
}

// Direction Formset
const directionForm = document.querySelector("#emptyDirection"),
      addDirectionBtn = document.querySelector("#addDirectionBtn"),
      directionFormSet = document.querySelector("#directionFormSet");

function addDirectionForm() {
    newFormNumber = directionFormSet.querySelectorAll("#directionForm").length;
    document.querySelector("#id_direction-TOTAL_FORMS").value = newFormNumber + 1;

    newForm = directionForm.cloneNode(true);
    newForm.innerHTML = newForm.innerHTML.replaceAll('__prefix__', newFormNumber);
    removeBtn = newForm.querySelector("#removeDirection");
    removeBtn.setAttribute('onclick', removeBtn.getAttribute('onclick').replace('__prefix__', newFormNumber));
    newForm.setAttribute('form-number', newFormNumber);
    newForm.removeAttribute('style');
    newForm.id = "directionForm";
    directionFormSet.appendChild(newForm);
}


function removeDirectionForm(formNumber) {
    form = directionFormSet.querySelector(`#directionForm[form-number="${formNumber}"]`);
    number = Number(form.getAttribute('form-number'));
    form.remove();
    for (form of directionFormSet.children) {
        if (form.getAttribute('form-number') > number) {
            form.setAttribute('form-number', form.getAttribute('form-number') - 1);
            for (child of form.children) {
                for (field of child.children) {
                    if (field.getAttribute('for') != null) {
                        newFor = field.getAttribute('for').replace(/direction-\d/g, `direction-${number}`);
                        field.setAttribute('for', newFor);
                    }
                    if (field.getAttribute('name') != null) {
                        newName = field.getAttribute('name').replace(/direction-\d/g, `direction-${number}`);
                        field.setAttribute('name', newName);
                    }
                    if (field.id != null) {
                        newId = field.id.replace(/direction-\d/g, `direction-${number}`);
                        field.id = newId;
                    }
                }
                if (child.getAttribute('onclick') != null) {
                    newOnclick = `removeDirectionForm(${number})`;
                    child.setAttribute('onclick', newOnclick);
                }    
            }
            number += 1;
        }
    }
    document.querySelector("#id_direction-TOTAL_FORMS").value -= 1;
}


document.addEventListener('DOMContentLoaded', () => {
    for (foodSelect of foodSelects) {
        $(foodSelect).on("change", changeUnitQueryset);
    }
    for (unitSelect of unitSelects) {
        disableAmountInput(unitSelect);
        $(unitSelect).on("change", changeUnitInput);
    };

    addIngredientBtn.addEventListener('click', addIngredientForm);
    addDirectionBtn.addEventListener('click', addDirectionForm);
})
