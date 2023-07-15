const loadMeals = (searchText) => {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`
  fetch(url)
    .then(res => res.json())
    .then(data => displayMeals(data.meals));
}

const displayMeals = meals => {
  const mealContainer = document.getElementById('meals-container');
  mealContainer.innerText = '';
  meals.forEach(meal => {
    console.log(meal)
    const mealDiv = document.createElement('div');
    mealDiv.classList.add('col');
    mealDiv.innerHTML = `
        <div class="card h-100">
        <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${meal.strMeal}</h5>
          <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
          <button onclick="loadMealDetail2(${meal.idMeal})" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#mealDetail">
            Details
          </button>
        </div>
      </div>
        
        `
    mealContainer.appendChild(mealDiv);
  })
}

const searchMeals = () => {
  const searchText = document.getElementById('search-field').value;
  console.log(searchText);
  loadMeals(searchText);
}

loadMealDetails = idMeal => {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`;
  console.log(url)
  fetch(url)
    .then(res => res.json())
    .then(data => displayMealDetails(data.meals[0]))
    .catch(error => {
      console.log(error)
    })
}

const loadMealDetail2 = async (idMeal) => {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    displayMealDetails(data.meals[0]);
  }
  catch (error) {
    console.log(error)
  }
}

const displayMealDetails = meal => {
  document.getElementById('mealDetailLabel').innerText = meal.strMeal;
  const mealDetails = document.getElementById('mealDetailBody');
  mealDetails.innerHTML = `
  <img class="img-fluid" src="${meal.strMealThumb}">
  `
}

loadMeals('fish');