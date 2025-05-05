import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = 3000;

// Initialize the Gemini API client with your API key
const genAI = new GoogleGenerativeAI(process.env.GEMNI_API_KEY);

app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(bodyParser.json());
app.use("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/techDraft", async (req, res) => {
  const { featureIdea, developmentScope } = req.body;
  console.log(featureIdea, developmentScope);

  if (!featureIdea || !developmentScope) {
    return res
      .status(400)
      .json({ error: "Feature idea and development scope are required" });
  }

  try {
    // Use the "gemini-2.0-flash" model as per your original request
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
    });

    // Structured prompt for the Gemini model
    const prompt = `You are an AI Technical Architect. Based on the feature idea: "${featureIdea}" and development scope: "${developmentScope}", provide the following information in JSON format:

    {
      "technicalSpecification": {
        "systemComponents": [
          "List and describe key system components"
        ],
        "apiSpecifications": [
          {
            "endpoint": "/example",
            "method": "GET/POST/etc",
            "description": "What this API does",
            "requestFormat": {},
            "responseFormat": {}
          }
        ],
        "dataFlow": "Describe how data flows through the system",
        "architectureSuggestions": "Provide high-level architecture guidance"
      },
      "userStories": [
        {
          "title": "As a [user], I want to [goal] so that [benefit]",
          "acceptanceCriteria": [
            "Condition or requirement that must be met"
          ]
        }
      ],
      "tasks": [
        {
          "title": "Main task name",
          "subtasks": [
            "Subtask 1",
            "Subtask 2"
          ]
        }
      ],
      "techStackRecommendations": {
        "frontend": "Suggested frontend tech and reason",
        "backend": "Suggested backend tech and reason",
        "database": "Suggested DB tech and reason",
        "justification": "Why this stack is ideal"
      },
      "codeSkeleton": {
        "generateBoilerplate": true,
        "description": "Produce boilerplate code structure based on the selected tech stack and architecture.",
        "techStack": ["React", "Node.js", "Express", "MongoDB"],
        "architecture": "MERN stack with REST API",
        "frontendStructure": "Provide a detailed outline of the frontend folder/file structure including common folders like components, pages, and assets.",
        "backendStructure": "Provide a detailed outline of the backend folder/file structure including folders for routes, controllers, models, and config.",
        "sampleFiles": {
          "index.js": "Basic server setup using Express.",
          "App.jsx": "Basic React app component with routing setup (if applicable)."
        }
      }
    }
    
    Respond only with the JSON output.`;

    // Call the AI to generate content
    const result = await model.generateContent(prompt);
    const response = await result.response;

    // If response.text() is a promise, ensure you await it
    let text = await response.text();

    // Remove the ```json and ``` if present
    text = text.replace(/```json/g, "");
    text = text.replace(/```/g, "");
    text = text.trim(); // Trim any leading/trailing whitespace

    try {
      // Attempt to parse the response as JSON
      const parsedResult = JSON.parse(text);
      res.json({ result: parsedResult });
    } catch (parseError) {
      console.error("Error parsing AI response as JSON:", parseError);
      console.error("Raw AI Response:", text); // Log the raw response for debugging
      res.status(500).json({ error: "Failed to parse AI response into JSON." });
    }
  } catch (err) {
    console.error("Error:", err.message);
    res
      .status(500)
      .json({ error: "An error occurred while generating the specification." });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
