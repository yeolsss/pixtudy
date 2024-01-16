import { FieldValues, UseFormRegister, useForm } from "react-hook-form";
import styled from "styled-components";

interface Props {
  register: UseFormRegister<FieldValues>;
}

function AvatarInput({ register }: Props) {
  const {
    formState: { errors },
  } = useForm();

  const options = Array.from({ length: 26 }, (_, i) => ({
    value: `NPC${i + 1}`,
    label: i + 1,
    src: `/assets/characters/presets/NPC${i + 1}.png`,
  }));
  type Inputs = {
    value: string;
  };

  return (
    <StInputContainer>
      {options.map((option, index) => (
        <div key={option.label}>
          <input
            type="radio"
            id={option.value}
            value={option.value}
            {...register("avatar", { required: "This field is required" })}
          />
          <label htmlFor={option.value} key={option.label}>
            <StSpan resource={option.src}></StSpan>
          </label>
        </div>
      ))}
      {errors.avatar && <span>{errors.avatar.message as string}</span>}
    </StInputContainer>
  );
}

export default AvatarInput;

const StInputContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  div {
    width: 64px;
    height: 64px;
    background-color: #00000016;
  }
`;

const StSpan = styled.span`
  background-image: url(${(props) => props.resource});
  display: inline-block;
  width: 32px; /* 스프라이트의 너비 */
  height: 64px; /* 스프라이트의 높이 */
  background-repeat: no-repeat;
  background-position: 0px 0px; /* 첫 번째 스프라이트의 위치 */
  margin-right: 10px; /* 라벨 간 간격 조정 */
  cursor: pointer;
`;
