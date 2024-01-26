import { useState } from "react";
import { CallBackProps, STATUS } from "react-joyride";

export default function useTourTooltip<T>(stepArray: T[]) {
  const [run, setRun] = useState<boolean>(false);
  const [steps, setSteps] = useState<T[]>(stepArray);

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status } = data;

    if (status === STATUS.FINISHED || status === STATUS.SKIPPED) setRun(false);
  };

  const setRunState = (isRun: boolean) => {
    setRun(isRun);
  };
  return { run, setRunState, steps, handleJoyrideCallback };
}
