import { useEffect, useState } from "react";
import PhaserSceneManager from "@/metaverse/scenes/PhaserSceneManager";

type PhaserInputHook = {
  enableInput: () => void;
  disableInput: () => void;
};
export default function usePhaserInput(): PhaserInputHook {
  const [inputEnabled, setInputEnabled] = useState<boolean>(true);

  const enableInput = () => setInputEnabled(true);
  const disableInput = () => setInputEnabled(false);

  useEffect(() => {
    if (inputEnabled) PhaserSceneManager.enableInput();
    else PhaserSceneManager.disableInput();
  }, [inputEnabled]);

  return { enableInput, disableInput };
}
