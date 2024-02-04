import { useGetUserSpaces } from '@/hooks/query/useSupabase'
import useAuthStore from '@/zustand/authStore'
import useSpaceSearchStore from '@/zustand/spaceListStore'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import styled from 'styled-components'
import SpaceCard from './SpaceCard'
import SpaceListHeader from './SpaceListHeader'

interface Props {
  currentUserId: string
  setRunState: (isRun: boolean) => void
  showTemporaryComponent: boolean
}

export default function SpaceList({
  currentUserId,
  setRunState,
  showTemporaryComponent
}: Props) {
  const getUserSpaces = useGetUserSpaces(currentUserId)
  const spaces = useSpaceSearchStore.use.spaces()
  const setSpaces = useSpaceSearchStore.use.setSpaces()
  const filteredSpaces = useSpaceSearchStore.use.filteredSpaces()
  const router = useRouter()
  const user = useAuthStore.use.user()

  useEffect(() => {
    if (getUserSpaces) {
      const query = router.query.query
      if (query === 'myspace') {
        setSpaces(
          getUserSpaces.filter((space) => space.spaces?.owner === user.id)
        )
        return
      }
      setSpaces(getUserSpaces)
      if (!getUserSpaces.length) {
        setRunState(true)
      }
    }
  }, [getUserSpaces, router.query.query])

  useEffect(() => {
    if (showTemporaryComponent) {
      setSpaces([null])
    } else {
      if (!!spaces.length) {
        if (!spaces[0]) {
          const [drop, ...newSpaces] = spaces
          setSpaces(newSpaces)
        }
      }
    }
  }, [showTemporaryComponent])

  return (
    <StCardListWrapper>
      <SpaceListHeader />
      <StSpaceList>
        {filteredSpaces?.map((space, index) => {
          return (
            <li key={space ? space.id : index}>
              <SpaceCard space={space ? space : null} />
            </li>
          )
        })}
      </StSpaceList>
    </StCardListWrapper>
  )
}

export const StCardListWrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing[32]};
  width: 100%;
  padding-top: ${(props) => props.theme.spacing[32]};
  padding-bottom: ${(props) => props.theme.spacing[32]};
  padding-left: ${(props) => props.theme.spacing[40]};
  padding-right: ${(props) => props.theme.spacing[40]};
  margin-bottom: ${(props) => props.theme.spacing[64]};
`

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
`
