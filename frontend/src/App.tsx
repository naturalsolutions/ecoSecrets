import "./App.css";
import Main from "./pages/main";
import Second from "./pages/second";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/projects" element={<Second />}></Route>
        <Route path="/devices" element={<Second />}></Route>
        <Route path="/sites" element={<Second />}></Route>
        <Route path="/import" element={<Second />}></Route>
        <Route path="*" element={<Main />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
