// 서버 사이드 렌더링을 해야 한다
// 가장 상위 top을 뽑아야 하는데 일단은 4개를 뽑아놓고...

import Link from "next/link";
import styled from "styled-components";

interface Props {
  title: string;
  description: string;
  bgSrc: string;
  spaceId: string;
}

export default function Banner({ title, description, bgSrc, spaceId }: Props) {
  return (
    <StBannerItem>
      <StLink href={`/metaverse/${spaceId}`} $bgSrc={bgSrc}>
        <StInfoWrapper>
          <StTitle>{title}</StTitle>
          <StDescription>{description}</StDescription>
        </StInfoWrapper>
      </StLink>
    </StBannerItem>
  );
}

const StBannerItem = styled.li`
  width: 420px;
  height: 233px;
  border-radius: ${(props) => props.theme.border.radius[12]};
  border: 1px solid ${(props) => props.theme.color.border.secondary};
  overflow: hidden;
`;

const StLink = styled(Link)<{ $bgSrc: string }>`
  background-image: url(${(props) => props.$bgSrc});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  box-shadow: ${(props) => props.theme.elevation.Light.shadow4};

  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const StInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.unit[8]};

  background-color: ${(props) => props.theme.color.base.white};
  padding: ${(props) =>
    `${props.theme.spacing[16]} ${props.theme.spacing[12]}`};
  * {
    color: ${(props) =>
      props.theme.color.text.interactive["secondary-pressed"]};
  }
`;

const StTitle = styled.h2`
  font-family: var(--sub-font);
  font-weight: 400;
  font-size: 20px;
  line-height: 30px;
`;

const StDescription = styled.p`
  font-family: var(--default-font);
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
`;
