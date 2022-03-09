import * as React from "react";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

export default function LinearDeterminate() {
  const [progress, setProgress] = React.useState(8.333);

  return (
    <Box sx={{ width: "100%", marginBottom: "24px" }}>
      <div className="progress-bar">
        <span className="progress-bar__number">1 </span>
        <span className="progress-bar__number progress-bar__number--opacity ">
          {" "}
          /12
        </span>
      </div>
      <LinearProgress variant="determinate" value={progress} />
    </Box>
  );
}
