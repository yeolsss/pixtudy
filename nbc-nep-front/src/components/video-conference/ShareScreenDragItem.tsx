import { PropsWithChildren } from "react";
import { useDrag } from "react-dnd";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import styled from "styled-components";

interface Props {
  id: string;
  active: boolean;
  handleInactive?: (id: string) => void;
}

export default function ShareScreenDragItem({
  id,
  active,
  children,
  handleInactive,
}: PropsWithChildren<Props>) {
  const [{ isDragging }, drag, preview] = useDrag(() => ({
    type: "VIDEO",
    item: { id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    canDrag: active ? false : true,
  }));

  return (
    <StShareScreenDragItemContainer>
      {!active && <StDrag ref={drag} />}
      <StDragContainer
        ref={preview}
        $active={active}
        $isDragging={isDragging}
        onClick={() => {
          handleInactive && handleInactive(id);
        }}
      >
        <TransformWrapper panning={{ disabled: true }}>
          <TransformComponent>{children}</TransformComponent>
        </TransformWrapper>
      </StDragContainer>
    </StShareScreenDragItemContainer>
  );
}

const StShareScreenDragItemContainer = styled.div`
  position: relative;
`;
const StDrag = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  background: transparent;
`;

const StDragContainer = styled.div<{ $active: boolean; $isDragging: boolean }>`
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
`;
