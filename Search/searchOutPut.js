const searchForm = document.querySelector('form');
const form = document.querySelector('form1');
const searchResultDiv = document.querySelector('.search-result');
const container = document.querySelector('.container');
let searchQuery = '';
const APP_ID = ``;
const APP_key = ``;
const category = 'packaged-foods';

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  searchQuery = e.target.querySelector('input').value;
  console.log(searchQuery)
   fetchAPI();
})

 async function fetchAPI(){
  const baseURL = `https://api.edamam.com/api/food-database/v2/parser?ingr=${searchQuery}&app_id=${APP_ID}&app_key=${APP_key}&category=${category}`;
  const response = await fetch(baseURL); 
  const data = await response.json();
  generateHTML(data.hints);
  console.log(data.hints);
  
}

function test(foodId){
  
  console.log(foodId);
}

 function generateHTML(results){
  container.classList.remove('initial');
  let generatedHTML= '';
  results.map(result => {
    generatedHTML += `
      <div class="item">
        <div class="flex-container">
          <h1 class="title">${result.food.label}</h1>
          <button id="button"  value=" ${result.food.foodId}" class="btn btn-primary">View</button>
        </div>
        <p class="item-data" >Brand: ${result.food.foodId}</p>
        <p class="item-data">Brand: ${result.food.brand}</p>
        <p class="item-data">Calories: ${result.food.nutrients.ENERC_KCAL.toFixed(2)}</p>
        <p class="item-data">Fat: ${result.food.nutrients.FAT.toFixed(2)}</p>
        <p class="item-data">Protein: ${result.food.nutrients.PROCNT.toFixed(2)}</p>
      </div>
    `
  })
  searchResultDiv.innerHTML = generatedHTML;
  document.getElementById("button").addEventListener("click", function(){
    test(document.getElementById("button").value);
     
  });
}

//function nutritionSearch(){
  // localStorage.setItem("food",foodId);
  // localStorage.clear(food);
 // console.log("test");
  // var id = localStorage.getItem("food");
  // console.log("foodId: " + id);
  

//}
