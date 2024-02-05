import {
  deleteCategoryItem,
  patchScrumBoardItem,
  postScrumBoardItem,
} from "@/api/supabase/scrumBoard";
import {
  BACK_DROP_TYPE_CREATE,
  BACK_DROP_TYPE_DETAIL,
  BACK_DROP_TYPE_UPDATE,
} from "@/components/scrumboard/constants";
import useConfirm from "@/hooks/confirm/useConfirm";
import useAuthStore from "@/zustand/authStore";
import useScrumBoardItemBackDropStore from "@/zustand/createScrumBoardItemStore";
import useScrumBoardItemStore from "@/zustand/scrumBoardItemStore";
import useScrumBoardMemberSearchStore from "@/zustand/scrumBoardMemberStore";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";

interface ReturnType {
  handleOnClickCreate: () => void;
  handleOnClickBackDropClose: () => void;
  handleOnClickUpdate: () => void;
  handleOnClickUpdateConfirm: () => void;
  handleOnClickUpdateCancel: () => void;
  handleOnClickDelete: () => void;
}
export default function useCreateScrumButtons(): ReturnType {
  const { space_id: spaceId }: { space_id: string } = useParams();
  const user = useAuthStore.use.user();
  const scrumBoardText = useScrumBoardItemStore.use.scrumBoardText();
  const resetScrumBoardItem = useScrumBoardItemStore.use.resetScrumBoardItem();
  const setValidBoardText = useScrumBoardItemStore.use.setValidBoardText();
  const setScrumBoardText = useScrumBoardItemStore.use.setScrumBoardText();
  const assignees = useScrumBoardMemberSearchStore.use.assignees();
  const resetBackDrop = useScrumBoardMemberSearchStore.use.resetBackDrop();
  const setAssignees = useScrumBoardMemberSearchStore.use.setAssignees();
  const resetAssignees = useScrumBoardMemberSearchStore.use.resetAssignees();

  const category = useScrumBoardItemBackDropStore.use.category();
  const kanbanItem = useScrumBoardItemBackDropStore.use.kanbanItem();
  const backDropType = useScrumBoardItemBackDropStore.use.backDropType();
  const closeBackDrop = useScrumBoardItemBackDropStore.use.closeBackDrop();
  const setBackDropType = useScrumBoardItemBackDropStore.use.setBackDropType();
  const setKanbanDescription =
    useScrumBoardItemBackDropStore.use.setKanbanDescription();

  const createMutate = useMutation({
    mutationFn: postScrumBoardItem,
  });
  const deleteMutate = useMutation({
    mutationFn: deleteCategoryItem,
  });
  const updateMutate = useMutation({
    mutationFn: patchScrumBoardItem,
  });

  const { openConfirmHandler } = useConfirm();

  const handleOnClickCreate = () => {
    if (scrumBoardText === "") {
      setValidBoardText(true);
      return;
    }
    // 생성 로직
    createMutate.mutate(
      {
        description: scrumBoardText,
        categoryId: category.id,
        spaceId: spaceId as string,
        userId: user?.id,
        assignees,
      },
      {
        onSuccess: () => {
          toast.success("스크럼 보드 아이템이 등록되었습니다.");
          closeBackDrop();
        },
        onError: (error: Error) => {
          toast.error("스크럼 보드 아이템 등록에 실패하였습니다.");
          console.error(error);
        },
      }
    );
  };
  const handleOnClickBackDropClose = () => {
    closeBackDrop();
  };

  const handleOnClickUpdate = () => {
    setBackDropType(BACK_DROP_TYPE_UPDATE);
  };
  const handleOnClickUpdateConfirm = () => {
    if (scrumBoardText === "") {
      setValidBoardText(true);
      return;
    }

    openConfirmHandler({
      title: "스크럼 보드 아이템을 수정",
      message:
        "스크럼 보드 아이템을 수정하시겠습니까? 이 작업은 되돌릴 수 없습니다.",
      confirmButtonText: "네, 수정할게요",
      denyButtonText: "아니요, 취소할게요",
    }).then((result) => {
      if (!result) return;
      if (!kanbanItem) return;
      updateMutate.mutate(
        {
          id: kanbanItem.id!,
          description: scrumBoardText,
          spaceId,
          assignees,
        },
        {
          onSuccess: async () => {
            toast.success("스크럼 보드 아이템이 수정되었습니다.");
            setKanbanDescription(scrumBoardText);
            setBackDropType(BACK_DROP_TYPE_DETAIL);
          },
        }
      );
    });
  };
  const handleOnClickUpdateCancel = () => {
    setBackDropType(BACK_DROP_TYPE_DETAIL);
  };

  const handleOnClickDelete = () => {
    openConfirmHandler({
      title: "스크럼 보드 아이템을 삭제",
      message:
        "스크럼 보드 아이템을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.",
      confirmButtonText: "네, 삭제할게요",
      denyButtonText: "아니요, 취소할게요",
    }).then((result) => {
      if (!result) return;
      if (!kanbanItem) return;
      deleteMutate.mutate(kanbanItem.id!, {
        onSuccess: () => {
          toast.dark("스크럼 보드 아이템이 삭제되었습니다.");
          closeBackDrop();
        },
        onError: (error) => {
          toast.error("스크럼 보드 아이템 삭제에 실패하였습니다.");
          console.error(error);
        },
      });
    });
  };

  useEffect(() => {
    resetAssignees();
    if (kanbanItem?.assignees) {
      if (kanbanItem.assignees[0].userId !== null) {
        kanbanItem.assignees.forEach((assignee) => {
          const updatedAssignee = {
            id: assignee.assigneesId,
            created_at: "",
            space_id: "",
            user_id: assignee.userId,
            space_display_name: assignee.space_display_name,
            space_avatar: assignee.spaceAvatar,
          };
          setAssignees(updatedAssignee);
        });
      }
      setScrumBoardText(kanbanItem.description);
    }
  }, [kanbanItem?.assignees]);

  useEffect(() => {
    if (backDropType === BACK_DROP_TYPE_CREATE) setScrumBoardText("");
  }, [backDropType]);

  useEffect(() => {
    return () => {
      resetScrumBoardItem();
      resetBackDrop();
    };
  }, []);

  return {
    handleOnClickCreate,
    handleOnClickBackDropClose,
    handleOnClickUpdate,
    handleOnClickUpdateConfirm,
    handleOnClickUpdateCancel,
    handleOnClickDelete,
  };
}
