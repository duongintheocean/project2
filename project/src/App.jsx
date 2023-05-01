import React from "react";
import NavBar from "./components/NavBar";
import { Link, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import BlogDetail from "./components/BlogDetail";
import BlogCreate from "./components/BlogCreate";
export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route path="/" element={<Home />} />
          <Route path="oke" element={<BlogCreate />} />
        </Route>
      </Routes>
    </div>
  );
}
