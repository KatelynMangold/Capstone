const searchForm = document.querySelector('form');
const searchResultDiv = document.querySelector('.search-result');
const container = document.querySelector('.container');
let searchQuery = '';
const APP_ID = `7a3badb5`;
const APP_KEY = `3d128a14b31e1c19e5c7b97ba59e5722`;
var foodId = 'food_bnbh4ycaqj9as0a9z7h9xb2wmgat';

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  searchQuery = e.target.querySelector('input').value;
  console.log(searchQuery)
   fetchAPI();
})

  async function fetchAPI(){
  const baseURL = `https://api.edamam.com/api/food-database/v2/parser?ingr=${searchQuery}&app_id=${APP_ID}&app_key=${APP_KEY}`;
  const response = await fetch(baseURL); 
  const data = await response.json();
  fetchAPI2();
  console.log(data);
}

let _data = {
  "ingredients": [
      {
        "quantity": 1,
        "measureURI": "http://www.edamam.com/ontologies/edamam.owl#Measure_unit",
        "foodId": foodId
      }
    ]
}

async function fetchAPI2(){
  const baseURL = `https://api.edamam.com/api/food-database/v2/nutrients?app_id=${APP_ID}&app_key=${APP_KEY}`;
  const response = await fetch(baseURL, {
      method: "POST",
      body: JSON.stringify(_data),
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
  }); 
  var data = await response.json();
  console.log(data);
  generateHTML(data);
}

//fetchAPI2(); 
  
// Function to hide the loader 


   function generateHTML(data){
  /*  let tab =  
    `<tr> 
      <th>Name</th> 
      <th>Office</th> 
      <th>Position</th> 
      <th>Salary</th> 
     </tr>`; 

     for (let r of data.results) { 
      tab += `<tr>  
  <td>${r.calories} </td> 
  <td>${r.cautions}</td> 
  <td>${r.healthLabels}</td>  
  <td>${r.totalWeight}</td>           
</tr>`; 
  } 
  // Setting innerHTML as tab variable 
  document.getElementById("employees").innerHTML = tab;  */


    container.classList.remove('initial');
   let generatedHTML= '';
    data.ingredients.map(result => {
    generatedHTML += `
    <div class="item">
    <p class="item-data">Calories: ${data.calories}</p>
    <p class="item-data">Cautions: ${data.cautions}</p>
    <p class="item-data">Diet Labels: ${data.dietLabels}</p>
    <p class="item-data">Health Labels: ${data.healthLabels}</p>
    <p class="item-data">${data.totalDaily.CA.label} ${data.totalDaily.CA.quantity}${data.totalDaily.CA.unit}</p>
    <p class="item-data">${data.totalDaily.CHOCDF.label} ${data.totalDaily.CHOCDF.quantity}${data.totalDaily.CHOCDF.unit}</p>
    <p class="item-data">${data.totalDaily.CHOLE.label} ${data.totalDaily.CHOLE.quantity}%</p>
    <p class="item-data">${data.totalDaily.ENERC_KCAL.label} ${data.totalDaily.ENERC_KCAL.quantity}%</p>
    <p class="item-data">${data.totalDaily.ENERC_KCAL.label} ${data.totalDaily.ENERC_KCAL.quantity}%</p>
    <p class="item-data">Saturated ${data.totalDaily.FASAT.quantity}%</p>
    <p class="item-data">Fat ${data.totalDaily.FAT.quantity}%</p>
    <p class="item-data">Iron ${data.totalDaily.FE.quantity}%</p>
    <p class="item-data">Fiber ${data.totalDaily.FIBTG.quantity}%</p>
    <p class="item-data">Folate ${data.totalDaily.FOLDFE.quantity}%</p>
    <p class="item-data">Potassium ${data.totalDaily.K.quantity}%</p>
    <p class="item-data">Magnesium ${data.totalDaily.MG.quantity}%</p>
    <p class="item-data">Sodium ${data.totalDaily.NA.quantity}%</p>
    <p class="item-data">Niacin B3 ${data.totalDaily.NIA.quantity}%</p>
    <p class="item-data">Phosphorus ${data.totalDaily.P.quantity}%</p>
    <p class="item-data">Protein ${data.totalDaily.PROCNT.quantity}%</p>
    <p class="item-data">Riboflavin B2 ${data.totalDaily.RIBF.quantity}%</p>
    <p class="item-data">Thimin ${data.totalDaily.THIA.quantity}%</p>
    <p class="item-data">Vitamin E ${data.totalDaily.TOCPHA.quantity}%</p>
    <p class="item-data">Vitamin A ${data.totalDaily.VITA_RAE.quantity}%</p>
    <p class="item-data">Vitamin B6 ${data.totalDaily.VITB6A.quantity}%</p>
    <p class="item-data">Vitamin B12 ${data.totalDaily.VITB12.quantity}%</p>
    <p class="item-data">Vitamin C ${data.totalDaily.VITC.quantity}%</p>
    <p class="item-data">Vitamin D ${data.totalDaily.VITD.quantity}%</p>
    <p class="item-data">Vitamin k ${data.totalDaily.VITK1.quantity}%</p>
    <p class="item-data">Zinc ${data.totalDaily.ZN.quantity}%</p>
    <p>Nutrients</p>
    <p class="item-data">${data.totalNutrients.CA.label} ${data.totalNutrients.CA.quantity}${data.totalNutrients.CA.unit}</p>
    <p class="item-data">${data.totalNutrients.CHOCDF.label} ${data.totalNutrients.CHOCDF.quantity}${data.totalNutrients.CHOCDF.unit}</p>
    <p class="item-data">${data.totalNutrients.CHOLE.label} ${data.totalNutrients.CHOLE.quantity}${data.totalNutrients.CHOLE.unit}</p>
    <p class="item-data">${data.totalNutrients.ENERC_KCAL.label} ${data.totalNutrients.ENERC_KCAL.quantity}${data.totalNutrients.ENERC_KCAL.unit}</p>
    <p class="item-data">${data.totalNutrients.ENERC_KCAL.label} ${data.totalNutrients.ENERC_KCAL.quantity}${data.totalNutrients.ENERC_KCAL.unit}</p>
    <p class="item-data">Saturated ${data.totalNutrients.FASAT.quantity}${data.totalNutrients.FASAT.unit}</p>
    <p class="item-data">Fat ${data.totalNutrients.FAT.quantity}${data.totalNutrients.FAT.unit}</p>
    <p class="item-data">Iron ${data.totalNutrients.FE.quantity}${data.totalNutrients.FE.unit}</p>
    <p class="item-data">Fiber ${data.totalNutrients.FIBTG.quantity}${data.totalNutrients.FIBTG.unit}</p>
    <p class="item-data">Folate ${data.totalNutrients.FOLDFE.quantity}${data.totalNutrients.FOLDFE.unit}</p>
    <p class="item-data">Potassium ${data.totalNutrients.K.quantity}${data.totalNutrients.K.unit}</p>
    <p class="item-data">Magnesium ${data.totalNutrients.MG.quantity}${data.totalNutrients.MG.unit}</p>
    <p class="item-data">Sodium ${data.totalNutrients.NA.quantity}${data.totalNutrients.NA.unit}</p>
    <p class="item-data">Niacin B3 ${data.totalNutrients.NIA.quantity}${data.totalNutrients.NIA.unit}</p>
    <p class="item-data">Phosphorus ${data.totalNutrients.P.quantity}${data.totalNutrients.P.unit}</p>
    <p class="item-data">Protein ${data.totalNutrients.PROCNT.quantity}${data.totalNutrients.PROCNT.unit}</p>
    <p class="item-data">Riboflavin B2 ${data.totalNutrients.RIBF.quantity}${data.totalNutrients.RIBF.unit}</p>
    <p class="item-data">Thimin ${data.totalNutrients.THIA.quantity}${data.totalNutrients.THIA.unit}</p>
    <p class="item-data">Vitamin E ${data.totalNutrients.TOCPHA.quantity}${data.totalNutrients.TOCPHA.unit}</p>
    <p class="item-data">Vitamin A ${data.totalNutrients.VITA_RAE.quantity}${data.totalNutrients.VITA_RAE.unit}</p>
    <p class="item-data">Vitamin B6 ${data.totalNutrients.VITB6A.quantity}${data.totalNutrients.VITB6A.unit}</p>
    <p class="item-data">Vitamin B12 ${data.totalNutrients.VITB12.quantity}${data.totalNutrients.VITB12.unit}</p>
    <p class="item-data">Vitamin C ${data.totalNutrients.VITC.quantity}${data.totalNutrients.VITC.unit}</p>
    <p class="item-data">Vitamin D ${data.totalNutrients.VITD.quantity}${data.totalNutrients.VITD.unit}</p>
    <p class="item-data">Vitamin k ${data.totalNutrients.VITK1.quantity}${data.totalNutrients.VITK1.unit}</p>
    <p class="item-data">Zinc ${data.totalNutrients.ZN.quantity}${data.totalNutrients.ZN.unit}</p>

  </div>
    `
  })
container.innerHTML = generatedHTML; 

}