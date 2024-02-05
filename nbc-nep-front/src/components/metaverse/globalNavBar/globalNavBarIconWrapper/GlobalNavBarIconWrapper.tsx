import React from "react";
import IconButtonWrapper from "@/components/metaverse/globalNavBar/globalNavBarIconWrapper/iconButton/IconButtonWrapper";
import IconButtonByPlayerList from "@/components/metaverse/globalNavBar/globalNavBarIconWrapper/iconButton/IconButtonByPlayerList";
import useGNBIconButtons from "@/hooks/GNB/useGNBIconButtons";
import { StBottomIconWrapper } from "@/components/metaverse/styles/metaverse.styles";

export default function GlobalNavBarIconWrapper() {
  const buttons = useGNBIconButtons();
  return (
    <StBottomIconWrapper>
      {buttons.map((button) => {
        if (button.type !== "playerList") {
          return <IconButtonWrapper key={button.description} button={button} />;
        }
        return (
          <IconButtonByPlayerList key={button.description} button={button} />
        );
      })}
    </StBottomIconWrapper>
  );
}
