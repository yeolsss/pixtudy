import { PropsWithChildren, useRef, useState } from "react";
import { useDrop } from "react-dnd";
import styled from "styled-components";
import { currentLayoutIndex, getGridStyle } from "./lib/dnd";
import { GridStatusType, GuideStatusType } from "./types/ScreenShare.types";
import ShareScreenDragItem from "./ShareScreenDragItem";

interface Props {
  children: JSX.Element[];
}
export default function ShareScreenContainer({
  children,
}: PropsWithChildren<Props>) {
  // 비디오 상태관리
  const [videos, setVideos] = useState<(JSX.Element | null)[]>(children);
  const [selectVideos, setSelectVideos] = useState<(JSX.Element | null)[]>([]);

  //   가이드 상태
  const [currentGuide, setCurrentGuide] = useState<GuideStatusType | null>(
    null
  );

  //   그리드 상태
  const [currentGrid, setCurrentGrid] = useState<GridStatusType | null>(null);

  const [showGuide, setShowGuide] = useState(false);

  // 레이아웃 컨테이너
  const dropParentRef = useRef<HTMLDivElement | null>(null);
  const hoverTimer = useRef<NodeJS.Timeout | null>(null);

  const [, drop] = useDrop({
    accept: "VIDEO",
    hover: (item, monitor) => {
      if (!dropParentRef.current) {
        return;
      }
      //마우스 호버 아웃 체크
      clearTimeout(hoverTimer?.current!);
      // 부모 컴포넌트의 좌표
      const parentRect = dropParentRef.current.getBoundingClientRect();
      // 현재 마우스 좌표
      const clientOffset = monitor.getClientOffset();
      // 부모 컴포넌트 기준 y축 좌표
      const hoverClientY = clientOffset!.y - parentRect.top;
      // 부모 컴포넌트 기준 x축 좌표
      const hoverClientX = clientOffset!.x - parentRect.left;

      // 좌측
      if (hoverClientX < 200) {
        if (hoverClientY < 200) {
          setCurrentGuide("left-top");
          setShowGuide(true);
        } else if (hoverClientY > parentRect.height - 200) {
          setCurrentGuide("left-bottom");
          setShowGuide(true);
        } else {
          setCurrentGuide("left");
          setShowGuide(true);
        }
      } else if (hoverClientX > parentRect.width - 200) {
        // 우측
        if (hoverClientY < 200) {
          setCurrentGuide("right-top");
          setShowGuide(true);
        } else if (hoverClientY > parentRect.height - 200) {
          setCurrentGuide("right-bottom");
          setShowGuide(true);
        } else {
          setCurrentGuide("right");
          setShowGuide(true);
        }
      } else if (hoverClientY < 200) {
        setCurrentGuide("top");
        setShowGuide(true);
      } else if (hoverClientY > parentRect.height - 200) {
        setCurrentGuide("bottom");
        setShowGuide(true);
      } else {
        setCurrentGuide("center");
        setShowGuide(true);
      }

      hoverTimer.current = setTimeout(() => {
        setCurrentGuide(null);
        setShowGuide(false);
      }, 150);
    },

    drop: (item: { id: string }) => {
      console.log(item.id);
      const changeGridStyle = getGridStyle(currentGuide!);
      const activeIndex = currentLayoutIndex(currentGuide!);

      setCurrentGrid((prevGrid) => {
        if (prevGrid !== changeGridStyle) {
          setSelectVideos((prevSelect) => {
            const prevSelectVideos = prevSelect.filter((select) => !!select);
            setVideos((prevVideos) => [...prevVideos, ...prevSelectVideos]);
            return [];
          });
          setVideos((prev) => prev.filter((video) => video?.key !== item.id));
        }
        return changeGridStyle;
      });

      setVideos((prevVideos) =>
        prevVideos.filter((video) => video?.key !== item.id)
      );

      setSelectVideos((prevVideos) => {
        const newVideos = [...prevVideos];
        // console.log(activeIndex);
        const prevIndexValue = newVideos[activeIndex!];
        if (prevIndexValue) {
          setVideos((prev) => {
            return [...prev, prevIndexValue];
          });
        }
        while (newVideos.length <= activeIndex!) {
          newVideos.push(null); // 빈 값을 채워넣음
        }

        newVideos[activeIndex!] = children.find(
          (child) => child.key === item.id
        )!;
        return newVideos;
      });
    },
  });

  return (
    <StVideosLayoutContainer>
      <StPreviewContainer $isPreviewVideo={videos.length}>
        {videos.map((video) => {
          return (
            <ShareScreenDragItem
              key={video?.key}
              id={video?.key!}
              active={false}
            >
              {video}
            </ShareScreenDragItem>
          );
        })}
      </StPreviewContainer>

      <StLayoutContainer
        ref={(element) => {
          dropParentRef.current = element;
          drop(element);
        }}
        $currentGridLayout={currentGrid!}
        $isPreviewVideo={videos.length}
      >
        {selectVideos?.map((video, index) => {
          if (!video) return <div key={index}>비디오를 드래그 하세요</div>;
          return (
            <ShareScreenDragItem key={video.key} id={video.key!} active={true}>
              {video}
            </ShareScreenDragItem>
          );
        })}

        {showGuide && <StLayoutGuide $guide={currentGuide} />}
      </StLayoutContainer>
    </StVideosLayoutContainer>
  );
}

const StVideosLayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 100px;
  right: 230px;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  color: white;
`;

const StPreviewContainer = styled.div<{ $isPreviewVideo: number }>`
  display: flex;
  margin: 1rem 0;
  height: ${(props) => (props.$isPreviewVideo ? "15%" : "0")};
`;

const StLayoutContainer = styled.div<{
  $currentGridLayout: GridStatusType;
  $isPreviewVideo: number;
}>`
  background: rgba(0, 0, 0, 0.8);
  width: 100%;
  height: ${(props) => (props.$isPreviewVideo ? "85%" : "95%")};
  display: grid;
  position: relative;
  ${(props) => {
    switch (props.$currentGridLayout) {
      case "edge-four":
        return "grid-template-rows: 50% 50%; grid-template-columns: 50% 50%";
      case "leftRight-two":
        return "grid-template-rows: 1fr; grid-template-columns: 50% 50%";
      case "topBottom-two":
        return "grid-template-rows: 50% 50%; grid-template-columns: 1fr";
      case "center-one":
      default:
        return "grid-template-rows: 1fr; grid-template-columns: 1fr";
    }
  }}
`;

const StLayoutGuide = styled.div<{ $guide: GuideStatusType | null }>`
  z-index: 10;
  background: rgba(122, 108, 108, 0.5);
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
