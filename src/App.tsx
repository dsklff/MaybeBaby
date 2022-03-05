import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import routes from "./common/routes";
import MyResultsContainer from "./containers/MyResultsContainer";
import LoginContainer from "./containers/LoginContainer";
import RegisterContainer from "./containers/RegisterContainer";
import ProfileContainer from "./containers/ProfileContainer";

const appRoutes = routes.map((i: any, index: number) => (
  <Route
    path={i.path}
    key={`route${index}`}
    element={`<${i.element.displayName} />`}
  />
));

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MyResultsContainer />}></Route>
          <Route path="/login" element={<LoginContainer />}></Route>
          <Route path="/signup" element={<RegisterContainer />}></Route>
          <Route path="/profile" element={<ProfileContainer />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
