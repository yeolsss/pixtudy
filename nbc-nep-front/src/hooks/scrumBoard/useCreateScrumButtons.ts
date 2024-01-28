import useScrumBoardItemBackDrop from "@/zustand/createScrumBoardItemStore";
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
import useAuth from "@/zustand/authStore";
import {
  BACK_DROP_TYPE_CREATE,
  BACK_DROP_TYPE_DETAIL,
  BACK_DROP_TYPE_UPDATE,
} from "@/components/scrumboard/constants/constants";

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
  const { user } = useAuth();
  const {
    scrumBoardText,
    resetScrumBoardItem,
    setValidBoardText,
    setScrumBoardText,
  } = useScrumBoardItem();
  const { assignees, resetBackDrop, setAssignees, resetAssignees } =
    useScrumBoardMemberSearch();
  const {
    category,
    kanbanItem,
    backDropType,
    closeBackDrop,
    setBackDropType,
    setKanbanDescription,
  } = useScrumBoardItemBackDrop();

  const createMutate = useMutation({
    mutationFn: postScrumBoardItem,
  });
  const deleteMutate = useMutation({
    mutationFn: deleteCategoryItem,
  });
  const updateMutate = useMutation({
    mutationFn: patchScrumBoardItem,
  });

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

    if (confirm("스크럼 보드 아이템을 수정하시겠습니까?")) {
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
    }
  };
  const handleOnClickUpdateCancel = () => {
    setBackDropType(BACK_DROP_TYPE_DETAIL);
  };

  const handleOnClickDelete = () => {
    deleteMutate.mutate(kanbanItem?.id!, {
      onSuccess: () => {
        toast.dark("스크럼 보드 아이템이 삭제되었습니다.");
        closeBackDrop();
      },
      onError: (error) => {
        toast.error("스크럼 보드 아이템 삭제에 실패하였습니다.");
      },
    });
  };

  useEffect(() => {
    resetAssignees();
    kanbanItem?.assignees &&
      kanbanItem.assignees.forEach((assignee) => {
        const updatedAssignee = {
          id: assignee.assigneesId,
          created_at: "",
          space_id: "",
          user_id: assignee.userId,
          space_display_name: assignee.space_display_name,
          space_avatar: assignee.spaceAvatar,
        };
        setScrumBoardText(kanbanItem.description);
        setAssignees(updatedAssignee);
      });
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
