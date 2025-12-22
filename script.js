// ==============================
// SUPABASE CONFIG
// ==============================
const SUPABASE_URL = "https://tyjpwaiefbocipkfsjtx.supabase.co";
const SUPABASE_ANON_KEY = "INCOLLA_QUI_LA_TUA_ANON_KEY";

const supabase = window.supabase.createClient(
SUPABASE_URL,
SUPABASE_ANON_KEY
);

// ==============================
// ELEMENTI HTML
// ==============================
const form = document.getElementById("form");
const nameInput = document.getElementById("name");
const linkInput = document.getElementById("link");
const photoInput = document.getElementById("photoInput");

const profilesContainer = document.getElementById("profiles");
const spotlight = document.getElementById("spotlightCard");
const counter = document.getElementById("counter");

// ==============================
// VARIABILI
// ==============================
let profiles = [];
let spotlightIndex = 0;

let current = 0;
let target = 0;
let speed = 20;

// ==============================
// CARICA PROFILI DA SUPABASE
// ==============================
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

target = profiles.length;
updateCounter();
updateSpotlight();
}

// ==============================
// CONTATORE ANIMATO
// ==============================
function updateCounter() {
if (current >= target) {
counter.textContent = target.toLocaleString("it-IT");
return;
}

current += speed;
counter.textContent = current.toLocaleString("it-IT");
requestAnimationFrame(updateCounter);
}

// ==============================
// SPOTLIGHT AUTOMATICO
// ==============================
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

// ==============================
// INVIO FORM
// ==============================
form.addEventListener("submit", async (e) => {
e.preventDefault();

const name = nameInput.value.trim();
const link = linkInput.value.trim();
const file = photoInput.files[0];

if (!name || !link || !file) return;

const reader = new FileReader();

reader.onload = async () => {
const { error } = await supabase
.from("profiles")
.insert([
{
name: name,
link: link.replace("https://", "").replace("http://", ""),
photo_url: reader.result
}
]);

if (error) {
console.error(error);
return;
}

form.reset();
current = 0;
await loadProfiles();
};

reader.readAsDataURL(file);
});

// ==============================
// AVVIO
// ==============================
loadProfiles();
