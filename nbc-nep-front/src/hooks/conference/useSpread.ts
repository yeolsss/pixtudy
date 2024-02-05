import { useEffect, useRef, useState } from "react";

export default function useSpread() {
  const [isSpreadMode, setSpreadMode] = useState<boolean>(false);
  const toggleBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: Event) => {
      if (
        toggleBoxRef.current &&
        e.target instanceof Node &&
        toggleBoxRef.current.contains(e.target)
      )
        return;

      if (isSpreadMode) setSpreadMode(false);
      e.stopPropagation();
    };

    window.addEventListener("mousedown", handleOutsideClick);

    return () => {
      window.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isSpreadMode]);

  const handleToggleOnSpreadMode = () => {
    setSpreadMode(true);
  };

  return {
    isSpreadMode,
    toggleBoxRef,
    handleToggleOnSpreadMode,
  };
}
