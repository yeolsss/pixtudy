import { copyIcon } from "@/assets/GNB";
import useGetUsersCount from "@/hooks/query/useGetUsersCount";
import { SpaceMembers } from "@/types/supabase.tables.types";
import Image from "next/image";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import SpaceThumb from "../common/SpaceThumb";
import {
  StButtonContainer,
  StCardWrapper,
  StContentsContainer,
  StSpan,
  StUserCounter,
  StUserIcon,
} from "./styles/spaceCard.style";

interface Props {
  space: SpaceMembers | null;
}

export default function SpaceCard({ space }: Props) {
  const spaceId = space?.space_id ?? "";
  const { data: count, isLoading } = useGetUsersCount(spaceId);
  const router = useRouter();

  const handleToSpace = async () => {
    await router.push(`/metaverse/${spaceId}`);
  };

  const handleCaptureClipboard = () => {
    navigator.clipboard
      .writeText(spaceId)
      .then(() => {
        toast.success("복사에 성공했습니다!");
      })
      .catch(() => {
        toast.error("복사에 실패했습니다.");
      });
  };

  const handleScrumBoardClick = async () => {
    await router.push(`/boards/scrumboards/${spaceId}`);
  };

  return (
    <StCardWrapper>
      <StContentsContainer>
        <SpaceThumb src={space?.spaces?.space_thumb || undefined} />
        <h1>
          {space ? space.spaces?.title : "Pixtudy 가이드 방입니다."}
          <Image
            src={copyIcon}
            width={10}
            height={12}
            alt="copy code"
            onClick={handleCaptureClipboard}
          />
        </h1>
        <p>
          {space
            ? space.spaces?.description
            : "Pixtudy에 오신 것을 환영합니다."}
        </p>
        <StUserCounter>
          <StUserIcon fill={count!} />
          <StSpan $userExists={count!}>{isLoading ? 0 : count}</StSpan>
        </StUserCounter>
      </StContentsContainer>
      <StButtonContainer>
        <button
          type="button"
          className={space ? "" : "tour-tooltip-scrum-button"}
          onClick={handleScrumBoardClick}
        >
          <span />
          스크럼보드
        </button>
        <button
          type="button"
          className={space ? "" : "tour-tooltip-space-button"}
          onClick={handleToSpace}
        >
          <span />
          스페이스
        </button>
      </StButtonContainer>
    </StCardWrapper>
  );
}
