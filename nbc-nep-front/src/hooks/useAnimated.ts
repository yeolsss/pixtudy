import { useEffect, useState } from "react";

export default function useAnimated(condition: boolean): [boolean, () => void] {
  const [shouldRender, setRender] = useState(condition);

  useEffect(() => {
    if (condition) setRender(true);
  }, [condition]);

  const handleAnimationEnd = () => {
    if (!condition) setRender(false);
  };

  return [shouldRender, handleAnimationEnd];
}
