import React from "react";
import styled from "styled-components";
import IconButtonWrapper from "@/components/metaverse/globalNavBar/globalNavBarIconWrapper/iconButton/IconButtonWrapper";
import chartIcon from "@/assets/icons/Chart.png";
import SettingsIcon from "@/assets/icons/Setting.png";
import avatorIcon from "@/assets/icons/avator.png";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxTK";
import { setIsSomeSection } from "@/redux/modules/globalNavBarSlice";

export default function GlobalNavBarIconWrapper() {
  const dispatch = useAppDispatch();
  const { chatSection, settingsSection } = useAppSelector(
    (state) => state.globalNavBar
  );
  const buttons = [
    {
      buttonImage: chartIcon,
      description: "채팅",
      handleOnClick: () => {
        const newIsSomeSection = {
          chatSection: !chatSection,
          settingsSection: false,
        };
        dispatch(setIsSomeSection(newIsSomeSection));
      },
    },
    {
      buttonImage: SettingsIcon,
      description: "설정",
      handleOnClick: () => {},
    },
    {
      buttonImage: chartIcon,
      description: "오류제보",
      handleOnClick: () => {},
    },
    {
      buttonImage: avatorIcon,
      description: "",
      handleOnClick: () => {},
    },
  ];
  return (
    <StBottomIconWrapper>
      {buttons.map((button, index) => (
        <IconButtonWrapper key={button.description + index} button={button} />
      ))}
    </StBottomIconWrapper>
  );
}
const StBottomIconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 50%;
`;
