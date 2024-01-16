import { PropsWithChildren } from "react";
import { useDrag } from "react-dnd";
import styled from "styled-components";

interface Props {
  id: string;
  active: boolean;
}

export default function ShareScreenDragItem({
  id,
  active,
  children,
}: PropsWithChildren<Props>) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "VIDEO",
    item: { id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    canDrag: active ? false : true,
  }));

  return (
    <StDragContainer ref={drag} $active={active} $isDragging={isDragging}>
      {children}
    </StDragContainer>
  );
}

const StDragContainer = styled.div<{ $active: boolean; $isDragging: boolean }>`
  opacity: ${(props) => (props.$isDragging ? 0.2 : 1)};
  width: ${(props) => (props.$active ? "100%" : "100px")};
  height: ${(props) => (props.$active ? "100%" : "100px")};
`;
