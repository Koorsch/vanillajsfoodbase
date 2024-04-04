import { createRecipe, getRecipes, deleteRecipe, updateRecipe } from "./modules/data.js";

// get the countries/code
import { setupCountries } from "./modules/setup.js";
setupCountries();

async function showRecipes() {
  const response = await getRecipes();
  console.log("Currently FOODBASE contains: \n\n");
  console.table(response);
  const el = document.querySelector("template").content;
  const parent = document.querySelector(".recipes");
  parent.innerHTML = "";
  response.forEach((rec) => {
    const clone = el.cloneNode(true);

    // studentfriendly? 
    if (rec.studentFriendly) {
      clone.querySelector(".sf").hidden = false;
    } else {
      clone.querySelector(".sf").hidden = true;
    }

    // texts
      // unique name,id and for
    const dishName = clone.querySelector("input[name='card__dish']");
    const dishId = clone.querySelector("input[id='card__dish']");
    const dishLabel = clone.querySelector("label[for='card__dish']");
    dishName.setAttribute("name", "dish" + rec.id);
    dishId.setAttribute("id", "dish" + rec.id);
    dishLabel.setAttribute("for", "dish" + rec.id)
    
    // filling the rest of the template 
    clone.querySelectorAll("[data-id]").forEach((e) => (e.dataset.id = rec.id));
    clone.querySelector("[data-name]").textContent = rec.name;
    clone.querySelector("[data-description]").textContent = rec.description;
    clone.querySelector("[data-dishtype]").textContent = rec.dishtype;
    clone.querySelector("[data-origin]").textContent = rec.origin;
    clone.querySelector("[data-diet]").textContent = rec.diet;
    clone.querySelector("[data-ingredients]").textContent = rec.ingredients;
    clone.querySelector("[data-allergens]").textContent = rec.allergens;
    
    // image?
      // if no imgurl supplied, default to banana.png?
        // MAKE IT 
    // clone.querySelector("[data-image]").src = rec.imgURL;

    // buttons
    clone.querySelector("button[data-action='delete']").addEventListener("click", async () => {
      await deleteRecipe(rec.id);
      await showRecipes();
    });
    clone.querySelector("button[data-action='update']").addEventListener("click", async () => {
      await updateRecipe(rec.id, !rec.studentFriendly);
      await showRecipes();
    });
    // append dat shiz
    parent.appendChild(clone);
  });
}
showRecipes();

function makeRecipe() {
  const form = document.querySelector("form");
  form.addEventListener("submit", async (e) => {
    console.table(e);
    //stop refresh
    e.preventDefault();
    const formData = new FormData(form);

    await createRecipe({
      name: formData.get("name"),
      description: formData.get("description"),
      ingredients: formData.get("ingredients").split("\n"),
      serves: formData.get("serves"),
      allergens: formData.getAll("allergens"),
      diet: formData.get("diet"),
      studentFriendly: formData.get("studentFriendly"),
      origin: formData.get("origin"),
      dishtype: formData.get("dishtype"),
    });
    showRecipes();
  });
}
makeRecipe();
