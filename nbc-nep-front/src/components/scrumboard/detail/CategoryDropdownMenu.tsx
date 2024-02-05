import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";

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

const StDropdownMenuContainer = styled.ul`
  position: absolute;
  bottom: -${(props) => props.theme.unit[40]};
  left: ${(props) => props.theme.unit[24]};
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.color.bg.secondary};
  border-radius: ${(props) => props.theme.border.radius[12]};
  box-shadow: ${(props) => props.theme.elevation.Light.shadow2};
  &:before {
    content: "";
    position: absolute;
    top: ${(props) => props.theme.unit[12]};
    left: ${(props) => props.theme.unit[0]};
    width: 0;
    height: 0;
    border: ${(props) => props.theme.unit[8]} solid transparent;
    border-right-color: ${(props) => props.theme.color.bg.secondary};
    border-left: 0;
    margin-left: -${(props) => props.theme.unit[8]};
  }
`;

const StDropdownMenuItem = styled.li<{ $type: string }>`
  display: flex;
  justify-content: space-between;
  width: ${(props) => props.theme.unit[80]};
  padding: ${(props) => props.theme.spacing[12]};
  cursor: pointer;
  font-family: var(--sub-font);
  font-size: ${(props) => props.theme.body.lg.semibold.fontSize};
  & > span {
    display: inline-block;
    width: 16px;
    height: 16px;
    background: url("/assets/${(props) => props.$type}.svg");
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
  }
  &:hover {
    background-color: ${(props) => props.theme.color.bg.primary};
  }
  &:nth-child(1) {
    border-top-left-radius: ${(props) => props.theme.border.radius[12]};
    border-top-right-radius: ${(props) => props.theme.border.radius[12]};
    padding-bottom: ${(props) => props.theme.spacing[8]};
  }
  &:nth-child(2) {
    border-bottom-left-radius: ${(props) => props.theme.border.radius[12]};
    border-bottom-right-radius: ${(props) => props.theme.border.radius[12]};
    padding-top: ${(props) => props.theme.spacing[8]};
  }
`;
