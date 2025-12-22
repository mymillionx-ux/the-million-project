/* =========================
SUPABASE CONFIG
========================= */
const SUPABASE_URL = 
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://tyipwaiefbocipkfsjtx.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey);
const SUPABASE_ANON_KEY = "sb_publishable_KQtIr0Y2vd2NCuhV2EwGFg_askN6s6r";

const supabase = window.supabase.createClient(
SUPABASE_URL,
SUPABASE_ANON_KEY
);

/* =========================
ELEMENTI DOM
========================= */
const profilesContainer = document.getElementById("profiles");
const form = document.getElementById("joinForm");
const nameInput = document.getElementById("nameInput");
const linkInput = document.getElementById("linkInput");
const photoInput = document.getElementById("photoInput");
const counter = document.getElementById("counter");

/* =========================
LOAD PROFILES
========================= */
async function loadProfiles() {
const { data, error } = await supabase
.from("profiles")
.select("*")
.order("created_at", { ascending: false });

if (error) {
console.error(error);
return;
}

profilesContainer.innerHTML = "";

data.forEach(p => {
const card = document.createElement("div");
card.className = "card";

card.innerHTML = `
<img src="${p.photo_url}" alt="${p.name}">
<h4>${p.name}</h4>
<span>${p.link}</span>
`;

profilesContainer.appendChild(card);
});

counter.textContent = data.length.toLocaleString("it-IT");
}

/* =========================
FORM SUBMIT (SOLO TEST)
Stripe lo colleghiamo dopo
========================= */
form.addEventListener("submit", async (e) => {
e.preventDefault();

const name = nameInput.value.trim();
const link = linkInput.value.trim();
const file = photoInput.files[0];

if (!name || !link || !file) return;

// upload immagine
const fileName = `${Date.now()}-${file.name}`;
const { error: uploadError } = await supabase.storage
.from("photos")
.upload(fileName, file);

if (uploadError) {
console.error(uploadError);
return;
}

const { data: urlData } = supabase.storage
.from("photos")
.getPublicUrl(fileName);

// insert profilo
const { error } = await supabase
.from("profiles")
.insert({
name: name,
link: link,
photo_url: urlData.publicUrl
});

if (error) {
console.error(error);
return;
}

form.reset();
loadProfiles();
});

/* =========================
START
========================= */
loadProfiles();

