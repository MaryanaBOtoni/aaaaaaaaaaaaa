import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"; // Importando Navigate
import { UserProvider } from "./UserContext";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Weather from './pages/Weather';
import 'leaflet/dist/leaflet.css';

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Routes>
          {/* Redireciona o path "/" para a página de login */}
          <Route path="/" element={<Navigate to="/login" />} />
          {/* Definindo a rota de Login */}
          <Route path="/login" element={<Login />} />
          {/* Rota para Home */}
          <Route path="/home" element={<Home />} />
          {/* Rota para Weather */}
          <Route path="/weather" element={<Weather />} />
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;