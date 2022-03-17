import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";
import SplashImg from "../static/img/logo.png";
import "../styles/SplashScreen.css";

const SplashScreenContainer = () => {
  let navigate = useNavigate();

  useEffect(() => {
    setTimeout(async () => {
      const result = await authService.checkAuth();

      if (result) {
        navigate("/starttest", { replace: true });
      } else {
        navigate("/onboarding", { replace: true });
      }
    }, 3000);
  }, []);

  return (
    <div className="background-onboarding">
      <div className="app-container splash">
        <img src={SplashImg} alt="SplashScreen" className="splash__img" />
      </div>
    </div>
  );
};

export default SplashScreenContainer;
