import HomeIcon from "@/assets/icons/LogoSection.svg";
import CloseButton from "@/components/metaverse/globalNavBar/CloseButton";
import GlobalNavBarIconWrapper from "@/components/metaverse/globalNavBar/globalNavBarIconWrapper/GlobalNavBarIconWrapper";
import Image from "next/image";
import styled from "styled-components";

export default function GlobalNavBar() {
  return (
    <StGlobalNavBar>
      <StHomeLink href="/dashboard">
        <Image src={HomeIcon} alt={"홈 버튼"} width={24} height={24} />
      </StHomeLink>
      <div>
        <GlobalNavBarIconWrapper />
        <CloseButton />
      </div>
    </StGlobalNavBar>
  );
}

const StGlobalNavBar = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 68px;
  justify-content: space-between;
  padding: 32px 12px 24px;
  border-right: 1px solid rgba(0, 0, 0, 0.5);
  background-color: ${({ theme }) => theme.color.metaverse.primary};
  color: ${({ theme }) => theme.color.icon.interactive.primary};
`;

const StHomeLink = styled.a`
  display: flex;

  font-size: 24px;
  color: #fff;
  cursor: pointer;
  text-decoration: none;
  width: 44px;
  height: 44px;
  background-color: ${({ theme }) => theme.color.bg.primary};
  justify-content: center;
  align-items: center;
  border-radius: ${({ theme }) => theme.border.radius[16]};
`;
