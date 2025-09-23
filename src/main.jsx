import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import App from "./assets/Components/MainPage/App";
import Dashboard from "./assets/Components/Dashboard/Dashboard";
import FavPage from "./assets/Components/FavPage/FavPage";
import LoginPage from "./assets/Components/LoginPage/LoginPage";
import SearchList from "./assets/Components/SearchList/SearchList";
import Layout from "./assets/Components/Layout";
import { AuthProvider } from "./assets/Context/AuthContext";
import AuthRequired from "./assets/Context/AuthRequired";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<App />} />
          <Route element={<AuthRequired />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="favpage" element={<FavPage />} />
          </Route>
          <Route path="loginpage" element={<LoginPage />} />
          <Route path="searchlist" element={<SearchList />} />
        </Route>
      </Routes>
    </AuthProvider>
  </BrowserRouter>
);
