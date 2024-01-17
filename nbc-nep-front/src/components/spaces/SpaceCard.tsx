import { Space_members } from "@/types/supabase.tables.type";
import Image from "next/image";
import { useRouter } from "next/router";
import styled from "styled-components";

interface Props {
  space: Space_members;
}

export default function SpaceCard({ space }: Props) {
  const router = useRouter();
  const handleToSpace = async (space_id: string) => {
    await router.push(`/metaverse/${space_id}`);
  };
  return (
    <StCardWrapper>
      <StContentsContainer>
        <Image src="/assets/card.png" alt="card" width={300} height={160} />
        <h1>{space.spaces?.title}</h1>
        <p>{space.spaces?.description}</p>
        <span>{space.spaces?.created_at}</span>
      </StContentsContainer>
      <StButtonContainer>
        <button onClick={() => handleToSpace(space?.space_id!)}>
          입장하기
        </button>
      </StButtonContainer>
    </StCardWrapper>
  );
}

const StCardWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 300px;
  border: 1px solid ${(props) => props.theme.color.border.secondary};
  border-radius: ${(props) => props.theme.border.radius[12]};
`;

const StContentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-family: var(--sub-font);
  gap: ${(props) => props.theme.spacing[12]};
  margin-top: ${(props) => props.theme.spacing[12]};
  margin-bottom: ${(props) => props.theme.spacing[12]};
  padding: 0 ${(props) => props.theme.spacing[12]};
  img {
    width: 100%;
    margin-bottom: ${(props) => props.theme.spacing[12]};
  }
  h1 {
    font-size: ${(props) => props.theme.heading.desktop.lg.fontSize};
    font-weight: ${(props) => props.theme.heading.desktop.lg.fontWeight};
  }
  p {
    font-family: var(--main-font);
  }
`;

const StButtonContainer = styled.div`
  padding-bottom: ${(props) => props.theme.spacing[12]};
  padding-right: ${(props) => props.theme.spacing[12]};
  width: 100%;
  display: flex;
  justify-content: flex-end;
  button {
    border-color: ${(props) => props.theme.color.border.interactive.secondary};
    border-radius: ${(props) => props.theme.border.radius[8]};
  }
`;
