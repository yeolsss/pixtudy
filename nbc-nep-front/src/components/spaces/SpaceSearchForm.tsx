import useDebounceSpaceSearch from "@/hooks/useDebounceSpaceSearch";
import useSpaceSearchStore from "@/zustand/spaceListStore";
import { StSearchInput } from "./styles/spaceSearchForm.styles";

export default function SpaceSearchForm() {
  const searchValue = useSpaceSearchStore.use.searchValue();
  const changeSearchValue = useSpaceSearchStore.use.changeSearchValue();
  const debounce = useDebounceSpaceSearch(500);

  return (
    <StSearchInput
      type="text"
      placeholder="스페이스를 검색해보세요"
      value={searchValue}
      onChange={(e) => {
        changeSearchValue(e.target.value);
        debounce();
      }}
    />
  );
}
