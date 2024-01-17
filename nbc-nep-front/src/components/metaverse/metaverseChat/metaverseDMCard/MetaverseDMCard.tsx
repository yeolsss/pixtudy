import { DMListCard } from "@/types/metaverse";
import { usePlayerContext } from "@/context/MetaversePlayerProvider";
import MetaAvatar from "@/components/metaverse/avatar/MetaAvatar";
import styled from "styled-components";

interface Props {
  dm: DMListCard;
}
export default function MetaverseDmCard({ dm }: Props) {
  const { id } = usePlayerContext();
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

  const otherUserName = id === sender_id ? receiver_username : sender_username;
  const otherUserAvatar = id === sender_id ? receiver_avatar : sender_avatar;

  return (
    <StMetaverseDMCardWrapper>
      <MetaAvatar spaceAvatar={otherUserAvatar} />
      <StMetaverseDMCard>
        <div>
          <span>보낸사람 : </span>
          <span>{otherUserName}</span>
        </div>
        <div>
          <span>{message}</span>
        </div>
      </StMetaverseDMCard>
    </StMetaverseDMCardWrapper>
  );
}

const StMetaverseDMCardWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: ${({ theme }) => theme.spacing["12"]};
  gap: ${({ theme }) => theme.spacing["12"]};
  height: ${({ theme }) => theme.spacing["48"]};
  span {
    color: ${({ theme }) => theme.color.text.interactive.inverse};
    font-size: ${({ theme }) => theme.body.lg.regular.fontSize};
  }
`;

const StMetaverseDMCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  > div:first-child {
    margin-bottom: ${({ theme }) => theme.spacing["8"]};
  }
`;
