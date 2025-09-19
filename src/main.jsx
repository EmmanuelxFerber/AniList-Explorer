import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import App from "./assets/Components/MainPage/App";
import Dashboard from "./assets/Components/Dashboard/Dashboard";
import FavPage from "./assets/Components/FavPage/FavPage";
import LoginPage from "./assets/Components/LoginPage/LoginPage";
import SearchList from "./assets/Components/SearchList/SearchList";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/favpage" element={<FavPage />} />
      <Route path="/loginpage" element={<LoginPage />} />
      <Route path="/searchlist" element={<SearchList />} />
    </Routes>
  </BrowserRouter>
);
