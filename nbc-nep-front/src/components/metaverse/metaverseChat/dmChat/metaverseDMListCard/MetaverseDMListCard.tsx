import MetaAvatar from "@/components/metaverse/avatar/MetaAvatar";
import { DMListCard } from "@/components/metaverse/types/metaverse";
import useMetaversePlayer from "@/hooks/metaverse/useMetaversePlayer";
import useDmStore from "@/zustand/dmStore";
import styled from "styled-components";

interface Props {
  dm: DMListCard;
}
export default function MetaverseDMListCard({ dm }: Props) {
  const { id, spaceId } = useMetaversePlayer();
  const openDm = useDmStore.use.openDm();
  const {
    room_id,
    message,
    sender_id,
    sender_avatar,
    sender_display_name,
    receiver_id,
    receiver_avatar,
    receiver_display_name,
    unread_count,
  } = dm;

  const otherUserId = id === sender_id ? receiver_id : sender_id;
  const otherUserAvatar = id === sender_id ? receiver_avatar : sender_avatar;
  const otherUserName =
    id === sender_id ? receiver_display_name : sender_display_name;

  const handleOnClickOpenDMChat = () => {
    openDm({
      isOpen: true,
      dmRoomId: room_id,
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
      {unread_count > 0 && (
        <StUnreadCount>
          <span>{unread_count}</span>
        </StUnreadCount>
      )}
    </StMetaverseDMCardWrapper>
  );
}

const StMetaverseDMCardWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing["6"]};
  height: ${({ theme }) => theme.spacing["80"]};
  span {
    color: ${({ theme }) => theme.color.text.interactive.inverse};
    font-size: ${({ theme }) => theme.body.lg.regular.fontSize};
  }
  &:hover {
    box-shadow: ${({ theme }) => theme.elevation.Dark.shadow8};
  }
  cursor: pointer;
`;

const StMetaverseAvatarWrapper = styled.div`
  width: ${({ theme }) => theme.spacing["32"]};
  height: ${({ theme }) => theme.spacing["32"]};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StMetaverseDMCard = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: ${({ theme }) => theme.spacing["6"]};
  font-family: ${({ theme }) => theme.body.lg.regular.fontFamily};
  width: ${(props) => props.theme.unit["112"]};

  > span {
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  > span:first-child {
    font-size: ${(props) => props.theme.unit["14"]};
    font-weight: bold;
    margin-bottom: ${(props) => props.theme.spacing["6"]};
  }

  > span:last-child {
    font-size: ${(props) => props.theme.unit["12"]};
  }
`;

const StUnreadCount = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: ${({ theme }) => theme.spacing["8"]};
  right: ${({ theme }) => theme.spacing["12"]};
  width: ${(props) => props.theme.unit["20"]};
  height: ${(props) => props.theme.unit["20"]};
  border-radius: ${({ theme }) => theme.border.radius["circle"]};
  background-color: ${({ theme }) => theme.color.bg.primary};

  > span {
    font-size: ${({ theme }) => theme.body.sm.regular.fontSize};
    color: ${({ theme }) => theme.color.text.primary} !important;
    font-weight: bold;
  }
`;
