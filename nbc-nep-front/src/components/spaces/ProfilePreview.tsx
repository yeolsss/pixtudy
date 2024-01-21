import { useAppSelector } from "@/hooks/useReduxTK";
import { Dispatch, SetStateAction } from "react";
import { StAvatar } from "./AvatarInput";
import { FORM_CHARACTER, srcBase } from "./constants/constants";
import { Procedure } from "./types/space.types";

interface Props {
  setProcedure: Dispatch<SetStateAction<Procedure>>;
}

export default function ProfilePreview({ setProcedure }: Props) {
  const { display_name: defaultName } = useAppSelector(
    (state) => state.authSlice.user
  );
  const { avatar, display_name } = useAppSelector(
    (state) => state.spaceSlice.userProfile
  );
  const getAvatarResource = () => {
    return srcBase + (avatar ? avatar : "NPC1") + ".png";
  };

  const handleToProfileForm = () => {
    setProcedure(FORM_CHARACTER);
  };

  return (
    <div>
      <span>{display_name === "" ? defaultName : display_name}</span>
      <StAvatar resource={getAvatarResource()} />
      <button onClick={handleToProfileForm}>아바타 꾸미기</button>
    </div>
  );
}
