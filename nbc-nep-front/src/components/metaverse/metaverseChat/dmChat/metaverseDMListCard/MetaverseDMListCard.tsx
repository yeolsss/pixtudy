import MetaAvatar from "@/components/metaverse/avatar/MetaAvatar";
import useMetaversePlayer from "@/hooks/metaverse/useMetaversePlayer";
import useDmStore from "@/zustand/dmStore";
import { DMListCard } from "@/types/metaverse.types";
import {
  StMetaverseAvatarWrapper,
  StMetaverseDMCard,
  StMetaverseDMCardWrapper,
  StUnreadCount,
} from "@/components/metaverse/styles/metaverseDm.styles";

interface Props {
  dm: DMListCard;
}
export default function MetaverseDMListCard({ dm }: Props) {
  const { id, spaceId } = useMetaversePlayer();
  const openDm = useDmStore.use.openDm();
  const {
    room_id: roomId,
    message,
    sender_id: senderId,
    sender_avatar: senderAvatar,
    sender_display_name: senderDisplayName,
    receiver_id: receiverId,
    receiver_avatar: receiverAvatar,
    receiver_display_name: receiverDisplayName,
    unread_count: unreadCount,
  } = dm;

  const otherUserId = id === senderId ? receiverId : senderId;
  const otherUserAvatar = id === senderId ? receiverAvatar : senderAvatar;
  const otherUserName =
    id === senderId ? receiverDisplayName : senderDisplayName;

  const handleOnClickOpenDMChat = () => {
    openDm({
      isOpen: true,
      dmRoomId: roomId,
      otherUserId,
      spaceId,
      otherUserName,
      otherUserAvatar,
    });
  };

  return (
    <StMetaverseDMCardWrapper onClick={handleOnClickOpenDMChat}>
      <StMetaverseAvatarWrapper>
        <MetaAvatar spaceAvatar={otherUserAvatar} />
      </StMetaverseAvatarWrapper>
      <StMetaverseDMCard>
        <span>{otherUserName}</span>
        <span>{message}</span>
      </StMetaverseDMCard>
      {unreadCount > 0 && (
        <StUnreadCount>
          <span>{unreadCount}</span>
        </StUnreadCount>
      )}
    </StMetaverseDMCardWrapper>
  );
}
