import { GoogleGenerativeAI } from '@google/generative-ai';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { query, state } = req.body;
    
    // Securely access the API key from Vercel's server environment, hiding it from the frontend client
    const apiKey = process.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      return res.status(200).json({ 
        reply: "I received your request securely on the backend! (Note: Add VITE_GEMINI_API_KEY to the server environment to generate real AI responses.)",
        actions: []
      });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    // Inject the frontend state as context for the LLM
    const prompt = `
You are DayMeet Copilot, an AI assistant for a productivity app. 
Keep responses concise, friendly, and under 3 sentences. 
User says: ${query}
System Context: The user currently has an active task count of ${state?.tasksCount || 0}.
    `;
    
    const result = await model.generateContent(prompt);
    
    return res.status(200).json({ 
      reply: result.response.text(),
      actions: [] 
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to process AI request on the secure backend' });
  }
}
