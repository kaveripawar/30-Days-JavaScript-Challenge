document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const recipeContainer = document.getElementById('recipe-container');
    searchButton.addEventListener('click', function () {
    const query = searchInput.value;
      if (query.trim() !== '') {
        searchForRecipes(query);
      }
    });
  
    function searchForRecipes(query) {
      // const apiKey='96a24eeb007e442f9c1eb5e9fd877b14';
      const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${API_KEY}`;
      console.log(apiUrl);
      fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
          recipeContainer.innerHTML = ''; // Clear previous results
  
          // Loop through the results and display each recipe
          data.results.forEach(recipe => {
            const recipeTitle = recipe.title;
            const recipeImage = recipe.image;
            const recipeSummary = recipe.summary;
            const recipeSourceUrl = recipe.sourceUrl;
  
            const recipeElement = document.createElement('div');
            recipeElement.innerHTML = ` <h4>${recipeTitle}</h4>
            <img src="${recipeImage}" alt="${recipeTitle}" />
            
            <a href="${recipeSourceUrl}" target="_blank">Full Recipe</a>
          `;
  
            recipeContainer.appendChild(recipeElement);
          });
        })
        .catch(error => {
          console.error('Error fetching recipes:', error);
        });
    }
});

