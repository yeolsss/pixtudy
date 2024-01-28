import { getDmChannelMessagesReturns } from "@/api/supabase/dm";
import { Chat } from "@/components/metaverse/types/metaverse";
import useMetaversePlayer from "@/hooks/metaverse/useMetaversePlayer";
import { formatDate } from "@/utils/commonUtils";
import styled from "styled-components";
import MetaAvatar from "../../avatar/MetaAvatar";
import { ChatType } from "../../types/ChatType";

interface Props {
  type: ChatType;
  chat?: Chat;
  message?: getDmChannelMessagesReturns;
}

export default function MetaverseChatCard({ chat, message, type }: Props) {
  const { currentUserInfo, findPlayerById } = useMetaversePlayer();

  const getUserInfo = () => {
    switch (type) {
      case "DM":
        return findPlayerById(message?.sender_id!);
      case "GLOBAL":
        return findPlayerById(chat?.playerId!);
    }
  };

  const getFormatTime = () => {
    switch (type) {
      case "DM":
        return formatDate(message?.created_at!, "DM");
      case "GLOBAL":
        return formatDate(chat?.chatTime!, "GLOBAL");
      default:
        return "";
    }
  };

  const getIsCurrentUser = () => {
    switch (type) {
      case "DM":
        return message?.sender_id === currentUserInfo?.playerId;
      case "GLOBAL":
        return chat?.playerId === currentUserInfo?.playerId;
      default:
        return false;
    }
  };

  const getMessage = () => {
    switch (type) {
      case "DM":
        return message?.message;
      case "GLOBAL":
        return chat?.message;
      default:
        return "";
    }
  };

  const isCurrentUser = getIsCurrentUser()!;
  const userInfo = getUserInfo();
  const formatTime = getFormatTime();
  const messageContent = getMessage();

  return (
    <StMetaverseChatCard $isCurrentUser={isCurrentUser}>
      <section>
        <MetaAvatar spaceAvatar={userInfo?.character} />
        <div>
          <span>
            {isCurrentUser ? `${userInfo?.nickname} (나)` : userInfo?.nickname}
          </span>
          <span>{formatTime}</span>
        </div>
      </section>
      <span>{messageContent}</span>
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
