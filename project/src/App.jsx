import React from "react";
import NavBar from "./components/NavBar";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import BlogDetail from "./components/BlogDetail";
import BlogCreate from "./components/BlogCreate";
import Account from "./components/Account";
import Saved from "./components/Saved";
import Created from "./components/Created";
import Edit from "./components/Edit";
import Search from "./components/Search";
import Another from "./components/Another";
import AnotherSaved from "./components/AnotherSaved";
import AnotherCreated from "./components/AnotherCreated";
import "./App.css";
export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route path="/" element={<Home />} />
          <Route path="blogcreator" element={<BlogCreate />} />
          <Route path="blogDetail" element={<BlogDetail />} />
          <Route path="yourAccount" element={<Account />}>
            <Route path="saved" element={<Saved />} />
            <Route path="created" element={<Created />} />
          </Route>
          <Route path="edit" element={<Edit />} />
          <Route path="search" element={<Search />} />
          <Route path="another" element={<Another />}>
            <Route path="saved" element={<AnotherSaved />} />
            <Route path="created" element={<AnotherCreated />} />
            <Route />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}
