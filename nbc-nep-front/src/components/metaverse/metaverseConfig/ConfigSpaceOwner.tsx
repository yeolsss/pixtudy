import useMetaversePlayer from "@/hooks/metaverse/useMetaversePlayer";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import {
  SPACE_DESCRIPTION_FORM,
  SPACE_NAME_FORM,
} from "../constants/config.contant";

export default function ConfigSpaceOwner() {
  const { spaceInfo } = useMetaversePlayer();
  const { register } = useForm();
  const formRef = useRef<HTMLFormElement>(null);

  const handleRemoveSpace = () => {};

  const handleUpdateSpace = () => {};

  useEffect(() => {
    const handleKeyDownPrevent = (e: globalThis.KeyboardEvent) => {
      e.stopPropagation();
    };
    formRef.current?.addEventListener("keydown", handleKeyDownPrevent);

    return () => {
      formRef.current?.removeEventListener("keydown", handleKeyDownPrevent);
    };
  }, []);

  return (
    <form onSubmit={handleUpdateSpace} ref={formRef}>
      <div>
        <span>스페이스 이름</span>
        <input
          type="text"
          {...register(SPACE_NAME_FORM, { value: spaceInfo?.title })}
        />
      </div>
      <div>
        <span>스페이스 설명</span>
        <textarea
          {...register(SPACE_DESCRIPTION_FORM, {
            value: spaceInfo?.description,
          })}
        ></textarea>
      </div>

      {/* TODO : 썸네일 넣어야 함 <input type="file" {...register(SPACE_THUMB_FORM)} /> */}
      <div>
        <button type="submit">수정하기</button>
        <button type="button" onClick={handleRemoveSpace}>
          삭제하기
        </button>
      </div>
    </form>
  );
}

// TODO: owner만 -> 스페이스 삭제, 스페이스 이름 변경, 스페이스 설명 수정이 가능해야 한다
// 썸네일 수정 및 삭제도 가능해야 한다
