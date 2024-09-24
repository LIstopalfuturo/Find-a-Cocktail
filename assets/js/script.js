const apiKey = "402b52e711msh085142f0c5d7c08p16647fjsnd6bb27b2bf05";
const apiHost = "the-cocktail-db.p.rapidapi.com";

// Load previous searches from local storage on page load
document.addEventListener("DOMContentLoaded", () => {
  loadPreviousSearches();

  // Add other modal-related event listeners here...
});

async function searchCocktail() {
  const cocktailName = document.getElementById("cocktailInput").value;
  const url = `https://the-cocktail-db.p.rapidapi.com/search.php?s=${cocktailName}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": apiKey,
      "X-RapidAPI-Host": apiHost,
    },
  };
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    const drinks = data.drinks;
    if (drinks) {
      // Save the searched drinks to local storage
      saveSearchToLocal(drinks);
      displayCocktails(drinks);
    } else {
      document.getElementById("cocktailResults").innerHTML =
        "<p>No results found.</p>";
    }
  } catch (error) {
    console.error("Error fetching the cocktail data:", error);
    document.getElementById("cocktailResults").innerHTML =
      "<p>Error fetching data. Please try again.</p>";
  }
}

function displayCocktails(drinks) {
  let output = "<h2>Results:</h2>";
  drinks.forEach((drink) => {
    output += `
      <div>
        <h3>${drink.strDrink}</h3>
        <img src="${drink.strDrinkThumb}" alt="${drink.strDrink}" width="200">
        <p><strong>Instructions:</strong> ${drink.strInstructions}</p>
        <ul><strong>Ingredients:</strong>
    `;
    for (let i = 1; i <= 15; i++) {
      const ingredient = drink[`strIngredient${i}`];
      const measure = drink[`strMeasure${i}`];
      if (ingredient) {
        output += `<li>${ingredient} - ${measure || ""}</li>`;
      }
    }
    output += `</ul></div>`;
  });
  document.getElementById("cocktailResults").innerHTML = output;
}

// Save drinks to local storage
function saveSearchToLocal(drinks) {
  let previousSearches = JSON.parse(localStorage.getItem("searchedDrinks")) || [];
  // Add new drinks to the previous searches
  previousSearches = [...previousSearches, ...drinks];
  localStorage.setItem("searchedDrinks", JSON.stringify(previousSearches));
}

// Load previous searches from local storage
function loadPreviousSearches() {
  const savedDrinks = JSON.parse(localStorage.getItem("searchedDrinks"));
  if (savedDrinks && savedDrinks.length > 0) {
    displayCocktails(savedDrinks);
  }
}
