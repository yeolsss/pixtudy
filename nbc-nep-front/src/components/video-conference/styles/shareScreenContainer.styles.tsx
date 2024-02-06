import styled from "styled-components";

import { GridStatusType, GuideStatusType } from "@/types/conference.types";

export const StVideosLayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  position: fixed;
  padding-top: ${(props) => props.theme.spacing["16"]};
  top: 0;
  left: 68px;
  right: 230px;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  & > button {
    position: absolute;
    background: ${(props) => props.theme.color.bg.interactive.danger};
    color: ${(props) => props.theme.color.base.white};
    font-size: ${(props) => props.theme.unit["16"]};
    border: none;
    right: 1rem;
    top: 1rem;
  }
`;

export const StNoActiveLayoutDiv = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-weight: bold;
  display: flex;
  flex-direction: column;
  align-items: center;
  & h4 {
    font-size: ${(props) => props.theme.unit["24"]};
    margin-bottom: ${(props) => props.theme.spacing["40"]};
  }
  & > span {
    font-size: ${(props) => props.theme.unit["16"]};
  }
  & > span + span {
    margin-top: ${(props) => props.theme.spacing["20"]};
  }
`;
export const StPreviewContainer = styled.div<{ $isPreviewVideo: boolean }>`
  display: flex;
  margin-bottom: ${(props) => (props.$isPreviewVideo ? "1rem" : "0")};
  height: ${(props) => (props.$isPreviewVideo ? "15%" : "7%")};
  flex-shrink: unset;
`;

export const StLayoutContainer = styled.div<{
  $currentGridLayout: GridStatusType;
  $isPreviewVideo: boolean;
}>`
  background: rgba(0, 0, 0, 0.8);
  width: 100%;
  height: ${(props) => (props.$isPreviewVideo ? "85%" : "93%")};
  display: grid;
  position: relative;

  & > span {
    font-size: 4rem;
    color: white;
  }
  ${(props) => {
    switch (props.$currentGridLayout) {
      case "edge-four":
        return "grid-template-rows: 50% 50%; grid-template-columns: 50% 50%";
      case "leftRight-two":
        return "grid-template-rows: 100%; grid-template-columns: 50% 50%";
      case "topBottom-two":
        return "grid-template-rows: 50% 50%; grid-template-columns: 100%";
      case "center-one":
      default:
        return "grid-template-rows: 100%; grid-template-columns: 100%";
    }
  }}
`;

export const StLayoutGuide = styled.div<{ $guide: GuideStatusType | null }>`
  z-index: 10;
  background: rgba(122, 108, 108, 0.5);
  margin: ${(props) => props.theme.spacing[6]};
  border-radius: ${(props) => props.theme.border.radius[12]};
  position: absolute;
  ${(props) => {
    switch (props.$guide) {
      case "top":
        return "top: 0; bottom: 50%; left: 0; right: 0;";
      case "bottom":
        return "top: 50%; bottom: 0; left: 0; right: 0;";
      case "left":
        return "top: 0; bottom: 0; left: 0; right: 50%;";
      case "right":
        return "top: 0; bottom: 0; left: 50%; right: 0;";
      case "left-top":
        return "top: 0; bottom: 50%; left: 0; right: 50%;";
      case "left-bottom":
        return "top: 50%; bottom: 0; left: 0; right: 50%;";
      case "right-top":
        return "top: 0; bottom: 50%; left: 50%; right: 0;";
      case "right-bottom":
        return "top: 50%; bottom: 0; left: 50%; right: 0;";
      case "center":
        return "top: 0; bottom: 0; left: 0; right: 0;";
      default:
        return "top: unset; bottom: unset; left: unset; right: unset;";
    }
  }}
`;

export const StShareScreenDragItemContainer = styled.div`
  position: relative;
`;
export const StDrag = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  background: transparent;
`;

export const StDragContainer = styled.div<{
  $active: boolean;
  $isDragging: boolean;
}>`
  opacity: ${(props) => (props.$isDragging ? 0.2 : 1)};
  width: 100%;
  height: 100%;
  margin: ${(props) => (props.$active ? "0" : "0 1rem")};
  cursor: pointer;
  & div {
    width: ${(props) => props.$active && "100%"};
    height: ${(props) => props.$active && "100%"};

    & video {
      width: ${(props) => props.$active && "100%"};
      height: ${(props) => props.$active && "100%"};
      object-fit: contain;
    }
  }
  & button {
    position: absolute;
    z-index: 20;
    right: 1rem;
    top: 1rem;
    background: rgba(0, 0, 0, 0.5);
    color: white;
    border: none;
    &:hover {
      background: ${(props) =>
        props.theme.color.bg.interactive["danger-hovered"]};
    }
  }
`;
