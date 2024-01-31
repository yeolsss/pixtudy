import { uploadThumbnail } from "@/api/supabase/storage";
import SpaceThumb from "@/components/common/SpaceThumb";
import { StDangerButton } from "@/components/common/button/button.styles";
import { StLoadingSpinner } from "@/components/common/loading/LoadingProgress";
import {
  SPACE_DESCRIPTION_MAX_LENGTH,
  SPACE_NAME_MAX_LENGTH,
  SPACE_NAME_MIN_LENGTH,
} from "@/components/spaces/constants/constants";
import useChat from "@/hooks/chat/useChat";
import useConfirm from "@/hooks/confirm/useConfirm";
import useKeyDownPrevent from "@/hooks/metaverse/useKeyDownPrevent";
import useMetaversePlayer from "@/hooks/metaverse/useMetaversePlayer";
import { useDeleteSpace, useUpdateSpaceInfo } from "@/hooks/query/useSupabase";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import styled from "styled-components";
import {
  IMAGE_MAX_SIZE,
  SPACE_DESCRIPTION_FORM,
  SPACE_NAME_FORM,
  SPACE_THUMB_FORM,
} from "../constants/config.constant";
import { StHiddenInput, StSectionMain } from "../styles/config.styles";
import ConfigSpaceFormItem from "./ConfigSpaceFormItem";

export default function ConfigSpaceOwner() {
  const { spaceInfo } = useMetaversePlayer();
  const {
    handleSubmit,
    register,
    watch,
    resetField,
    formState: { errors },
  } = useForm({ mode: "onChange" });
  const {
    updateSpace,
    isSuccess: isSuccessUpdate,
    isPending: isPendingUpdate,
  } = useUpdateSpaceInfo();
  const { deleteSpace, isSuccess: isSuccessDelete } = useDeleteSpace();
  const formRef = useKeyDownPrevent<HTMLFormElement>();
  const [thumbPreviewSrc, setThumbPreviewSrc] = useState(
    spaceInfo?.space_thumb || undefined
  );
  const { emitRemoveSpace } = useChat();
  const thumbWatch = watch(SPACE_THUMB_FORM);
  const nameError = errors[SPACE_NAME_FORM]?.message;
  const descriptionError = errors[SPACE_DESCRIPTION_FORM]?.message;
  const { openConfirmHandler } = useConfirm();

  const handleRemoveSpace = async () => {
    if (!spaceInfo) return;
    const result = await openConfirmHandler({
      title: "스페이스 삭제",
      message: "스페이스를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.",
      confirmButtonText: "네, 삭제할게요",
      denyButtonText: "아니요, 취소할게요",
    });

    if (result) {
      deleteSpace(spaceInfo?.id);
    }
  };

  const handleUpdateSpace: SubmitHandler<FieldValues> = async (data) => {
    if (!spaceInfo) return;

    const {
      [SPACE_THUMB_FORM]: thumb,
      [SPACE_NAME_FORM]: title,
      [SPACE_DESCRIPTION_FORM]: description,
    } = data;

    let thumbnailURL: string | null = spaceInfo.space_thumb;

    if (thumb && thumb.length > 0) {
      const { data, error } = await uploadThumbnail(thumb[0]);

      if (data) thumbnailURL = data;

      if (error) {
        toast.error(
          "space를 업데이트하는데 실패하였습니다! 개발자에게 문의바랍니다..."
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
    if (thumbWatch && thumbWatch.length > 0) {
      const file = thumbWatch[0] as File;

      if (file.size > IMAGE_MAX_SIZE) {
        // file validation
        toast.error("이미지 사이즈는 최대 50MB이하로 넣을 수 있습니다.", {
          position: "top-center",
        });
        resetField(SPACE_THUMB_FORM);
        return;
      }

      setThumbPreviewSrc(URL.createObjectURL(file));
    }
  }, [thumbWatch]);

  useEffect(() => {
    if (isSuccessUpdate) {
      toast.success("수정이 완료됐습니다!", { position: "top-right" });
    }
  }, [isSuccessUpdate]);

  useEffect(() => {
    if (isSuccessDelete) {
      emitRemoveSpace();
    }
  }, [isSuccessDelete]);

  return (
    <StSection
      as="form"
      onSubmit={handleSubmit(handleUpdateSpace)}
      ref={formRef}
    >
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
        {!!watch(SPACE_THUMB_FORM) || (
          <StHelperSpan>썸네일을 클릭하여 썸네일을 수정해보세요</StHelperSpan>
        )}
      </div>
      <ConfigSpaceFormItem
        title="스페이스 이름"
        maxLength={SPACE_NAME_MAX_LENGTH}
        curLength={
          watch(SPACE_NAME_FORM)?.length || spaceInfo?.title.length || 0
        }
        error={nameError}
      >
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
      </ConfigSpaceFormItem>
      <ConfigSpaceFormItem
        title="스페이스 설명"
        maxLength={SPACE_DESCRIPTION_MAX_LENGTH}
        curLength={
          watch(SPACE_DESCRIPTION_FORM)?.length ||
          spaceInfo?.description.length ||
          0
        }
        error={descriptionError}
      >
        <textarea
          {...register(SPACE_DESCRIPTION_FORM, {
            value: spaceInfo?.description,
            required: "스페이스의 설명이 필요합니다. ",
          })}
          maxLength={SPACE_DESCRIPTION_MAX_LENGTH}
        ></textarea>
      </ConfigSpaceFormItem>
      <div>
        <button type="submit">수정하기</button>
        <StDanger type="button" onClick={handleRemoveSpace}>
          삭제하기
        </StDanger>
      </div>
      {isPendingUpdate && <StLoadingSpinner />}
    </StSection>
  );
}

const StSection = styled(StSectionMain)`
  overflow: auto;

  div label {
    align-self: center;
    cursor: pointer;
  }

  input,
  textarea {
    font-family: var(--default-font);
  }
  padding-top: 0 !important;
`;

const StDanger = styled(StDangerButton)`
  padding: ${(props) => `${props.theme.spacing[8]} ${props.theme.spacing[16]}`};
  font-size: inherit;
  border-radius: ${(props) => props.theme.border.radius[8]};
`;

const StHelperSpan = styled.p`
  font-size: 0.75rem;
  font-weight: normal;
  color: ${(props) => props.theme.color.text.info};
  text-align: center;
  opacity: 0.5;
`;
