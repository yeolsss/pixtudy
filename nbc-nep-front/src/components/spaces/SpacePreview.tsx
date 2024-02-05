import { useGetOtherUserInfo } from "@/hooks/query/useSupabase";
import useSpaceStore from "@/zustand/spaceStore";
import Image from "next/image";
import {
  StPreviewContents,
  StPreviewDisabled,
  StSpacePreview,
  StSpacePreviewContainer,
} from "./styles/spacePreview.style";

/**
 * useGetOtherUserInfo, useGetUserSpaces,
 */
export default function SpacePreview() {
  const joinSpaceInfo = useSpaceStore.use.joinSpaceInfo();
  const ownerInfo = useGetOtherUserInfo(joinSpaceInfo?.owner);

  return (
    <StSpacePreview>
      <h2>스페이스 미리보기</h2>
      {joinSpaceInfo && joinSpaceInfo.id ? (
        <StSpacePreviewContainer>
          <div>
            <Image
              src={joinSpaceInfo.space_thumb || "/assets/card.png"}
              alt="card"
              width={180}
              height={135}
            />
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
