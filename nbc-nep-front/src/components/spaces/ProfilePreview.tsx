import { useAppSelector } from "@/hooks/useReduxTK";
import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
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
    <StProfilePreview>
      <span>{display_name === "" ? defaultName : display_name}</span>
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
  align-items: center;
  width: 100%;
`;
