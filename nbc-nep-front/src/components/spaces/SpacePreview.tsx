import { useGetOtherUserInfo } from "@/hooks/query/useSupabase";
import { Dispatch, SetStateAction } from "react";
import { FORM_CHARACTER } from "./constatns/constants";
import { Procedure, SpaceInfo } from "./types/space.types";

interface Props {
  setProcedure: Dispatch<SetStateAction<Procedure>>;
  spaceInfo: SpaceInfo;
  spaceId: string;
  ownerId: string;
}
/**
 * useGetOtherUserInfo, useGetUserSpaces,
 *
 * @param param0
 * @returns
 */
export default function SpacePreview({
  setProcedure,
  spaceInfo,
  spaceId,
  ownerId,
}: Props) {
  const ownerInfo = useGetOtherUserInfo(spaceInfo.owner!);
  const handleToNextProcedure = () => {
    setProcedure(FORM_CHARACTER);
  };
  return (
    <>
      <h2>스페이스 미리보기</h2>
      {spaceInfo.id ? (
        <div>
          {/* <Image src /> */}
          <h2>{spaceInfo.title}</h2>
          <h3>{ownerInfo?.display_name}의 스페이스</h3>
          <p>{spaceInfo.description}</p>
        </div>
      ) : (
        <div>없ㅋ음</div>
      )}
      <button onClick={handleToNextProcedure}>다음</button>
    </>
  );
}
