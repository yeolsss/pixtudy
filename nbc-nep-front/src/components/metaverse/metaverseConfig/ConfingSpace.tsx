import useMetaversePlayer from "@/hooks/metaverse/useMetaversePlayer";
import ConfigSpaceOwner from "./ConfigSpaceOwner";

export default function ConfigSpace() {
  const { isOwner, spaceInfo } = useMetaversePlayer();

  return (
    <>
      {!isOwner ? (
        <div>
          <div>
            <span>스페이스 이름</span>
            <h1>{spaceInfo?.title}</h1>
          </div>
          <div>
            <span>스페이스 설명</span>
            <p>{spaceInfo?.description}</p>
          </div>
          {/* TODO : 썸네일 사진도 넣어야 함 */}
        </div>
      ) : (
        <ConfigSpaceOwner />
      )}
    </>
  );
}
