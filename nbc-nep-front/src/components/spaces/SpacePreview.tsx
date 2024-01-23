import { useGetOtherUserInfo } from "@/hooks/query/useSupabase";
import { useAppSelector } from "@/hooks/useReduxTK";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { FORM_CHARACTER } from "./constants/constants";
import { Procedure } from "./types/space.types";

interface Props {
  setProcedure: Dispatch<SetStateAction<Procedure>>;
}
/**
 * useGetOtherUserInfo, useGetUserSpaces,
 *
 * @param param0
 * @returns
 */
export default function SpacePreview({ setProcedure }: Props) {
  const joinSpaceInfo = useAppSelector(
    (state) => state.spaceSlice.joinSpaceInfo
  );
  const ownerInfo = useGetOtherUserInfo(joinSpaceInfo?.owner);
  const handleToNextProcedure = () => {
    setProcedure(FORM_CHARACTER);
  };

  return (
    <StSpacePreview>
      <h2>스페이스 미리보기</h2>
      {joinSpaceInfo && joinSpaceInfo.id ? (
        <StSpacePreviewContainer>
          <div>
            <Image src="/assets/card.png" alt="card" width={180} height={135} />
            <StPreviewContents>
              <h2>{joinSpaceInfo.title}</h2>
              <h3>{ownerInfo?.display_name}의 스페이스</h3>
              <p>{joinSpaceInfo.description}</p>
            </StPreviewContents>
          </div>
        </StSpacePreviewContainer>
      ) : (
        <StPreviewDisabled>
          초대코드를 입력해서 스페이스의 정보를 확인해보세요!
        </StPreviewDisabled>
      )}
    </StSpacePreview>
  );
}

const StSpacePreview = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: ${(props) => props.theme.spacing[16]};
  h2 {
    font-family: var(--sub-font);
    font-size: ${(props) => props.theme.body.md.medium.fontSize};
  }
`;

const StSpacePreviewContainer = styled.div`
  gap: ${(props) => props.theme.spacing[16]};
  margin-top: ${(props) => props.theme.spacing[6]};
  background-color: ${(props) => props.theme.color.bg.secondary};
  border-radius: ${(props) => props.theme.border.radius[12]};
  padding: ${(props) => props.theme.spacing[12]};
  & > div {
    display: flex;
    gap: ${(props) => props.theme.spacing[12]};
  }
`;

const StPreviewContents = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  h2 {
    font-family: var(--point-font);
    font-weight: ${(props) => props.theme.heading.desktop.md.fontWeight};
    font-size: ${(props) => props.theme.body.md.medium.fontSize};
    margin-bottom: ${(props) => props.theme.spacing[8]};
  }
  h2::after {
    content: "";
    display: block;
    width: 100%;
    height: 1px;
    background-color: ${(props) => props.theme.color.border.primary};
    margin-bottom: ${(props) => props.theme.spacing[8]};
    margin-top: ${(props) => props.theme.spacing[8]};
  }
  h3 {
    font-family: var(--sub-font);
    font-size: ${(props) => props.theme.body.sm.medium.fontSize};
    margin-bottom: ${(props) => props.theme.spacing[8]};
  }
  p {
    font-family: var(--main-font);
    font-size: ${(props) => props.theme.body.sm.regular.fontSize};
  }
`;

const StPreviewDisabled = styled.div`
  background-color: ${(props) => props.theme.color.bg.secondary};
  height: ${(props) => props.theme.unit[128]}px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: ${(props) => props.theme.spacing[8]};
  border-radius: ${(props) => props.theme.border.radius[16]};
`;