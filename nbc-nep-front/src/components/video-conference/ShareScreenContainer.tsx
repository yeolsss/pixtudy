import { useRef, useState } from "react";
import { useDrop } from "react-dnd";

import {
  currentLayoutIndex,
  formatGridTemplateVideos,
  getGridStyle,
} from "@/components/video-conference/libs/dnd";
import useLayout from "@/hooks/conference/useLayout";

import { GridStatusType, GuideStatusType } from "../../types/conference.types";

import ShareMediaItem from "./ShareMediaItem";
import ShareScreenDragItem from "./ShareScreenDragItem";
import { EDGE_AREA_RATE } from "./constants";
import {
  StLayoutContainer,
  StLayoutGuide,
  StNoActiveLayoutDiv,
  StPreviewContainer,
  StVideosLayoutContainer,
} from "./styles/shareScreenContainer.styles";

export default function ShareScreenContainer() {
  const {
    videos,
    countSelectVideos,
    layoutPlayerNickName,
    videosChange,
    handleCloseLayout,
    handleInactive,
  } = useLayout();

  // 현재 유저의 OS를 체크
  const isMac = /Mac/.test(navigator.userAgent);

  // 가이드 상태
  const [currentGuide, setCurrentGuide] = useState<GuideStatusType | null>(
    null
  );

  // 그리드 상태
  const [currentGrid, setCurrentGrid] = useState<GridStatusType | null>(null);

  // hover가 되었을 때 가이드의 보이는 여부 상태
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
      // 마우스 호버 아웃 체크
      if (hoverTimer.current) {
        clearTimeout(hoverTimer.current);
      }

      // 부모 컴포넌트의 좌표
      const parentRect = dropParentRef.current.getBoundingClientRect();
      // 현재 마우스 좌표
      const clientOffset = monitor.getClientOffset();
      // 부모 컴포넌트 기준 y축 좌표
      const hoverClientY = clientOffset!.y - parentRect.top;
      // 부모 컴포넌트 기준 x축 좌표
      const hoverClientX = clientOffset!.x - parentRect.left;

      // 좌측
      if (hoverClientX < EDGE_AREA_RATE) {
        if (hoverClientY < EDGE_AREA_RATE) {
          setCurrentGuide("left-top");
          setShowGuide(true);
        } else if (hoverClientY > parentRect.height - EDGE_AREA_RATE) {
          setCurrentGuide("left-bottom");
          setShowGuide(true);
        } else {
          setCurrentGuide("left");
          setShowGuide(true);
        }
      } else if (hoverClientX > parentRect.width - EDGE_AREA_RATE) {
        // 우측
        if (hoverClientY < EDGE_AREA_RATE) {
          setCurrentGuide("right-top");
          setShowGuide(true);
        } else if (hoverClientY > parentRect.height - EDGE_AREA_RATE) {
          setCurrentGuide("right-bottom");
          setShowGuide(true);
        } else {
          setCurrentGuide("right");
          setShowGuide(true);
        }
      } else if (hoverClientY < EDGE_AREA_RATE) {
        setCurrentGuide("top");
        setShowGuide(true);
      } else if (hoverClientY > parentRect.height - EDGE_AREA_RATE) {
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
      const changeGridStyle = getGridStyle(currentGuide!);
      const activeIndex = currentLayoutIndex(currentGuide!);

      // 그리드 설정 시 기존 그리드 형식과 비교하여 다를 경우 video state 초기화

      if (currentGrid !== changeGridStyle) {
        const newVideos = videos.map((video) => {
          return video.consumer.id === item.id
            ? { ...video, isActive: activeIndex }
            : { ...video, isActive: 0 };
        });
        videosChange(newVideos);

        // 그리드 변경
        setCurrentGrid(changeGridStyle);
      } else {
        const newVideos = videos.map((video) => {
          if (video.isActive === activeIndex) {
            return { ...video, isActive: 0 };
          }
          return video.consumer.id === item.id
            ? { ...video, isActive: activeIndex }
            : video;
        });
        videosChange(newVideos);
      }
    },
  });

  const inActiveVideos = videos
    .filter((video) => !video.isActive)
    .map((video) => video.consumer);

  const activeVideos = formatGridTemplateVideos(videos);

  return (
    <StVideosLayoutContainer>
      <button type="button" onClick={handleCloseLayout}>
        닫기
      </button>
      <StPreviewContainer $isPreviewVideo={!!inActiveVideos.length}>
        {inActiveVideos?.map((video) => {
          return (
            <ShareScreenDragItem key={video.id} id={video.id} active={false}>
              <ShareMediaItem
                key={video.id}
                nickname={layoutPlayerNickName}
                videoSource={video}
              />
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
        $isPreviewVideo={!!inActiveVideos.length}
      >
        {!countSelectVideos && (
          <StNoActiveLayoutDiv>
            <h4>원하는 레이아웃으로 비디오를 드래그하여 조작해보세요</h4>
            <span>
              {isMac ? "레이아웃 줌: [Cmd] + 휠" : "레이아웃 줌: [ctrl] + 휠"}
            </span>
            <span>
              {isMac
                ? "레이아웃 이동: [Cmd] + 드래그"
                : "레이아웃 이동: [ctrl] + 드래그"}
            </span>
          </StNoActiveLayoutDiv>
        )}

        {activeVideos?.map((video) => {
          if (!video) {
            return <div key="non-active video" />;
          }
          return (
            <ShareScreenDragItem
              key={video.id}
              id={video.id}
              active
              handleInactive={handleInactive}
            >
              <ShareMediaItem
                key={video.id}
                nickname={layoutPlayerNickName}
                videoSource={video}
              />
            </ShareScreenDragItem>
          );
        })}

        {showGuide && <StLayoutGuide $guide={currentGuide} />}
      </StLayoutContainer>
    </StVideosLayoutContainer>
  );
}
