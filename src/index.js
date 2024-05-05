import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { PostsProvider } from "./context/PostContext";

// Create a root element for rendering
const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

// Render the app within the root element
root.render(
  // Wrap the entire app with React.StrictMode for additional checks and warnings
  <React.StrictMode>
    {/* Use BrowserRouter for client-side routing */}
      {/* Provide authentication context to the app */}
      <AuthProvider>
        {/* Provide posts context to the app */}
        <PostsProvider>
          {/* Render the main App component */}
          <App />
        </PostsProvider>
      </AuthProvider>
  </React.StrictMode>
);
