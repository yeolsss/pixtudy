import { getDmChannelMessagesReturns } from "@/api/supabase/dm";
import useMetaversePlayer from "@/hooks/metaverse/useMetaversePlayer";
import { useGetSpaceMember } from "@/hooks/query/useSupabase";
import { formatDate } from "@/utils/dateFormat";
import { Chat, ChatType } from "@/types/metaverse.types";
import { StMetaverseChatCard } from "@/components/metaverse/styles/metaverseChat.styles";
import MetaAvatar from "../../avatar/MetaAvatar";

interface Props {
  type: ChatType;
  chat?: Chat;
  message?: getDmChannelMessagesReturns;
}

export default function MetaverseChatCard({ chat, message, type }: Props) {
  const { currentUserInfo, spaceId } = useMetaversePlayer();
  const dmUserInfo = useGetSpaceMember({
    spaceId,
    userId: type === "DM" ? message?.sender_id ?? "" : chat?.playerId ?? "",
  });

  const getFormatTime = () => {
    switch (type) {
      case "DM":
        return formatDate(message?.created_at, "DM");
      case "GLOBAL":
        return formatDate(chat?.chatTime, "GLOBAL");
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
  const formatTime = getFormatTime();
  const messageContent = getMessage();

  return (
    <StMetaverseChatCard $isCurrentUser={isCurrentUser}>
      <section>
        <MetaAvatar spaceAvatar={dmUserInfo?.space_avatar} />
        <div>
          <span>
            {isCurrentUser
              ? `${dmUserInfo?.space_display_name} (나)`
              : dmUserInfo?.space_display_name}
          </span>
          <span>{formatTime}</span>
        </div>
      </section>
      <span>{messageContent}</span>
    </StMetaverseChatCard>
  );
}

MetaverseChatCard.defaultProps = {
  chat: {} as Chat,
  message: {} as getDmChannelMessagesReturns,
};
