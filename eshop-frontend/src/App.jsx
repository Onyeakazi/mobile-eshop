import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import ProductsList from "./pages/ProductsList";
import AddProduct from "./pages/AddProduct";
import "./App.css";
import Chat from "./pages/Chat";

function Navbar() {
  const location = useLocation();

  const linkStyle = (path) =>
    `px-4 py-2 rounded-lg transition ${
      location.pathname === path
        ? "bg-black text-white"
        : "text-gray-700 hover:bg-gray-200"
    }`;

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-gray-800">E-Shop Admin</h1>

      <div className="flex gap-3">
        <Link to="/" className={linkStyle("/")}>
          Products
        </Link>
        <Link to="/add" className={linkStyle("/add")}>
          Add Product
        </Link>
        <Link to="/chat" className={linkStyle("/chat")}>
          Chat
        </Link>
      </div>
    </nav>
  );
}

function AppLayout() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="p-6">
        <Routes>
          <Route path="/" element={<ProductsList />} />
          <Route
            path="/add"
            element={<AddProduct onAdded={() => (window.location = "/")} />}
          />
          <Route path="/edit/:id" element={<AddProduct />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;