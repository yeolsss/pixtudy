import SpaceThumb from "@/components/common/SpaceThumb";
import useMetaversePlayer from "@/hooks/metaverse/useMetaversePlayer";
import { useEffect, useRef, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import {
  SPACE_DESCRIPTION_FORM,
  SPACE_NAME_FORM,
  SPACE_THUMB_FORM,
} from "../constants/config.contant";
import { StHiddenInput } from "../styles/config.styles";

export default function ConfigSpaceOwner() {
  const { spaceInfo } = useMetaversePlayer();
  const { handleSubmit, register, watch } = useForm();
  const formRef = useRef<HTMLFormElement>(null);
  const [thumbPreviewSrc, setThumbPreviewSrc] = useState(
    spaceInfo?.space_thumb || undefined
  );

  const handleRemoveSpace = () => {
    if (confirm("진짜 삭제할라고?")) {
      alert("good bye... bro...");
    }
  };

  const handleUpdateSpace: SubmitHandler<FieldValues> = async (data) => {
    // validation을 진행했다고 가정
    const thumb = data[SPACE_THUMB_FORM];

    if (thumb) {
      // thumb잉 ㅣㅆ다면 firebase에 thumb을 따로 추가해야한다.
    }
  };

  useEffect(() => {
    const handleKeyDownPrevent = (e: globalThis.KeyboardEvent) => {
      e.stopPropagation();
    };
    formRef.current?.addEventListener("keydown", handleKeyDownPrevent);

    return () => {
      formRef.current?.removeEventListener("keydown", handleKeyDownPrevent);
    };
  }, []);

  const thumbWatch = watch(SPACE_THUMB_FORM);

  useEffect(() => {
    if (thumbWatch && thumbWatch.length > 0) {
      const file = thumbWatch[0];
      setThumbPreviewSrc(URL.createObjectURL(file));
    }
  }, [thumbWatch]);

  return (
    <form onSubmit={handleSubmit(handleUpdateSpace)} ref={formRef}>
      <div>
        <span>스페이스 썸네일</span>
        <label htmlFor={SPACE_THUMB_FORM}>
          <SpaceThumb src={thumbPreviewSrc} />
        </label>
        <StHiddenInput
          id={SPACE_THUMB_FORM}
          type="file"
          {...register(SPACE_THUMB_FORM)}
          accept="image/*"
        />
      </div>
      <div>
        <span>스페이스 이름</span> {/* TODO: 스페이스 이름 validation */}
        <input
          type="text"
          {...register(SPACE_NAME_FORM, { value: spaceInfo?.title })}
        />
      </div>
      <div>
        <span>스페이스 설명</span> {/* TODO: 스페이스 설명 validation */}
        <textarea
          {...register(SPACE_DESCRIPTION_FORM, {
            value: spaceInfo?.description,
          })}
        ></textarea>
      </div>

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
