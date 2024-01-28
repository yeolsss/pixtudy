import { Chat } from "@/components/metaverse/types/metaverse";
import useMetaversePlayer from "@/hooks/metaverse/useMetaversePlayer";
import { formatDate } from "@/utils/commonUtils";
import styled from "styled-components";
import MetaAvatar from "../../avatar/MetaAvatar";

interface Props {
  chat: Chat;
}

export default function MetaverseChatCard({ chat }: Props) {
  const { currentUserInfo, findPlayerById } = useMetaversePlayer();
  const formatTime = formatDate(chat.chatTime, "GLOBAL");
  const userInfo = findPlayerById(chat.playerId);
  const isCurrentUser = chat.playerId === currentUserInfo?.playerId;

  return (
    <StMetaverseChatCard $isCurrentUser={isCurrentUser}>
      <section>
        <MetaAvatar spaceAvatar={userInfo?.character} />
        <div>
          <span>
            {isCurrentUser
              ? `${chat.playerDisplayName} (나)`
              : chat.playerDisplayName}{" "}
          </span>
          <span>{formatTime}</span>
        </div>
      </section>
      <span>{chat.message}</span>
    </StMetaverseChatCard>
  );
}

const StMetaverseChatCard = styled.div<{ $isCurrentUser: boolean }>`
  display: flex;
  flex-direction: column;

  > section {
    display: flex;
    align-items: center;
    > span {
      zoom: 0.8;
      margin-right: ${(props) => props.theme.spacing["6"]};
    }
    > div {
      display: flex;
      flex-direction: column;
      > span {
        font-size: ${(props) => props.theme.unit["12"]}px;
      }
      > span:first-child {
        color: ${(props) =>
          props.$isCurrentUser ? props.theme.color.text.brand : "inherit"};
        text-decoration: underline;
        font-weight: bold;
        margin-bottom: ${(props) => props.theme.spacing["2"]};
      }
      > span:last-child {
        font-family: var(--default-font);
      }
    }
    margin-bottom: ${(props) => props.theme.spacing["8"]};
  }
  > span:last-child {
    word-break: break-all;
    line-height: ${(props) => props.theme.spacing["20"]};
    letter-spacing: -0.32px;
    font-family: var(--default-font);
    font-size: ${(props) => props.theme.unit["16"]}px;
    margin-bottom: ${(props) => props.theme.spacing["12"]};
  }
`;
