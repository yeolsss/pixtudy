import useGetUsersCount from "@/hooks/query/useGetUsersCount";
import { Space_members } from "@/supabase/types/supabase.tables.type";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import styled from "styled-components";

interface Props {
  space: Space_members;
}

export default function SpaceCard({ space }: Props) {
  const { data: count, isLoading } = useGetUsersCount(space?.space_id!);
  const [usersCount, setUsersCount] = useState<number>(0);
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
        <StUserCounter>
          <span>{isLoading ? 0 : count}</span>
        </StUserCounter>
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
  border: 1px solid ${(props) => props.theme.color.border.secondary};
  border-radius: ${(props) => props.theme.border.radius[12]};
`;

const StContentsContainer = styled.div`
  width: 100%;
  position: relative;
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
    font-size: ${(props) => props.theme.body.lg.semibold.fontSize};
    font-weight: ${(props) => props.theme.body.lg.semibold.fontWeight};
  }
  p {
    font-family: var(--main-font);
    font-size: ${(props) => props.theme.body.sm.regular.fontSize};
  }
`;

const StUserCounter = styled.div`
  position: absolute;
  display: flex;
  gap: ${(props) => props.theme.spacing[4]};
  justify-content: center;
  align-items: center;
  top: var(--unit-8);
  right: var(--unit-20);
  padding-top: ${(props) => props.theme.spacing[4]};
  padding-bottom: ${(props) => props.theme.spacing[4]};
  padding-right: ${(props) => props.theme.spacing[8]};
  padding-left: ${(props) => props.theme.spacing[8]};
  background-color: ${(props) => props.theme.color.bg["inverse-bold"]};
  border-radius: ${(props) => props.theme.border.radius.circle};
  span {
    display: block;
    color: var(--user-counter);
    padding-top: ${(props) => props.theme.spacing[2]};
  }
  &::before {
    content: "";
    display: block;
    background-image: url("/assets/user.svg");
    background-repeat: no-repeat;
    background-size: contain;
    width: var(--unit-8);
    height: var(--unit-8);
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
