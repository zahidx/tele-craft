// pages/api/generate-story.js

export default async function handler(req, res) {
    if (req.method === "POST") {
      const { genre, theme, keywords } = req.body;
  
      // Validate input to ensure required fields are present
      if (!genre || !theme || !keywords) {
        return res.status(400).json({ error: "Please provide genre, theme, and keywords." });
      }
  
      const apiKey = process.env.DEEPSEEK_API_KEY; // Get API key from environment variable
      if (!apiKey) {
        return res.status(500).json({ error: "API key is missing. Please check your environment variables." });
      }
  
      const url = "https://api.deepseek.ai/v1/chat";  // Adjust this URL based on DeepSeek's documentation
  
      const prompt = `Create a story in the ${genre} genre with the theme of ${theme}. Include the following keywords: ${keywords}. The story should be engaging and follow a creative narrative structure.`;
  
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            message: prompt, // Your structured prompt for generating the story
            model: "deepseek-chatbot-model", // Adjust the model based on DeepSeek's API
          }),
        });
  
        // Check for response status
        if (!response.ok) {
          const errorData = await response.json();
          return res.status(response.status).json({ error: errorData.message || "Failed to generate story." });
        }
  
        const data = await response.json();
        if (data?.message) {
          return res.status(200).json({ story: data.message });
        } else {
          return res.status(500).json({ error: "No story generated. Please try again." });
        }
      } catch (error) {
        console.error("Error during API call:", error);
        return res.status(500).json({ error: "Failed to generate story. Please try again later." });
      }
    } else {
      return res.status(405).json({ error: "Method Not Allowed" });
    }
  }
  