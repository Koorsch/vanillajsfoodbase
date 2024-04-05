import { createRecipe, getRecipes, deleteRecipe, updateRecipe } from "./modules/data.js";

// get the countries/code
import { setupCountries } from "./modules/setup.js";
setupCountries();

async function showRecipes() {
  const response = await getRecipes();
  const el = document.querySelector("template").content;
  const parent = document.querySelector("#recipes");
  parent.innerHTML = "";
  response.forEach((rec) => {
    const clone = el.cloneNode(true);

    // studentfriendly?
    //put in a cross/checkmark svg...
    //make sure it doesn't put it in the end of the queue
    if (rec.studentFriendly) {
      clone.querySelector(".sf").hidden = false;
    } else {
      clone.querySelector(".sf").hidden = true;
    }

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
      //If clicked, compare with filled out form in a new function?
      //If nothing has been filled, focus on the form
      //Once clicked, run update() with the new values and then show().
      await updateRecipe(rec.id, rec.studentFriendly);
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
    form.checkValidity();
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
  form.reset();
}
makeRecipe();
