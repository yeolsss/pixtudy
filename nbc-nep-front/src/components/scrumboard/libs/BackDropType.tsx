import {
  BACK_DROP_TYPE_DETAIL,
  BACK_DROP_TYPE_UPDATE,
} from "@/components/scrumboard/constants/constants";
import CreateBackDropCtaButton from "@/components/scrumboard/detail/createBackDrop/CreateBackDropCTAButton";
import useCreateScrumButtons from "@/hooks/scrumBoard/useCreateScrumButtons";
import { BackDropType } from "@/types/scrum.types";

export default function BackDropTypeButtonGroup(type: BackDropType) {
  const {
    handleOnClickCreate,
    handleOnClickBackDropClose,
    handleOnClickUpdate,
    handleOnClickUpdateConfirm,
    handleOnClickUpdateCancel,
    handleOnClickDelete,
  } = useCreateScrumButtons();

  switch (type) {
    case BACK_DROP_TYPE_DETAIL:
      return (
        <>
          <CreateBackDropCtaButton
            buttonType="submit"
            forwardText="수정"
            handle={handleOnClickUpdate}
          />
          <CreateBackDropCtaButton
            buttonType="button"
            forwardText="삭제"
            handle={handleOnClickDelete}
          />
          <CreateBackDropCtaButton
            buttonType="button"
            forwardText="닫기"
            handle={handleOnClickBackDropClose}
          />
        </>
      );
    case BACK_DROP_TYPE_UPDATE:
      return (
        <>
          <CreateBackDropCtaButton
            buttonType="submit"
            forwardText="저장"
            handle={handleOnClickUpdateConfirm}
          />
          <CreateBackDropCtaButton
            buttonType="button"
            forwardText="취소"
            handle={handleOnClickUpdateCancel}
          />
        </>
      );
    default:
      return (
        <>
          <CreateBackDropCtaButton
            buttonType="submit"
            forwardText="생성"
            handle={handleOnClickCreate}
          />
          <CreateBackDropCtaButton
            buttonType="button"
            forwardText="닫기"
            handle={handleOnClickBackDropClose}
          />
        </>
      );
  }
}
