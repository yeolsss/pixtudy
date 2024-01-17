import { PropsWithChildren, useRef, useState } from "react";
import { useDrop } from "react-dnd";
import styled from "styled-components";
import {
  currentLayoutIndex,
  formatGridTemplateVideos,
  getGridStyle,
} from "./lib/dnd";
import {
  GridStatusType,
  GuideStatusType,
  LayoutConsumersType,
  VideoSource,
} from "./types/ScreenShare.types";
import ShareScreenDragItem from "./ShareScreenDragItem";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxTK";
import { layoutClose } from "@/redux/modules/layoutSlice";
import useVideoSource from "@/hooks/conference/useVideoSource";
import { splitVideoSource } from "./lib/util";
import ShareMediaItem from "./ShareMediaItem";
import { useEffect } from "react";

const EDGE_AREA_RATE = 220;

export default function ShareScreenContainer({}) {
  // 비디오 상태관리
  const dispatch = useAppDispatch();

  const layoutVideoInfo = useAppSelector((state) => state.layoutSlice);

  const { consumers } = useVideoSource();
  const filteredConsumers = consumers.filter(
    (consumer) => consumer.appData.playerId === layoutVideoInfo.layoutPlayerId
  );

  const [_, screenConsumers] = splitVideoSource(filteredConsumers);

  // 유저의 화면공유 전체
  const otherUserVideos = screenConsumers.map((consumer) => {
    return { consumer, isActive: 0 };
  });

  const [videos, setVideos] = useState<LayoutConsumersType[]>(otherUserVideos);
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

  useEffect(() => {
    setVideos(otherUserVideos);
  }, [consumers, layoutVideoInfo]);

  // active 상태인 아이템을 클릭 시 inactive 상태로
  const handleInactive = (id: string) => {
    setVideos((prev) =>
      prev.map((video) =>
        video.consumer.id === id ? { ...video, isActive: 0 } : video
      )
    );
  };

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
        setVideos((prev) => {
          return prev.map((video) => {
            return video.consumer.id === item.id
              ? { ...video, isActive: activeIndex }
              : { ...video, isActive: 0 };
          }) as LayoutConsumersType[];
        });
        // 그리드 변경
        setCurrentGrid(changeGridStyle);
      } else {
        setVideos((prev) =>
          prev.map((video) => {
            if (video.isActive === activeIndex) {
              return { ...video, isActive: 0 };
            } else {
              return video.consumer.id === item.id
                ? { ...video, isActive: activeIndex }
                : video;
            }
          })
        );
      }
    },
  });

  const countSelectVideos = videos.reduce((acc, val) => {
    if (!!val.isActive) return acc + 1;
    else return acc;
  }, 0);

  const handleCloseLayout = () => {
    dispatch(layoutClose());
  };

  const inActiveVideos = videos
    .filter((video) => !video.isActive)
    .map((video) => video.consumer);

  const activeVideos = formatGridTemplateVideos(videos);

  return (
    <StVideosLayoutContainer>
      <button onClick={handleCloseLayout}>닫기</button>
      <StPreviewContainer $isPreviewVideo={!!inActiveVideos.length}>
        {inActiveVideos?.map((video) => {
          return (
            <ShareScreenDragItem key={video.id} id={video.id} active={false}>
              <ShareMediaItem
                key={video.id}
                nickname={layoutVideoInfo.layoutPlayerNickName}
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
            <span>원하는 레이아웃으로 비디오를 드래그하세요</span>
          </StNoActiveLayoutDiv>
        )}

        {activeVideos?.map((video, index) => {
          if (!video) return <div key={index} />;
          return (
            <ShareScreenDragItem
              key={video.id}
              id={video.id}
              active={true}
              handleInactive={handleInactive}
            >
              {
                <ShareMediaItem
                  key={video.id}
                  nickname={layoutVideoInfo.layoutPlayerNickName}
                  videoSource={video}
                />
              }
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
  justify-content: flex-end;
  position: fixed;
  top: 0;
  left: 68px;
  right: 230px;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  & > button {
    position: absolute;
    right: 1rem;
    top: 1rem;
  }
`;

const StNoActiveLayoutDiv = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 2rem;
  font-weight: bold;
`;
const StPreviewContainer = styled.div<{ $isPreviewVideo: boolean }>`
  display: flex;
  margin: ${(props) => (props.$isPreviewVideo ? "1rem" : "0")};
  height: ${(props) => (props.$isPreviewVideo ? "15%" : "7%")};
`;

const StLayoutContainer = styled.div<{
  $currentGridLayout: GridStatusType;
  $isPreviewVideo: boolean;
}>`
  background: rgba(0, 0, 0, 0.8);
  width: 100%;
  height: 100%;
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
