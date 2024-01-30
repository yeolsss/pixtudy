// 서버 사이드 렌더링을 해야 한다
// 가장 상위 top을 뽑아야 하는데 일단은 4개를 뽑아놓고...

import useModal from "@/hooks/modal/useModal";
import { Spaces } from "@/supabase/types/supabase.tables.type";
import useAuth from "@/zustand/authStore";
import { StaticImageData } from "next/image";
import Link from "next/link";
import styled from "styled-components";

interface Props {
  title: string;
  description: string;
  bgSrc: StaticImageData;
  space: Omit<Spaces, "users"> & { users: string[] };
  users: string[];
}

export default function Banner({
  title,
  description,
  bgSrc,
  space,
  users,
}: Props) {
  const { user } = useAuth();

  const isInUser = users.includes(user.id);
  const { openAvatarModal, setSpace } = useModal();

  const handleOpenModal = () => {
    setSpace(space);
    openAvatarModal();
  };

  return (
    <StBannerItem>
      {isInUser && (
        <StLink href={`/metaverse/${space.id}`} $bgSrc={bgSrc.src}>
          <StInfoWrapper>
            <StTitle>{title}</StTitle>
            <StDescription>{description}</StDescription>
          </StInfoWrapper>
        </StLink>
      )}
      {!isInUser && (
        <StButton $bgSrc={bgSrc.src} onClick={() => handleOpenModal()}>
          <StInfoWrapper>
            <StTitle>{title}</StTitle>
            <StDescription>{description}</StDescription>
          </StInfoWrapper>
        </StButton>
      )}
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

const StButton = styled.button<{ $bgSrc: string }>`
  background-image: url(${(props) => props.$bgSrc});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  box-shadow: ${(props) => props.theme.elevation.Light.shadow4};
  border: none;

  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: stretch;

  padding: 0;
`;

const StInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
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
