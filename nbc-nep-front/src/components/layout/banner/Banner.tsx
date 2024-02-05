import useModal from "@/hooks/modal/useModal";
import { useGetUserSpaces } from "@/hooks/query/useSupabase";
import { Spaces } from "@/types/supabase.tables.types";
import useAuthStore from "@/zustand/authStore";
import { StaticImageData } from "next/image";
import { useRouter } from "next/router";
import {
  StBannerItem,
  StButton,
  StDescription,
  StInfoWrapper,
  StTitle,
} from "../styles/banner.styles";

interface Props {
  title: string;
  description: string;
  bgSrc: StaticImageData;
  space: Spaces;
}

export default function Banner({ title, description, bgSrc, space }: Props) {
  const user = useAuthStore.use.user();
  const spaceMembers = useGetUserSpaces(user.id);
  const { openAvatarModal, setSpace } = useModal();
  const { push } = useRouter();

  const handleClickBanner = () => {
    const isInUser = !!spaceMembers?.find(
      ({ space_id: spaceId }) => spaceId === space.id
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
