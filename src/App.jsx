import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import LoginRegisterPage from "./pages/LoginRegisterPage";
import Home from "./pages/Home";
import Header from "./components/Header";
import Document from "./pages/Document";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginRegisterPage />} />
        <Route path="/document" element={<Document />} /> 
      </Routes>
    </Router>
  );
};

export default App;
