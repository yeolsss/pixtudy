import { Dispatch, SetStateAction } from "react";
import {
  StDropdownMenuContainer,
  StDropdownMenuItem,
} from "../styles/category.styles";

interface Props {
  setIsEdit: Dispatch<SetStateAction<boolean>>;
  setIsDropdownOpen: Dispatch<SetStateAction<boolean>>;
  handleDeleteCategory: () => Promise<void>;
}

export default function CategoryDropdownMenu({
  setIsEdit,
  setIsDropdownOpen,
  handleDeleteCategory,
}: Props) {
  const handleEditCategoryButton = () => {
    setIsEdit(true);
    setIsDropdownOpen(false);
  };

  return (
    <StDropdownMenuContainer>
      <StDropdownMenuItem onClick={handleEditCategoryButton} $type="edit">
        <span />
        수정
      </StDropdownMenuItem>
      <StDropdownMenuItem onClick={handleDeleteCategory} $type="delete">
        <span />
        삭제
      </StDropdownMenuItem>
    </StDropdownMenuContainer>
  );
}
