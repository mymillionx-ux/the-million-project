const SUPABASE_URL = "tyipwaiefbocipkfsjtx";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR5aXB3YWllZmJvY2lwa2ZzanR4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYzNTY1ODMsImV4cCI6MjA4MTkzMjU4M30.xu48PIJaNJtnJ19zy4O2F-zdNA2uQq3ZMDaF6ciNQXs";

const supabase = window.supabase.createClient(
SUPABASE_URL,
SUPABASE_ANON_KEY
);
const photoInput = document.getElementById("photoInput");
const profiles = [
{
name: "Marco",
role: "Travel & Adventure",
img: "https://picsum.photos/400/400?random=1"
},
{
name: "Sara",
role: "Art & Design",
img: "https://picsum.photos/400/400?random=2"
},
{
name: "Alex",
role: "Music Producer",
img: "https://picsum.photos/400/400?random=3"
},
{
name: "Giulia",
role: "Fitness Coach",
img: "https://picsum.photos/400/400?random=4"
},
{
name: "Luca",
role: "Developer",
img: "https://picsum.photos/400/400?random=5"
},
{
name: "Martina",
role: "Illustrator",
img: "https://picsum.photos/400/400?random=6"
}
];
let profiles = [];
const profilesContainer = document.getElementById("profiles");

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

updateCounter();
updateSpotlight();
}

name: "Marco",
role: "Travel & Adventure",
img: "https://picsum.photos/400/400?random=1"
},
{
name: "Sara",
role: "Art & Design",
img: "https://picsum.photos/400/400?random=2"
},
{
name: "Alex",
role: "Music Producer",
img: "https://picsum.photos/400/400?random=3"
}
];
function saveProfiles() {
localStorage.setItem("profiles", JSON.stringify(profiles));
}
const updateCounter = () => {
current += speed;
if (current >= target) {
counter.textContent = target.toLocaleString("it-IT");
} else {
counter.textContent = current.toLocaleString("it-IT");
requestAnimationFrame(updateCounter);
}
};

updateCounter();
form.addEventListener("submit", (e) => {
e.preventDefault();

const name = nameInput.value.trim();
const link = linkInput.value.trim();
const file = photoInput.files[0];

if (!name || !link || !file) return;

const reader = new FileReader();

reader.onload = () => {
const newProfile = {
name: name,
role: link.replace("https://", "").replace("http://", ""),
img: reader.result
};

profiles.push(newProfile);
saveProfiles();

const card = document.createElement("div");
card.className = "card";

card.innerHTML = `
<img src="${newProfile.img}" alt="${newProfile.name}">
<h4>${newProfile.name}</h4>
<span>${newProfile.role}</span>
`;

profilesContainer.appendChild(card);

// aggiorna contatore
counter.textContent = profiles.length.toLocaleString("it-IT");

form.reset();
};

reader.readAsDataURL(file);
});
const spotlight = document.getElementById("spotlightCard");
let spotlightIndex = 0;

function updateSpotlight() {
if (profiles.length === 0) return;

const p = profiles[spotlightIndex % profiles.length];

spotlight.innerHTML = `
<img src="${p.img}" alt="${p.name}">
<h4>${p.name}</h4>
<span>${p.role}</span>
`;

spotlightIndex++;
}

updateSpotlight();
setInterval(updateSpotlight, 5000);
saveProfiles();

loadProfiles();


