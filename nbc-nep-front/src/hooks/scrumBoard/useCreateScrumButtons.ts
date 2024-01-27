import useScrumBoardItemBackDrop from "@/zustand/createScrumBoardItemStore";
import useScrumBoardItem from "@/zustand/scrumBoardItemStore";
import useScrumBoardMemberSearch from "@/zustand/scrumBoardMemberStore";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { postScrumBoardItem } from "@/api/supabase/scrumBoard";

interface ReturnType {
  handleOnClickCreate: () => void;
  handleOnClickCancel: () => void;
  handleOnClickUpdate: () => void;
  handleOnClickDelete: () => void;
}
export default function useCreateScrumButtons(): ReturnType {
  const { scrumBoardText, resetScrumBoardItem, setValidBoardText } =
    useScrumBoardItem();
  const { assignees, resetBackDrop } = useScrumBoardMemberSearch();
  const { category } = useScrumBoardItemBackDrop();
  const mutate = useMutation({
    mutationFn: postScrumBoardItem,
  });

  const { closeBackDrop } = useScrumBoardItemBackDrop();
  const handleOnClickCreate = () => {
    if (scrumBoardText === "") {
      setValidBoardText(true);
      return;
    }
    // 생성 로직
    mutate.mutate(
      {
        description: scrumBoardText,
        categoryId: category.id,
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
  const handleOnClickCancel = () => {
    closeBackDrop();
  };
  const handleOnClickUpdate = () => {};
  const handleOnClickDelete = () => {};

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
