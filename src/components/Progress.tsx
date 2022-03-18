import * as React from "react";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { useEffect } from "react";

interface Props {
  currentQuestion: number;
  questionCount: number;
}

export default function LinearDeterminate(props: Props) {
  const [progress, setProgress] = React.useState(0);

  const changeProgress = () => {
    const progress = (props.currentQuestion / props.questionCount) * 100;
    setProgress(progress);
  };

  useEffect(() => {
    changeProgress();
  }, [props.currentQuestion]);

  return (
    <Box sx={{ width: "100%", marginBottom: "24px" }}>
      <div className="progress-bar">
        <span className="progress-bar__number">{props.currentQuestion}</span>
        <span className="progress-bar__number progress-bar__number--opacity ">
          {" "}
          /{props.questionCount}
        </span>
      </div>
      <LinearProgress variant="determinate" value={progress} />
    </Box>
  );
}
