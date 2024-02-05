import { PropsWithChildren } from "react";
import { useDrag } from "react-dnd";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";

import {
  StDrag,
  StDragContainer,
  StShareScreenDragItemContainer,
} from "./styles/shareScreenContainer.styles";

interface Props {
  id: string;
  active: boolean;
  handleInactive?: (id: string) => void;
}

export default function ShareScreenDragItem({
  id,
  active,
  handleInactive,
  children,
}: PropsWithChildren<Props>) {
  const [{ isDragging }, drag, preview] = useDrag(() => ({
    type: "VIDEO",
    item: { id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    canDrag: !active,
  }));

  return (
    <StShareScreenDragItemContainer>
      {!active && <StDrag ref={drag} />}
      <StDragContainer ref={preview} $active={active} $isDragging={isDragging}>
        {active && (
          <button
            type="button"
            onClick={() => {
              if (handleInactive) {
                handleInactive(id);
              }
            }}
          >
            레이아웃 제거
          </button>
        )}
        <TransformWrapper
          wheel={{ activationKeys: ["Control", "Meta"] }}
          panning={{
            activationKeys: ["Control", "Meta"],
            disabled: !active,
          }}
        >
          <TransformComponent>{children}</TransformComponent>
        </TransformWrapper>
      </StDragContainer>
    </StShareScreenDragItemContainer>
  );
}

ShareScreenDragItem.defaultProps = {
  handleInactive: () => {},
};
