import { getRecipes, postRecipes, patchRecipes, deleteRecipes} from "./data.js";


async function showRecipes() {
    const response = await getRecipes();
    const el = document.querySelector("template").content;
    const parent = document.querySelector(".recipes");
    parent.innerHTML = '';
    response.forEach((rec) => {
        const clone = el.cloneNode(true);
        clone.querySelector("[data-name]").textContent = rec.name;
        clone.querySelector("[data-origin]").textContent = rec.origin;
        if (rec.studentFriendly) {
            clone.querySelector("[data-sf]").hidden = false;
        } else {
            clone.querySelector("[data-sf]").hidden = true;
        }
        clone.querySelectorAll("[data-id]").forEach((e) => (e.dataset.id = rec.id));
        clone.querySelector("button[data-action='delete]").addEventListener('click', async () => {
           await deleteRecipes(rec.id);
           await showRecipes();    
        })
        clone.querySelector("button[data-action='update]").addEventListener('click', async () => {
               await patchRecipes(rec.id, !rec.studentFriendly);
               await showRecipes();    
        })
        parent.appendChild(clone);        
    });
}

function handleSubmit() {
    const form = document.querySelector("form");
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        console.log(e);
        const formData = new FormData(form);

        await postRecipes({
            name: formData.get("name"),
            description: formData.get("description"),
            origin: formData.get("origin"),
            studentFriendly: formData.get("studentFriendly"),
            ingredients: formData.get("ingredients").split("\n"),
            serves: formData.get("serves"),
            allergens: formData.get("allergens"),
            diet: formData.get("diet"),
        })
        showRecipes();
    })
}
handleSubmit();
