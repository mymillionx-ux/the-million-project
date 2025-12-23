/***********************
* SUPABASE CONFIG
***********************/
const SUPABASE_URL = "https://tyipwaiefbocipkfsjtx.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR5aXB3YWllZmJvY2lwa2ZzanR4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYzNTY1ODMsImV4cCI6MjA4MTkzMjU4M30.xu48PIJaNJtnJ19zy4O2F-zdNA2uQq3ZMDaF6ciNQXs";

const supabase = window.supabase.createClient(
SUPABASE_URL,
SUPABASE_ANON_KEY
);

/***********************
* ELEMENTI DOM
***********************/
const profilesContainer = document.getElementById("profiles");
const form = document.getElementById("joinForm");
const nameInput = document.getElementById("nameInput");
const linkInput = document.getElementById("linkInput");
const photoInput = document.getElementById("photoInput");
const counter = document.getElementById("counter");

let profiles = [];

/***********************
* TEST
***********************/
console.log("Supabase pronto:", supabase);
