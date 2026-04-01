alert("script.js loaded");

const sendBtn = document.getElementById("sendBtn");
const userInput = document.getElementById("userInput");
const messages = document.getElementById("messages");
const astroPup = document.getElementById("astroPup");
const statusEl = document.getElementById("status");

function addMessage(label, text) {
const div = document.createElement("div");
div.className = "message";
div.innerHTML = `<strong>${label}</strong>${text}`;
messages.prepend(div);
}

function setSpeaking(isSpeaking) {
if (!astroPup) return;
astroPup.classList.toggle("speaking", isSpeaking);
astroPup.classList.toggle("idle", !isSpeaking);
if (statusEl) {
statusEl.textContent = isSpeaking
? "Astro Pup is talking..."
: "Astro Pup is ready.";
}
}

if (sendBtn) {
sendBtn.addEventListener("click", async () => {
alert("Send button clicked");

const text = userInput.value.trim();
if (!text) {
alert("Type a message first.");
return;
}

addMessage("You", text);
userInput.value = "";
if (statusEl) statusEl.textContent = "Astro Pup is thinking...";

try {
const res = await fetch("/api/session", {
method: "POST",
headers: {
"Content-Type": "application/json"
},
body: JSON.stringify({ message: text })
});

const data = await res.json();

if (!res.ok) {
throw new Error(data.error || "Something went wrong");
}

addMessage("Astro Pup", data.reply || "Woof! Hi TechTotter!");
setSpeaking(true);

setTimeout(() => {
setSpeaking(false);
}, 1200);
} catch (err) {
setSpeaking(false);
if (statusEl) statusEl.textContent = "Astro Pup hit a little space bump.";
addMessage("Error", err.message);
console.error(err);
alert("There was an error: " + err.message);
}
});
}
