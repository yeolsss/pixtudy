import SpaceThumb from "@/components/common/SpaceThumb";
import useMetaversePlayer from "@/hooks/metaverse/useMetaversePlayer";
import { StSectionMain } from "../styles/config.styles";
import ConfigSpaceOwner from "./ConfigSpaceOwner";

export default function ConfigSpace() {
  const { isOwner, spaceInfo } = useMetaversePlayer();

  return (
    <>
      {!isOwner ? (
        <StSectionMain>
          <div>
            <span>스페이스 썸네일</span>
            <SpaceThumb src={spaceInfo?.space_thumb || undefined} />
          </div>
          <div>
            <span>스페이스 이름</span>
            <h1>{spaceInfo?.title}</h1>
          </div>
          <div>
            <span>스페이스 설명</span>
            <p>{spaceInfo?.description}</p>
          </div>
        </StSectionMain>
      ) : (
        <ConfigSpaceOwner />
      )}
    </>
  );
}
