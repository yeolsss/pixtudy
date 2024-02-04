import useDebounceSpaceSearch from '@/hooks/useDebounceSpaceSearch'
import useSpaceSearchStore from '@/zustand/spaceListStore'
import styled from 'styled-components'

export default function SpaceSearchForm() {
  const searchValue = useSpaceSearchStore.use.searchValue()
  const changeSearchValue = useSpaceSearchStore.use.changeSearchValue()
  const debounce = useDebounceSpaceSearch(500)

  return (
    <StSearchInput
      type="text"
      placeholder="스페이스를 검색해보세요"
      value={searchValue}
      onChange={(e) => {
        changeSearchValue(e.target.value)
        debounce()
      }}
    />
  )
}

const StSearchInput = styled.input`
  width: 400px;
  height: ${(props) => props.theme.unit[48]};
  border-radius: ${(props) => props.theme.border.radius[8]};
  border: 1px solid #d9d9d9;
  padding: ${(props) => props.theme.spacing[16]};
  outline: none;
  &:focus {
    border: 1px solid ${(props) => props.theme.color.border.focusRing};
  }
`
