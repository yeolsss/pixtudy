import { uploadThumbnail } from "@/api/supabase/storage";
import SpaceThumb from "@/components/common/SpaceThumb";
import { StDangerButton } from "@/components/common/button/button.styles";
import { StLoadingSpinner } from "@/components/common/loading/LoadingProgress";
import DefaultSpanText from "@/components/common/text/DefaultSpanText";
import {
  SPACE_DESCRIPTION_MAX_LENGTH,
  SPACE_NAME_MAX_LENGTH,
  SPACE_NAME_MIN_LENGTH,
} from "@/components/spaces/constants/constants";
import useMetaversePlayer from "@/hooks/metaverse/useMetaversePlayer";
import { useUpdateSpaceInfo } from "@/hooks/query/useSupabase";
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
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm({ mode: "onChange" });
  const { updateSpace, isSuccess, isPending } = useUpdateSpaceInfo();
  const formRef = useRef<HTMLFormElement>(null);
  const [thumbPreviewSrc, setThumbPreviewSrc] = useState(
    spaceInfo?.space_thumb || undefined
  );
  const thumbWatch = watch(SPACE_THUMB_FORM);
  const nameError = errors[SPACE_NAME_FORM]?.message;
  const descriptionError = errors[SPACE_DESCRIPTION_FORM]?.message;

  const handleRemoveSpace = () => {
    if (confirm("진짜 삭제할라고?")) {
      alert("good bye... bro...");
    }
  };

  const handleUpdateSpace: SubmitHandler<FieldValues> = async (data) => {
    if (!spaceInfo) return;
    const thumb: FileList = data[SPACE_THUMB_FORM];
    const title: string = data[SPACE_NAME_FORM];
    const description: string = data[SPACE_DESCRIPTION_FORM];

    let thumbnailURL: string | null = spaceInfo.space_thumb;
    if (thumb && thumb.length > 0) {
      const { data, error } = await uploadThumbnail(thumb[0], spaceInfo.id);
      if (data) thumbnailURL = data;

      if (error) {
        alert(
          "space를 업데이트하는데 실패하였습니다! 개발자에게 문의바랍니다..ㅜ"
        );
        console.error(error);
        return;
      }
    }

    updateSpace({
      id: spaceInfo.id,
      title,
      description,
      space_thumb: thumbnailURL,
    });
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

  useEffect(() => {
    if (thumbWatch && thumbWatch.length > 0) {
      const file = thumbWatch[0];
      setThumbPreviewSrc(URL.createObjectURL(file));
    }
  }, [thumbWatch]);

  useEffect(() => {
    if (isSuccess) {
      alert("수정이 완료됐습니다!");
    }
  }, [isSuccess]);

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
        <span>스페이스 이름</span>
        <input
          type="text"
          {...register(SPACE_NAME_FORM, {
            value: spaceInfo?.title,
            required: "스페이스의 이름이 필요합니다.",
            minLength: {
              value: SPACE_NAME_MIN_LENGTH,
              message: "스페이스의 이름은 2글자 이상이어야 합니다.",
            },
          })}
          maxLength={SPACE_NAME_MAX_LENGTH}
        />
        <span>
          {watch(SPACE_NAME_FORM)?.length || 0}/{SPACE_NAME_MAX_LENGTH}
        </span>
        {nameError && <DefaultSpanText>{nameError as string}</DefaultSpanText>}
      </div>
      <div>
        <span>스페이스 설명</span>
        <textarea
          {...register(SPACE_DESCRIPTION_FORM, {
            value: spaceInfo?.description,
            required: "스페이스의 설명이 필요합니다. ",
          })}
          maxLength={SPACE_DESCRIPTION_MAX_LENGTH}
        ></textarea>
        <span>
          {watch(SPACE_DESCRIPTION_FORM)?.length || 0}/
          {SPACE_DESCRIPTION_MAX_LENGTH}
        </span>
        {descriptionError && (
          <DefaultSpanText>{descriptionError as string}</DefaultSpanText>
        )}
      </div>

      <div>
        <button type="submit">수정하기</button>
        <StDangerButton type="button" onClick={handleRemoveSpace}>
          삭제하기
        </StDangerButton>
      </div>
      {isPending && <StLoadingSpinner />}
    </form>
  );
}
