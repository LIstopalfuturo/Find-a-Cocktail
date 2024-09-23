
      const apiKey = "402b52e711msh085142f0c5d7c08p16647fjsnd6bb27b2bf05";
      const apiHost = "the-cocktail-db.p.rapidapi.com";

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
    
      async function fetchQuote() {
        const url =
          "https://quotes15.p.rapidapi.com/quotes/random/?language_code=en";
        const options = {
          method: "GET",
          headers: {
            "x-rapidapi-key":
              "444bbe7291msh289be5985a3a910p1973c2jsnddfaf792b7b6",
            "x-rapidapi-host": "quotes15.p.rapidapi.com",
          },
        };
        try {
          const response = await fetch(url, options);
          const result = await response.json();
          const quote = result.content;
          document.getElementById("modal-body").innerText = quote;
        } catch (error) {
          console.error("Error fetching quote:", error);
          document.getElementById("modal-body").innerText =
            "Failed to fetch quote. Please try again.";
        }
      }
    

document.addEventListener('DOMContentLoaded', () => {
    // Functions to open and close a modal
    function openModal($el) {
      $el.classList.add('is-active');
    }
  
    function closeModal($el) {
      $el.classList.remove('is-active');
    }
  
    function closeAllModals() {
      (document.querySelectorAll('.modal') || []).forEach(($modal) => {
        closeModal($modal);
      });
    }
  
    // Add a click event on buttons to open a specific modal
    (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
      const modal = $trigger.dataset.target;
      const $target = document.getElementById(modal);
  
      $trigger.addEventListener('click', () => {
        openModal($target);
      });
    });
  
    // Add a click event on various child elements to close the parent modal
    (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
      const $target = $close.closest('.modal');
  
      $close.addEventListener('click', () => {
        closeModal($target);
      });
    });
  
    // Add a keyboard event to close all modals
    document.addEventListener('keydown', (event) => {
      if(event.key === "Escape") {
        closeAllModals();
      }
    });
  });