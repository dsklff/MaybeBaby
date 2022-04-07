import * as React from "react";
import CircularProgress, {
  CircularProgressProps,
} from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import "../styles/PercentProgress.css";
import { useNavigate } from "react-router-dom";

const styleForCirlce = {
  width: "260px",
  height: "260px",
  transform: "rotate(-90deg)",
};

function CircularProgressWithLabel(
  props: CircularProgressProps & { value: number }
) {
  return (
    <div className="background-result">
      <div className="app-container progress">
        <h2 className="progress__title">Спасибо за пройденный опрос!</h2>
        <h3 className="progress__subtitle">Результаты обрабатываются</h3>
        <Box
          sx={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "260px",
          }}
        >
          <CircularProgress
            variant="determinate"
            {...props}
            sx={{
              color: " #6767AB",
            }}
            style={styleForCirlce}
          />
          <Box
            sx={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              position: "absolute",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="caption"
              component="div"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "260px",
                height: "100%",
                fontWeight: "bold",
                fontSize: "48px",
                lineHeight: "56px",
                textAlign: "center",
                color: "#6767AB",
              }}
            >{`${Math.round(props.value)}%`}</Typography>
          </Box>
        </Box>
      </div>
    </div>
  );
}

export default function CircularStatic() {
  const [progress, setProgress] = React.useState(1);
  let navigate = useNavigate();

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 0 : prevProgress + 1
      );
    }, 100);
    console.log("asdasd");

    setTimeout(() => {
      navigate("/myresultdetails", { replace: true });
    }, 10000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return <CircularProgressWithLabel value={progress} />;
}

/**/
