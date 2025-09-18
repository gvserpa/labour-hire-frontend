# Labour Hire Frontend

## LIVE MODE
[Labour Hire Frontend - Live](https://labour-hire-frontend.vercel.app/)

## Description
The **Labour Hire Frontend** is the client-side of the full-stack Labour Hire project.  
It provides a **modern, responsive and dynamic user interface** that connects to the backend API hosted on Render.  
Through this platform, users can:

- Sign up and log in (with JWT authentication and bcrypt-secured passwords on backend)
- Manage their profiles and availability for work
- Create, list, and manage tasks
- Interact with tasks by submitting offers and approving/rejecting proposals
- View dynamic rankings of users based on activity
- See users currently online and available for hire
- Navigate through a fully responsive interface accessible on desktop and mobile

The frontend is built with **React (Vite)**, following component-based architecture and modern best practices.

## 🚀 Technologies Used
- **React + Vite** – frontend framework and build tool
- **React Router DOM** – client-side routing
- **Axios** – API communication with backend
- **JWT** – authentication (handled via backend, consumed here)
- **bcrypt** – password hashing (on backend, integrated with frontend authentication flow)
- **Vercel** – frontend hosting
- **Render** – backend hosting

## 📂 Frontend Structure
labour-hire-frontend/
 ├─ public/             # Static assets
 ├─ src/
 │   ├─ components/     # Reusable UI components
 │   ├─ pages/          # Application pages (Login, Signup, Dashboard, Tasks, etc.)
 │   ├─ services/       # API services (Axios instances, authentication, tasks, offers)
 │   ├─ context/        # Context API providers (auth, user state)
 │   ├─ App.jsx         # Root component
 │   └─ main.jsx        # Application entry point
 ├─ .env.example        # Example environment variables
 ├─ package.json        # Project dependencies
 └─ vite.config.js      # Vite configuration

## ⚙️ Features
- **Authentication**
  - Login and Signup with validation
  - Token-based auth (JWT stored and used in requests)
  - bcrypt-secured password flow (backend)
  - Protected routes (only authenticated users can access dashboard and tasks)

- **Task Management (CRUD)**
  - Create, edit, delete, and list tasks
  - View available jobs in real time
  - Users can submit offers for tasks and receive responses

- **User Interaction**
  - Real-time dynamic ranking system based on activity
  - Show available/online users looking for work
  - Offer system with acceptance/rejection flow

- **UI/UX**
  - Fully responsive design (mobile-first)
  - Clean and consistent styling
  - Dashboard layout with navigation sidebar

## 🔑 Environment Variables
Create a `.env` file in the project root with:

VITE_API_URL=https://labour-hire-backend.onrender.com/api

⚠️ **Never commit your `.env` file.** Use `.env.example` as reference for contributors.

## 🖥️ Running the Frontend Locally
Clone the repository:
git clone https://github.com/gvserpa/labour-hire-frontend.git

Install dependencies:
cd labour-hire-frontend
npm install

Run the development server:
npm run dev

By default, it will run at:
http://localhost:5173

## 🔗 Deployment
The frontend is deployed on **Vercel**:  
👉 [Labour Hire Frontend - Live](https://labour-hire-frontend.vercel.app/)

The backend API is deployed on **Render**:  
👉 [Labour Hire Backend](https://labour-hire-backend.onrender.com/api)

## 🔒 Security
- JWT tokens are stored securely in the frontend for authenticated API calls
- Passwords are hashed with **bcrypt** before being stored in the backend database
- Sensitive values are loaded from `.env` (not committed to version control)
- CORS enabled in backend to allow communication with deployed frontend

## ✅ Best Practices
- Separation of concerns (components, pages, services, context)
- Organized project structure for scalability
- `.gitignore` properly configured to exclude:
  - `node_modules/`
  - `.env`
  - `dist/`
  - log files (`npm-debug.log*`)
  - IDE/editor configs (`.vscode/`, `.idea/`)

## 📌 Next Steps
- Add task filtering and search functionality
- Improve user ranking logic with more metrics
- Implement notifications for new offers or accepted proposals
- Integrate Stripe payments (once backend is completed)
- Add unit tests and integration tests for pages and services

## 👨‍💻 Author
**Gustavo Vieira Serpa**

- [GitHub](https://github.com/gvserpa)  
- [LinkedIn](https://www.linkedin.com/in/devgustavoserpa/)
