import useAuthStore from "@/zustand/authStore";
import useSpaceStore from "@/zustand/spaceStore";
import { Dispatch, SetStateAction, useEffect } from "react";
import { Procedure } from "@/types/space.types";
import { FORM_CHARACTER, SRC_BASE } from "./constants/constants";
import { StAvatar } from "./styles/profileForm.styles";
import { StProfilePreview } from "./styles/profilePreview.style";

interface Props {
  setProcedure: Dispatch<SetStateAction<Procedure>>;
}

export default function ProfilePreview({ setProcedure }: Props) {
  const user = useAuthStore.use.user();
  const { avatar, display_name: displayName } = useSpaceStore.use.userProfile();
  const setUserProfile = useSpaceStore.use.setUserProfile();

  const getAvatarResource = () => {
    return `${SRC_BASE + avatar}.png`;
  };

  const handleToProfileForm = () => {
    setProcedure(FORM_CHARACTER);
  };

  useEffect(() => {
    if (user && !avatar) {
      setUserProfile({
        avatar: "NPC1",
        display_name: user.display_name!,
        owner: user.id,
      });
    }
  }, [user]);

  return (
    <StProfilePreview>
      <span>{displayName === "" ? user.display_name : displayName}</span>
      <StAvatar resource={getAvatarResource()} />
      <button type="button" onClick={handleToProfileForm}>
        아바타 꾸미기
      </button>
    </StProfilePreview>
  );
}
