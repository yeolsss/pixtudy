import useAuthStore from "@/zustand/authStore";
import useSpace from "@/zustand/spaceStore";
import { Dispatch, SetStateAction, useEffect } from "react";
import styled from "styled-components";
import { StAvatar } from "./AvatarInput";
import { FORM_CHARACTER, SRC_BASE } from "./constants/constants";
import { Procedure } from "./types/space.types";

interface Props {
  setProcedure: Dispatch<SetStateAction<Procedure>>;
}

export default function ProfilePreview({ setProcedure }: Props) {
  const user = useAuthStore.use.user();
  const {
    userProfile: { avatar, display_name },
    setUserProfile,
  } = useSpace();

  const getAvatarResource = () => {
    return SRC_BASE + avatar + ".png";
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
      <span>{display_name === "" ? user.display_name : display_name}</span>
      <StAvatar resource={getAvatarResource()} />
      <button onClick={handleToProfileForm}>아바타 꾸미기</button>
    </StProfilePreview>
  );
}

const StProfilePreview = styled.div`
  background-color: ${(props) => props.theme.color.bg.secondary};
  border-radius: ${(props) => props.theme.border.radius[12]};
  padding: ${(props) => props.theme.spacing[12]};
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing[4]};
  align-items: center;
  width: 100%;
`;
