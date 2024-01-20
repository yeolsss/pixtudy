import MetaversePlayerCard from "@/components/metaverse/metaversePlayerList/MetaversePlayerCard";
import { usePlayerContext } from "@/context/MetaversePlayerProvider";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxTK";
import styled from "styled-components";
import { setIsOpenDm } from "@/redux/modules/dmSlice";
import {
  setIsCloseSomeSection,
  setIsSomeSection,
} from "@/redux/modules/globalNavBarSlice";
import { setIsOpenChat } from "@/redux/modules/chatTypeSlice";
import { ChatType } from "@/components/metaverse/types/ChatType";
import MetaverseChatHeader from "@/components/metaverse/metaverseChat/metaverseChatBar/MetaverseChatHeader";
import React from "react";

export interface HandleOpenDmContainerPrams {
  otherUserId: string;
  otherUserName: string;
  otherUserAvatar: string;
}

export default function MetaversePlayerList() {
  const dispatch = useAppDispatch();
  const isOpenPlayerList = useAppSelector(
    (state) => state.globalNavBar.playerList
  );

  const { playerList } = usePlayerContext();
  const { spaceId } = usePlayerContext();

  // dm 채팅방 열기
  const handleOpenDmContainer = ({
    otherUserId,
    otherUserName,
    otherUserAvatar,
  }: HandleOpenDmContainerPrams) => {
    const newIsSomeSection = {
      chatSection: true,
      settingsSection: false,
      playerList: false,
    };

    dispatch(setIsSomeSection(newIsSomeSection));
    const newIsOpenChat = {
      isOpenChat: true,
      chatType: "DM" as ChatType,
    };
    dispatch(setIsOpenChat(newIsOpenChat));
    const newOpenDm = {
      isOpen: true,
      dmRoomId: "",
      otherUserId,
      spaceId,
      otherUserName,
      otherUserAvatar,
    };
    dispatch(setIsOpenDm(newOpenDm));
  };

  const handleOnClickClosePlayerList = () => {
    dispatch(setIsCloseSomeSection());
  };

  return (
    <>
      <StMetaversePlayerListWrapper $isOpenPlayerList={isOpenPlayerList}>
        {isOpenPlayerList && (
          <MetaverseChatHeader
            title={"Player List"}
            handler={handleOnClickClosePlayerList}
          />
        )}
        {isOpenPlayerList &&
          playerList?.map((player) => (
            <MetaversePlayerCard
              key={player.playerId}
              player={player}
              handleOpenDmContainer={handleOpenDmContainer}
            />
          ))}
      </StMetaversePlayerListWrapper>
    </>
  );
}

const StMetaversePlayerListWrapper = styled.div<{ $isOpenPlayerList: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: ${({ $isOpenPlayerList }) => ($isOpenPlayerList ? "240px" : "0")};
  padding: ${({ $isOpenPlayerList }) => ($isOpenPlayerList ? "10px" : "0")};
  overflow: ${({ $isOpenPlayerList }) =>
    $isOpenPlayerList ? "scroll" : "hidden"};
  transition:
    width 0.3s ease-in-out,
    transform 0.3s ease-in-out;
  z-index: ${({ $isOpenPlayerList }) => ($isOpenPlayerList ? "100" : "-1")};
  background-color: ${({ theme }) => theme.color.metaverse.secondary};
  color: white;

  &::-webkit-scrollbar {
    display: none;
  }
`;
