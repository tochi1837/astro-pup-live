export default function handler(req: any, res: any) {
if (req.method !== "POST") {
return res.status(405).json({ error: "Method not allowed" });
}

const { message } = req.body || {};

return res.status(200).json({
reply: `Woof! Hi TechTotter! You said: ${message || ""}`
});
}
