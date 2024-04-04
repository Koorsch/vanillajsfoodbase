const apikey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF4d2Nncnp5Z3NsamZ5em52Ynp1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA3NTAyNjEsImV4cCI6MjAyNjMyNjI2MX0.azqDV5E4pGDrkX_UJ1B2VOob6I0d0vX5PRLuJGrEXoA";
const endpoint = "https://axwcgrzygsljfyznvbzu.supabase.co/rest/v1/dishes";

export async function getRecipes() {
  let headersList = {
    Accept: "application/json",
    apikey: apikey,
  };

  let response = await fetch(endpoint, {
    method: "GET",
    headers: headersList,
  });
  let data = await response.json();
  return data;
}

export async function postRecipes(recipe) {
  let headersList = {
    Accept: "application/json",
    apikey: apikey,
    Prefer: "return=representation",
    "Content-Type": "application/json",
  };
  let bodyContent = JSON.stringify(recipe);
  let response = await fetch(endpoint, {
    method: "POST",
    body: bodyContent,
    headers: headersList,
  });
  let data = await response.json();
  console.log(data);
}

export async function patchRecipes(id, state=true) {
  let headersList = {
    Accept: "application/json",
    apikey: apikey,
    Prefer: "return=representation",
    "Content-Type": "application/json",
  };
  let bodyContent = JSON.stringify({
    studentFriendly: false,
  });
  let response = await fetch(endpoint + "?id.eq" + id, {
    method: "PATCH",
    body: bodyContent,
    headers: headersList,
  });
  let data = await response.json();
  return data;
}

export async function deleteRecipes(id) {
  let headersList = {
    Accept: "application/json",
    apikey: apikey,
    Prefer: "return=representation",
  };
  let response = await fetch(endpoint + "?id=eq." + id, {
    method: "DELETE",
    headers: headersList,
  });
  let data = await response.json();
  return data;
}
