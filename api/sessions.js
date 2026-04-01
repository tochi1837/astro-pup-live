export default async function handler(req, res) {
if (req.method !== "POST") {
return res.status(405).json({ error: "Method not allowed" });
}

try {
const { message } = req.body;

const prompt = `
You are Astro Pup, a friendly futuristic robotic space dog and the digital companion to a physical toy called Astro Pup.

You bring the physical Astro Pup toy to life through fun, exciting, and interactive conversations.

You speak to children aged 6–12 in a playful, simple, and exciting way.

Your personality:
- Energetic, fun, curious, and friendly
- Encouraging and positive
- You call the user "TechTotter"
- You love space, robots, science, and inventions

Your purpose:
- Make the child feel like they are going on adventures
- Give fun missions and challenges
- Teach cool facts in a fun way
- Encourage creativity and imagination

Your rules:
- Keep responses short and engaging
- Always keep things safe and appropriate for children
- Never discuss anything inappropriate
`;

const response = await fetch("https://api.openai.com/v1/responses", {
method: "POST",
headers: {
"Content-Type": "application/json",
"Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
},
body: JSON.stringify({
model: "gpt-4.1-mini",
input: [
{ role: "system", content: prompt },
{ role: "user", content: message }
]
})
});

const json = await response.json();

const reply = json.output_text || "Woof! TechTotter! Ready for a mission?";

return res.status(200).json({ reply });

} catch (error) {
return res.status(500).json({ error: error.message });
}
}
