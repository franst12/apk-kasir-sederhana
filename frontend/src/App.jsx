import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import PanelUp from "./components/PanelUp";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <PanelUp />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
