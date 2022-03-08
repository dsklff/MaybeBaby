import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import routes from "./common/routes";
import MyResultsContainer from "./containers/MyResultsContainer";
import LoginContainer from "./containers/LoginContainer";
import RegisterContainer from "./containers/RegisterContainer";
import ProfileContainer from "./containers/ProfileContainer";
import EditProfile from "./containers/EditProfileContainer";
import ForgotPasswordContainer from "./containers/ForgotPasswordContainer";
import StartTestContainer from "./containers/StartTestContainer";
import TestContainer from "./containers/TestContainer";
import CustomizedAccordions from "./containers/AccordeonContainer";
import Onboarding from "./containers/Onboard";

import ResultContainer from "./containers/ResultContainer";

const appRoutes = routes.map((i: any, index: number) => (
  <Route
    path={i.path}
    key={`route${index}`}
    element={`<${i.element.displayName} />`}
  />
));

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/myresults" element={<MyResultsContainer />}></Route>
          <Route path="/login" element={<LoginContainer />}></Route>
          <Route path="/signup" element={<RegisterContainer />}></Route>
          <Route path="/profile" element={<ProfileContainer />}></Route>
          <Route path="/editprofile" element={<EditProfile />}></Route>
          <Route path="/starttest" element={<StartTestContainer />}></Route>
          <Route path="/test" element={<TestContainer />}></Route>
          <Route
            path="/forgotpassword"
            element={<ForgotPasswordContainer />}
          ></Route>
          <Route path="/guide" element={<CustomizedAccordions />}></Route>
          <Route path="/onboarding" element={<Onboarding />}></Route>
          <Route path="/result" element={<ResultContainer />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
