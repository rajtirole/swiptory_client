import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { PostsProvider } from "./context/PostContext";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <BrowserRouter>
        <AuthProvider>
          <PostsProvider>
          <App />
          </PostsProvider>
        </AuthProvider>
    </BrowserRouter>

  </React.StrictMode>
);
