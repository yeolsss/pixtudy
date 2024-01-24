import { useForm } from "react-hook-form";
import styled from "styled-components";

export default function SpaceSearchForm() {
  const { register } = useForm({ mode: "onSubmit" });

  return (
    <StSearchInput
      type="text"
      placeholder="스페이스를 검색해보세요"
      {...register("searchInput")}
    />
  );
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
`;
