import { StCTAButton } from "@/components/common/button/button.styles";
import { motion } from "framer-motion";
import styled from "styled-components";

export const StCategoryWrapper = styled(motion.div)<{ $isOver: boolean }>`
  // 임의로 설정한 너비
  min-width: 384px;
  height: 100%;
  box-sizing: content-box;
  background-color: ${(props) => props.theme.color.bg.secondary};
  padding: ${(props) => props.theme.spacing[16]};
  padding-top: 0;
  ${(props) =>
    props.$isOver
      ? `border: 2px solid ${props.theme.color.border.interactive.primary}`
      : `border : 2px solid ${props.theme.color.border.secondary}`};
  transition: border 0.2s ease-in-out;
  border-radius: ${(props) => props.theme.border.radius[12]};
`;

export const StItemsContainer = styled.ul`
  // 임의로 설정한 높이
  height: calc(92vh - 320px);
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing[12]};
  background-color: #f5f5f5;
  border-radius: ${(props) => props.theme.border.radius[8]};
  overflow: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const StAddItemBtn = styled(StCTAButton)`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: ${(props) => props.theme.spacing[12]};
  gap: ${(props) => props.theme.spacing[8]};
  font-size: ${(props) => props.theme.heading.desktop.sm.fontSize};
  & > span {
    display: block;
    width: ${(props) => props.theme.unit[14]};
    height: ${(props) => props.theme.unit[14]};
    margin-top: -${(props) => props.theme.unit[4]};
    background: url("/assets/additem.svg") no-repeat center center;
    background-size: contain;
  }
`;
