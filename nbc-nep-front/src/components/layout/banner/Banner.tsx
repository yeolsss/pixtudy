// 서버 사이드 렌더링을 해야 한다
// 가장 상위 top을 뽑아야 하는데 일단은 4개를 뽑아놓고...

import useModal from "@/hooks/modal/useModal";
import { useGetUserSpaces } from "@/hooks/query/useSupabase";
import { Spaces } from "@/supabase/types/supabase.tables.type";
import useAuth from "@/zustand/authStore";
import { StaticImageData } from "next/image";
import { useRouter } from "next/router";
import styled from "styled-components";

interface Props {
  title: string;
  description: string;
  bgSrc: StaticImageData;
  space: Spaces;
}

export default function Banner({ title, description, bgSrc, space }: Props) {
  const { user } = useAuth();
  const spaceMembers = useGetUserSpaces(user.id);
  const { openAvatarModal, setSpace } = useModal();
  const { push } = useRouter();

  const handleClickBanner = () => {
    const isInUser = !!spaceMembers?.find(
      ({ space_id }) => space_id === space.id
    );

    if (!isInUser) {
      setSpace(space);
      openAvatarModal();
      return;
    }

    push(`/metaverse/${space.id}`);
  };

  return (
    <StBannerItem>
      <StButton $bgSrc={bgSrc.src} onClick={handleClickBanner}>
        <StInfoWrapper>
          <StTitle>{title}</StTitle>
          <StDescription>{description}</StDescription>
        </StInfoWrapper>
      </StButton>
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
