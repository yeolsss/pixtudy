import React from "react";
import styled from "styled-components";
import IconButtonWrapper from "@/components/metaverse/globalNavBar/globalNavBarIconWrapper/iconButton/IconButtonWrapper";
import chartIcon from "@/assets/icons/Comments.svg";
import SettingsIcon from "@/assets/icons/Cog.svg";
import avatorIcon from "@/assets/icons/Users.svg";
import reportIcon from "@/assets/icons/User Headset.svg";
import { setIsSomeSection } from "@/redux/modules/globalNavBarSlice";
import { setIsOpenChat } from "@/redux/modules/chatTypeSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxTK";
import { ChatType } from "@/components/metaverse/metaverseChat/types/ChatType";
import { IconButtonProperty } from "@/components/metaverse/globalNavBar/globalNavBarIconWrapper/iconButton/types/iconButtonTypes";
import IconButtonByPlayerList from "@/components/metaverse/globalNavBar/globalNavBarIconWrapper/iconButton/IconButtonByPlayerList";

export default function GlobalNavBarIconWrapper() {
  const dispatch = useAppDispatch();
  const { chatSection, settingsSection, playerList } = useAppSelector(
    (state) => state.globalNavBar
  );

  let updateIsChatSection = {
    chatSection: false,
    settingsSection: false,
    playerList: false,
  };

  const buttons: IconButtonProperty[] = [
    {
      buttonImage: chartIcon,
      description: "채팅",
      type: "chat",
      handleOnClick: () => {
        updateIsChatSection = {
          chatSection: !chatSection,
          settingsSection: false,
          playerList: false,
        };
        dispatch(setIsSomeSection(updateIsChatSection));
        const updateIsOpenChat = {
          isOpenChat: !chatSection,
          chatType: "GLOBAL" as ChatType,
        };
        dispatch(setIsOpenChat(updateIsOpenChat));
      },
    },
    {
      buttonImage: SettingsIcon,
      description: "설정",
      type: "settings",
      handleOnClick: () => {},
    },
    {
      buttonImage: reportIcon,
      description: "오류제보",
      type: "report",
      handleOnClick: () => {},
    },
    {
      buttonImage: avatorIcon,
      description: "접속자 정보",
      type: "playerList",
      handleOnClick: () => {
        const updateIsOpenChat = {
          isOpenChat: false,
          chatType: "GLOBAL" as ChatType,
        };
        dispatch(setIsOpenChat(updateIsOpenChat));
        updateIsChatSection = {
          chatSection: false,
          settingsSection: false,
          playerList: !playerList,
        };
        dispatch(setIsSomeSection(updateIsChatSection));
      },
    },
  ];
  return (
    <StBottomIconWrapper>
      {buttons.map((button, index) => {
        if (button.type !== "playerList") {
          return (
            <IconButtonWrapper
              key={button.description + index}
              button={button}
            />
          );
        } else {
          return (
            <IconButtonByPlayerList
              key={button.description + index}
              button={button}
            />
          );
        }
      })}
    </StBottomIconWrapper>
  );
}
const StBottomIconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 287px;
  width: 44px;
`;
