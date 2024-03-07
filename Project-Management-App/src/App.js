import { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import { Filecontext } from "./Filecontext.jsx";
import CreateNewProject from "./pages/CreateNewProject/CreateNewProject.js";
import CurrentProjects from "./pages/CurrentProjects/CurrentProjects.js";
import Login from "./pages/Login/Login.jsx";
import ProjectView from "./pages/ProjectView/ProjectView.jsx";
import Signup from "./pages/Signup/Signup.jsx";

function App() {
  const [userEmail, setUserEmail] = useState("");
  return (
    <div className="App">
      <Filecontext.Provider value={{ userEmail, setUserEmail }}>
        <Router>
          <div>
            <Routes>
              <Route exact path="/" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/project-view" element={<ProjectView />} />
              <Route
                path="/create-new-project"
                element={<CreateNewProject />}
              />
              <Route path="/current-projects" element={<CurrentProjects />} />
            </Routes>
          </div>
        </Router>
      </Filecontext.Provider>
    </div>
  );
}

export default App;
