import { useAppDispatch, useAppSelector } from "@/hooks/useReduxTK";
import { setUserProfile } from "@/redux/modules/spaceSlice";
import { Dispatch, SetStateAction, useEffect } from "react";
import styled from "styled-components";
import { StAvatar } from "./AvatarInput";
import { FORM_CHARACTER, srcBase } from "./constants/constants";
import { Procedure } from "./types/space.types";

interface Props {
  setProcedure: Dispatch<SetStateAction<Procedure>>;
}

export default function ProfilePreview({ setProcedure }: Props) {
  const user = useAppSelector((state) => state.authSlice.user);
  const { avatar, display_name } = useAppSelector(
    (state) => state.spaceSlice.userProfile
  );
  const dispatch = useAppDispatch();
  const getAvatarResource = () => {
    return srcBase + avatar + ".png";
  };

  const handleToProfileForm = () => {
    setProcedure(FORM_CHARACTER);
  };

  useEffect(() => {
    if (user && !avatar) {
      dispatch(
        setUserProfile({
          avatar: "NPC1",
          display_name: user.display_name!,
          owner: user.id,
        })
      );
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
