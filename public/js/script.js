let addIngredientsBtn = document.getElementById('addIngredientsBtn');
let ingredientList = document.querySelector('.ingredientList');
let ingredienDiv = document.querySelectorAll('.ingredienDiv')[0];

addIngredientsBtn.addEventListener('click' ,function(){
     let newingredients = ingredienDiv.cloneNode(true);
     let input = newingredients.getElementsByTagName('input')[0];
     input.value = '';
     ingredientList.appendChild(newingredients);
});