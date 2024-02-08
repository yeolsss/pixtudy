import {
  StCategoryColor,
  StCategoryHeader,
  StCategoryInfo,
  StDropDownMenuBtnWrapper,
  StItemCounter,
} from "@/components/scrumboard/styles/category.styles";
import useConfirm from "@/hooks/confirm/useConfirm";
import { useDeleteCategory } from "@/hooks/query/useSupabase";
import { fadeInOut } from "@/styles/animations";
import { AnimatePresence, motion } from "framer-motion";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import CategoryDropdownMenu from "./CategoryDropdownMenu";
import EditCategoryForm from "./EditCategoryForm";

interface Props {
  name: string;
  color: string;
  itemCount: number;
  id: string;
}

export default function CategoryHeader({ name, color, id, itemCount }: Props) {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { openConfirmHandler } = useConfirm();
  const { space_id: spaceId } = useParams();
  const { remove } = useDeleteCategory(spaceId as string);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleDeleteCategory = async () => {
    openConfirmHandler({
      title: "카테고리 삭제",
      message: "이 카테고리를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.",
      confirmButtonText: "네, 삭제할게요",
      denyButtonText: "아니요, 취소할게요",
    }).then((result) => {
      if (result) remove(id);
    });
  };

  return (
    <StCategoryHeader>
      {isEdit ? (
        <EditCategoryForm
          name={name}
          color={color}
          id={id}
          setIsEdit={setIsEdit}
        />
      ) : (
        <>
          <StCategoryInfo>
            <StCategoryColor $color={color}>color</StCategoryColor>
            <h1>{name}</h1>
          </StCategoryInfo>
          <StItemCounter>{itemCount}items</StItemCounter>
          <StDropDownMenuBtnWrapper ref={dropdownRef}>
            <AnimatePresence>
              <button type="button" onClick={handleDropdown}>
                open dropdown
              </button>
              {isDropdownOpen && (
                <motion.div {...fadeInOut({ y: 2 })}>
                  <CategoryDropdownMenu
                    setIsEdit={setIsEdit}
                    setIsDropdownOpen={setIsDropdownOpen}
                    handleDeleteCategory={handleDeleteCategory}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </StDropDownMenuBtnWrapper>
        </>
      )}
    </StCategoryHeader>
  );
}
