import React from "react";
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
import MainProfile from "./containers/MainProfile";
import MyResultDetailsContainer from "./containers/MyResultsDetailContainer";

import ResultContainer from "./containers/ResultContainer";
import CircularProgressWithLabel from "./components/PercentProgress";
import LabelBottomNavigation from "./containers/ButtonNavigate";
import Policy from "./containers/PolicyContainer";
import SplashScreenContainer from "./containers/SplashScreenContainer";
import ChangePasswordContainer from "./containers/ChangePasswordContainer";
import CircularStatic from "./components/PercentProgress";

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
          <Route path="/" element={<SplashScreenContainer />}></Route>
          <Route path="/login" element={<LoginContainer />}></Route>
          <Route path="/signup" element={<RegisterContainer />}></Route>
          <Route path="/profile" element={<ProfileContainer />}></Route>
          <Route path="/editprofile" element={<EditProfile />}></Route>
          <Route path="/policy" element={<Policy></Policy>}></Route>
          <Route path="/myresults" element={<MyResultsContainer />}></Route>
          <Route
            path="/myresultdetails"
            element={<MyResultDetailsContainer />}
          ></Route>
          <Route path="/starttest" element={<StartTestContainer />}></Route>
          <Route path="/test" element={<TestContainer />}></Route>
          <Route
            path="/forgotpassword"
            element={<ForgotPasswordContainer />}
          ></Route>
          <Route path="/guide" element={<CustomizedAccordions />}></Route>
          <Route path="/onboarding" element={<Onboarding />}></Route>
          <Route path="/result" element={<ResultContainer />}></Route>
          <Route path="/percentprogress" element={<CircularStatic />}></Route>
          <Route
            path="/progress"
            element={<CircularProgressWithLabel></CircularProgressWithLabel>}
          ></Route>
          <Route
            path="/mainprofile"
            element={<MainProfile></MainProfile>}
          ></Route>
          <Route path="/board" element={<Onboarding />}></Route>
          <Route
            path="/splashscreen"
            element={<SplashScreenContainer />}
          ></Route>
          <Route
            path="/changepassword"
            element={<ChangePasswordContainer />}
          ></Route>
        </Routes>
        <LabelBottomNavigation />
      </BrowserRouter>
    </>
  );
}

export default App;
