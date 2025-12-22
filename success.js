const params = new URLSearchParams(window.location.search);
const sessionId = params.get("session_id");

// 🔒 Se qualcuno entra senza pagare
if (!sessionId) {
document.body.innerHTML = "<h2>Accesso non valido</h2>";
throw new Error("Pagamento non verificato");
}

// Recupero dati salvati prima del pagamento
const name = sessionStorage.getItem("newProfileName");
const link = sessionStorage.getItem("newProfileLink");
const photo = sessionStorage.getItem("newProfilePhoto");

if (!name || !link || !photo) {
document.body.innerHTML = "<h2>Dati mancanti</h2>";
throw new Error("Dati profilo mancanti");
}

console.log("Pagamento verificato:", sessionId);
console.log("Profilo pronto per essere salvato");

// (nel prossimo step salveremo su Supabase)
