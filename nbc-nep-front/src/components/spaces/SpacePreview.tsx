import { useGetOtherUserInfo } from "@/hooks/query/useSupabase";
import { useAppSelector } from "@/hooks/useReduxTK";
import { Dispatch, SetStateAction } from "react";
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
  const ownerInfo = useGetOtherUserInfo(joinSpaceInfo.owner);
  const handleToNextProcedure = () => {
    setProcedure(FORM_CHARACTER);
  };
  return (
    <>
      <h2>스페이스 미리보기</h2>
      {joinSpaceInfo.space_id ? (
        <div>
          {/* <Image src /> */}
          <h2>{joinSpaceInfo.title}</h2>
          <h3>{ownerInfo?.display_name}의 스페이스</h3>
          <p>{joinSpaceInfo.description}</p>
        </div>
      ) : (
        <div>초대코드를 입력해서 스페이스에 입장해 보세요!</div>
      )}
      <button onClick={handleToNextProcedure}>다음</button>
    </>
  );
}
