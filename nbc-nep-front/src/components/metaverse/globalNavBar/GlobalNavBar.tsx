import styled from "styled-components";
import React from "react";
import GlobalNavBarIconWrapper from "@/components/metaverse/globalNavBar/globalNavBarIconWrapper/GlobalNavBarIconWrapper";

export default function GlobalNavBar() {
  return (
    <StGlobalNavBar>
      <StTopIcon>
        <StHomeLink href="/dashboard">홈</StHomeLink>
      </StTopIcon>
      <GlobalNavBarIconWrapper />
    </StGlobalNavBar>
  );
}

const StGlobalNavBar = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 100px;
  min-width: 100px;
  justify-content: space-between;
  background-color: #1f2542;
  padding: 60px 0;
`;
const StHomeLink = styled.a`
  font-size: 24px;
  color: #fff;
  cursor: pointer;
  text-decoration: none;
`;

const StTopIcon = styled.div``;
