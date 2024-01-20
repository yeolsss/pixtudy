import { useGetUserSpaces } from "@/hooks/query/useSupabase";
import { Dispatch, SetStateAction } from "react";
import { FORM_CHARACTER } from "./constatns/constants";
import { Procedure } from "./types/space.types";

interface Props {
  setProcedure: Dispatch<SetStateAction<Procedure>>;
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
  spaceId,
  ownerId,
}: Props) {
  const data = useGetUserSpaces(ownerId);

  const handleToNextProcedure = () => {
    setProcedure(FORM_CHARACTER);
  };
  console.log(data);
  return (
    <>
      <h2>스페이스 미리보기</h2>
      {spaceId ? (
        <div>
          {/* <Image src /> */}
          <h2>ㅁ</h2>
          <p>ㄴ</p>
          <span>ㅇ</span>
        </div>
      ) : (
        <div>ㄹ</div>
      )}
      <button onClick={handleToNextProcedure}>입장하기</button>
    </>
  );
}
