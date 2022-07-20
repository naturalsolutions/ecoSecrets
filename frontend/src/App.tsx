import "./App.css";
import Main from "./pages/main";
import Project from "./pages/project";
import Deployment from "./pages/deployment";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainContextProvider from "./contexts/mainContext";

function App() {
  return (    
    <MainContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/project/:projectId" element={<Project />}></Route>
          <Route path="deployment/:deploymentId" element={<Deployment />}></Route>
          <Route path="*" element={<Main />}></Route>
        </Routes>
      </BrowserRouter>
    </MainContextProvider>
  );
}

export default App;
