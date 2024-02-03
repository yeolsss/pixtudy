import useScrumBoardItemBackDropStore from "@/zustand/createScrumBoardItemStore";
import useScrumBoardItem from "@/zustand/scrumBoardItemStore";
import useScrumBoardMemberSearch from "@/zustand/scrumBoardMemberStore";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useEffect } from "react";
import {
  deleteCategoryItem,
  patchScrumBoardItem,
  postScrumBoardItem,
} from "@/api/supabase/scrumBoard";
import { useParams } from "next/navigation";
import useAuthStore from "@/zustand/authStore";
import {
  BACK_DROP_TYPE_CREATE,
  BACK_DROP_TYPE_DETAIL,
  BACK_DROP_TYPE_UPDATE,
} from "@/components/scrumboard/constants/constants";
import useConfirm from "@/hooks/confirm/useConfirm";

interface ReturnType {
  handleOnClickCreate: () => void;
  handleOnClickBackDropClose: () => void;
  handleOnClickUpdate: () => void;
  handleOnClickUpdateConfirm: () => void;
  handleOnClickUpdateCancel: () => void;
  handleOnClickDelete: () => void;
}
export default function useCreateScrumButtons(): ReturnType {
  const { space_id } = useParams();
  const user = useAuthStore.use.user();
  const {
    scrumBoardText,
    resetScrumBoardItem,
    setValidBoardText,
    setScrumBoardText,
  } = useScrumBoardItem();
  const { assignees, resetBackDrop, setAssignees, resetAssignees } =
    useScrumBoardMemberSearch();

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
        space_id: space_id as string,
        user_id: user?.id,
        assignees: assignees,
      },
      {
        onSuccess: () => {
          toast.success("스크럼 보드 아이템이 등록되었습니다.");
          closeBackDrop();
        },
        onError: (error) => {
          toast.error("스크럼 보드 아이템 등록에 실패하였습니다.");
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
      updateMutate.mutate(
        {
          id: kanbanItem?.id!,
          description: scrumBoardText,
          space_id: space_id as string,
          assignees: assignees,
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
      deleteMutate.mutate(kanbanItem?.id!, {
        onSuccess: () => {
          toast.dark("스크럼 보드 아이템이 삭제되었습니다.");
          closeBackDrop();
        },
        onError: (error) => {
          toast.error("스크럼 보드 아이템 삭제에 실패하였습니다.");
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
