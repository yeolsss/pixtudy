import useGetUsersCount from "@/hooks/query/useGetUsersCount";
import { Space_members } from "@/types/supabase.tables.type";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import styled from "styled-components";
import UserIcon from "../common/UserIcon";

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
        <StUserCounter>
          <StUserIcon fill={count!} />
          <StSpan $userExists={count!}>{isLoading ? 0 : count}</StSpan>
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
    font-family: var(--sub-font);
    font-size: ${(props) => props.theme.heading.desktop.sm.fontSize};
    font-weight: ${(props) => props.theme.heading.desktop.sm.fontWeight};
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
  background-color: var(--button-opacity);
  border-radius: ${(props) => props.theme.border.radius.circle};
`;

const StSpan = styled.span<{ $userExists: number }>`
  display: block;
  color: ${(props) =>
    props.$userExists ? "var(--user-exists)" : "var(--user-not-exists)"};
  padding-top: ${(props) => props.theme.spacing[2]};
  font-family: var(--sub-font);
  font-size: ${(props) => props.theme.body.sm.regular.fontSize};
`;

const StUserIcon = styled(UserIcon)`
  width: var(--unit-8);
  height: var(--unit-8);
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
