console.log("test");
const container = document.querySelector('.container');
const APP_ID = `7a3badb5`;
const APP_key = `3d128a14b31e1c19e5c7b97ba59e5722`;
const FOOD_ID = '';

let _data = {
    "ingredients": [
        {
          "quantity": 1,
          "measureURI": "http://www.edamam.com/ontologies/edamam.owl#Measure_unit",
          "foodId": "food_bnbh4ycaqj9as0a9z7h9xb2wmgat"
        }
      ]
  }

 function fetchAPI(){
    const baseURL = `https://api.edamam.com/api/food-database/v2/nutrients?app_id=${APP_ID}&app_key=${APP_KEY} `;
    const response = await fetch(baseURL, {
        method: "POST",
        body: JSON.stringify(_data)
    }); 
    const data = await response.json();
    generateHTML(data.hints)
    console.log(data);
  }

  function generateHTML(results){
    container.classList.remove('initial');
    let generatedHTML= '';
    results.map(result => {
      generatedHTML += `
        <div class="item">
          <img src="${result.food.image}" alt="img">
          <div class="flex-container">
            <h1 class="title">${result.food.label}</h1>
            <a class="view-btn" href="table.html">View Recipe</a>
          </div>
          <p class="item-data">Calories: ${result.food.foodId}</p>
        </div>
      `
    })
    searchResultDiv.innerHTML = generatedHTML;
  
  }