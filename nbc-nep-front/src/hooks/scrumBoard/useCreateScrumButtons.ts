import useScrumBoardItemBackDrop from "@/zustand/createScrumBoardItemStore";
import useScrumBoardItem from "@/zustand/scrumBoardItemStore";
import useScrumBoardMemberSearch from "@/zustand/scrumBoardMemberStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useEffect } from "react";
import {
  deleteCategoryItem,
  postScrumBoardItem,
} from "@/api/supabase/scrumBoard";
import { useParams } from "next/navigation";
import useAuth from "@/zustand/authStore";

interface ReturnType {
  handleOnClickCreate: () => void;
  handleOnClickCancel: () => void;
  handleOnClickUpdate: () => void;
  handleOnClickDelete: () => void;
}
export default function useCreateScrumButtons(): ReturnType {
  const { space_id } = useParams();
  const { user } = useAuth();
  const { scrumBoardText, resetScrumBoardItem, setValidBoardText } =
    useScrumBoardItem();
  const { assignees, resetBackDrop, setAssignees, resetAssignees } =
    useScrumBoardMemberSearch();
  const { category, kanbanItem, closeBackDrop } = useScrumBoardItemBackDrop();
  const queryClient = useQueryClient();

  const createMutate = useMutation({
    mutationFn: postScrumBoardItem,
  });
  const deleteMutate = useMutation({
    mutationFn: deleteCategoryItem,
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
        onSuccess: async () => {
          toast.success("스크럼 보드 아이템이 등록되었습니다.");
          await queryClient.invalidateQueries({
            queryKey: ["categoryItem", category.id],
          });
          closeBackDrop();
        },
        onError: (error) => {
          toast.error("스크럼 보드 아이템 등록에 실패하였습니다.");
        },
      }
    );
  };
  const handleOnClickCancel = () => {
    closeBackDrop();
  };
  const handleOnClickUpdate = () => {};
  const handleOnClickDelete = () => {
    deleteMutate.mutate(kanbanItem?.id!, {
      onSuccess: async () => {
        toast.dark("스크럼 보드 아이템이 삭제되었습니다.");
        await queryClient.invalidateQueries({
          queryKey: ["categoryItem", category.id],
        });
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
          id: "",
          created_at: "",
          space_id: "",
          user_id: assignee.userId,
          space_display_name: assignee.space_display_name,
          space_avatar: assignee.spaceAvatar,
        };
        setAssignees(updatedAssignee);
      });
  }, [kanbanItem?.assignees]);

  useEffect(() => {
    return () => {
      resetScrumBoardItem();
      resetBackDrop();
    };
  }, []);

  return {
    handleOnClickCreate,
    handleOnClickCancel,
    handleOnClickUpdate,
    handleOnClickDelete,
  };
}
