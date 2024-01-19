import { useGetUserSpaces } from "@/hooks/query/useSupabase";
import { Space_members } from "@/types/supabase.tables.type";
import { useEffect, useState } from "react";
import styled from "styled-components";
import SpaceCard from "./SpaceCard";
import SpaceListHeader from "./SpaceListHeader";

interface Props {
  currentUserId: string;
}

export default function SpaceList({ currentUserId }: Props) {
  const [userSpaces, setUserSpaces] = useState<Space_members[]>([]);
  const getUserSpaces = useGetUserSpaces(currentUserId);

  useEffect(() => {
    if (getUserSpaces) setUserSpaces(getUserSpaces);
  }, [getUserSpaces]);

  return (
    <StSpaceListWrapper>
      <SpaceListHeader />
      <StSpaceList>
        {userSpaces?.map((space) => {
          return (
            <li key={space.id}>
              <SpaceCard space={space} />
            </li>
          );
        })}
      </StSpaceList>
    </StSpaceListWrapper>
  );
}

const StSpaceListWrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing[32]};
  width: 100%;
  padding-top: ${(props) => props.theme.spacing[32]};
  padding-bottom: ${(props) => props.theme.spacing[32]};
  padding-left: ${(props) => props.theme.spacing[40]};
  padding-right: ${(props) => props.theme.spacing[40]};
`;

const StSpaceList = styled.ul`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  width: 100%;
  gap: ${(props) => props.theme.spacing[24]};
  margin-right: -${(props) => props.theme.spacing[24]};
  li {
    width: calc(25% - ${(props) => props.theme.spacing[24]});
  }
`;
