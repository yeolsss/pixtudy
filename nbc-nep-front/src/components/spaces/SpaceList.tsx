import { useGetUserSpaces } from "@/hooks/query/useSupabase";
import useSpaceSearch from "@/zustand/spaceListStore";
import { useEffect } from "react";
import styled from "styled-components";
import SpaceCard from "./SpaceCard";
import SpaceListHeader from "./SpaceListHeader";

interface Props {
  currentUserId: string;
}

export default function SpaceList({ currentUserId }: Props) {
  const getUserSpaces = useGetUserSpaces(currentUserId);
  const { filteredSpaces, setSpaces } = useSpaceSearch();

  useEffect(() => {
    if (getUserSpaces) {
      setSpaces(getUserSpaces);
    }
  }, [getUserSpaces]);

  return (
    <StSpaceListWrapper>
      <SpaceListHeader />
      <StSpaceList>
        {filteredSpaces?.map((space) => {
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
  margin-bottom: ${(props) => props.theme.spacing[64]};
`;

const StSpaceList = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);

  width: 100%;
  gap: ${(props) => props.theme.spacing[24]};
  margin-right: -${(props) => props.theme.spacing[24]};
  margin-bottom: 64px;
  li {
    width: 100%;
  }
`;
