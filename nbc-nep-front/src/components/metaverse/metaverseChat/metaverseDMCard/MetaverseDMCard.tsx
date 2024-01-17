import { DMListCard } from "@/types/metaverse";
import { usePlayerContext } from "@/context/MetaversePlayerProvider";
import MetaAvatar from "@/components/metaverse/avatar/MetaAvatar";
import styled from "styled-components";
import MetaverseDmContainer from "@/components/metaverse/metaversePlayerList/metaverseDmContainer/MetaverseDmContainer";
import { useAppSelector } from "@/hooks/useReduxTK";

interface Props {
  dm: DMListCard;
}
export default function MetaverseDmCard({ dm }: Props) {
  const { isOpen, dmRoomId } = useAppSelector((state) => state.dm);
  const { id, spaceId } = usePlayerContext();
  const {
    message_id,
    message,
    created_at,
    sender_id,
    sender_username,
    sender_avatar,
    receiver_id,
    receiver_username,
    receiver_avatar,
    unread_count,
  } = dm;

  const otherUserId = id === sender_id ? receiver_id : sender_id;
  const otherUserName = id === sender_id ? receiver_username : sender_username;
  const otherUserAvatar = id === sender_id ? receiver_avatar : sender_avatar;

  const handleOnClickOpenDMChat = () => {};

  return (
    <StMetaverseDMCardWrapper onClick={handleOnClickOpenDMChat}>
      <StMetaverseAvatarWrapper>
        <MetaAvatar spaceAvatar={otherUserAvatar} />
      </StMetaverseAvatarWrapper>
      <StMetaverseDMCard>
        <div>
          <span>보낸사람 : </span>
          <span>{otherUserName}</span>
        </div>
        <div>
          <span>{message}</span>
        </div>
      </StMetaverseDMCard>
      {unread_count > 0 && (
        <StUnreadCount>
          <span>{unread_count}</span>
        </StUnreadCount>
      )}
      <MetaverseDmContainer
        otherUserId={otherUserId}
        // handleCloseDmContainer={handleCloseDmContainer}
        spaceId={spaceId}
      />
    </StMetaverseDMCardWrapper>
  );
}

const StMetaverseDMCardWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing["12"]};
  gap: ${({ theme }) => theme.spacing["12"]};
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
  justify-content: center;
  padding: ${({ theme }) => theme.spacing["8"]};
  font-family: ${({ theme }) => theme.body.lg.regular.fontFamily};
  width: 158px;

  > div:first-child {
    margin-bottom: ${({ theme }) => theme.spacing["8"]};
    > span {
      font-size: 12px;
    }
  }

  > div:last-child {
    > span {
      padding: 5px;
      display: block;
      max-width: 100%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
`;

const StUnreadCount = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: ${({ theme }) => theme.spacing["8"]};
  right: ${({ theme }) => theme.spacing["12"]};
  background-color: ${({ theme }) => theme.color.bg.primary};
  width: 20px;
  height: 20px;
  border-radius: ${({ theme }) => theme.border.radius["circle"]};

  > span {
    margin-top: 4px;
    font-size: ${({ theme }) => theme.body.sm.regular.fontSize};
    color: ${({ theme }) => theme.color.text.primary};
    font-weight: ${({ theme }) => theme.body.sm.medium.fontWeight};
  }
`;
