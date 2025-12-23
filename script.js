/*************************
* SUPABASE CONFIG
*************************/
const SUPABASE_URL = "https://tyipwaiefbocipkfsjtx.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR5aXB3YWllZmJvY2lwa2ZzanR4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYzNTY1ODMsImV4cCI6MjA4MTkzMjU4M30.xu48PIJaNJtnJ19zy4O2F-zdNA2uQq3ZMDaF6ciNQXs";

);

/*************************
* ELEMENTI DOM
*************************/
const profilesContainer = document.getElementById("profiles");
const form = document.getElementById("joinForm");
const nameInput = document.getElementById("nameInput");
const linkInput = document.getElementById("linkInput");
const photoInput = document.getElementById("photoInput");
const counter = document.getElementById("counter");
const spotlight = document.getElementById("spotlightCard");

let profiles = [];
let spotlightIndex = 0;

/*************************
* LOAD PROFILES
*************************/
async function loadProfiles() {
const { data, error } = await supabase
.from("profiles")
.select("*")
.order("created_at", { ascending: false });

if (error) {
console.error(error);
return;
}

profiles = data;
profilesContainer.innerHTML = "";

profiles.forEach(p => {
const card = document.createElement("div");
card.className = "card";
card.innerHTML = `
<img src="${p.photo_url}" alt="${p.name}">
<h4>${p.name}</h4>
<span>${p.link}</span>
`;
profilesContainer.appendChild(card);
});

counter.textContent = profiles.length.toLocaleString("it-IT");
updateSpotlight();
}

/*************************
* SPOTLIGHT
*************************/
function updateSpotlight() {
if (profiles.length === 0) return;

const p = profiles[spotlightIndex % profiles.length];
spotlight.innerHTML = `
<img src="${p.photo_url}" alt="${p.name}">
<h4>${p.name}</h4>
<span>${p.link}</span>
`;
spotlightIndex++;
}

setInterval(updateSpotlight, 5000);

/*************************
* FORM SUBMIT
*************************/
form.addEventListener("submit", async e => {
e.preventDefault();

const name = nameInput.value.trim();
const link = linkInput.value.trim();
const file = photoInput.files[0];

if (!name || !link || !file) return;

const reader = new FileReader();
reader.onload = async () => {
const { error } = await supabase.from("profiles").insert([
{
name,
link,
photo_url: reader.result
}
]);

if (error) {
console.error(error);
return;
}

form.reset();
loadProfiles();
};

reader.readAsDataURL(file);
});

/*************************
* INIT
*************************/
loadProfiles();
