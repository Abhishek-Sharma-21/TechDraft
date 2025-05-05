# TechDraft

TechDraft is a web application that generates detailed technical specifications and development plans based on user-provided feature ideas and development scopes. The project leverages AI-powered backend services to assist developers and architects in planning software projects efficiently.

[Live Frontend Application](https://tech-draft-frontend.vercel.app/)

## Features

- **Feature Idea Input:** Users can enter feature ideas and define the development scope through a user-friendly interface.
- **AI-Powered Specification Generation:** The backend uses Google Gemini generative AI to produce structured technical specifications, user stories, tasks, and tech stack recommendations.
- **Clear and Structured Output:** The generated technical details are presented in an organized and easy-to-understand format.
- **Frontend-Backend Integration:** Seamless communication between the React frontend and Express backend API.
- **Deployed Frontend:** The frontend is deployed and accessible online.

## Technologies Used

### Frontend

- React 19
- Vite
- Tailwind CSS
- Radix UI components
- React Router DOM
- React Hot Toast

### Backend

- Node.js
- Express.js
- Google Generative AI API (Gemini)
- dotenv
- CORS
- body-parser
- nodemon (for development)

## Project Structure

```
TechDraft/
├── backend/
│   ├── package.json
│   ├── package-lock.json
│   ├── server.js
│   ├── vercel.json
│   └── .env (not committed)
├── client/
│   ├── package.json
│   ├── package-lock.json
│   ├── README.md
│   ├── vite.config.js
│   ├── public/
│   └── src/
│       ├── App.jsx
│       ├── main.jsx
│       ├── components/
│       └── assets/
├── .gitignore
└── README.md
```

## Deployment

The frontend client is deployed and accessible at:  
[https://tech-draft-frontend.vercel.app/](https://tech-draft-frontend.vercel.app/)

## Setup and Running Locally

### Backend

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with the following variables:
   ```
   GEMNI_API_KEY=your_google_gemini_api_key
   FRONTEND_URL=http://localhost:5173
   ```
4. Start the backend server:
   ```bash
   npm run dev
   ```
5. The backend server runs on [http://localhost:3000](http://localhost:3000).

### Frontend

1. Navigate to the `client` directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend development server:
   ```bash
   npm run dev
   ```
4. The frontend will be available at [http://localhost:5173](http://localhost:5173).

## Important Considerations

- **Environment Variables:** Ensure the backend `.env` file contains valid API keys and frontend URL.
- **AI Model Usage:** The backend relies on Google Gemini generative AI; usage may incur costs and require proper API key management.
- **Not Medical or Legal Advice:** The generated specifications are suggestions and should be reviewed by qualified professionals.
- **Data Privacy:** User inputs are sent to the backend and processed by AI; handle sensitive data accordingly.

---

This README provides an overview and instructions to get started with the TechDraft project.
