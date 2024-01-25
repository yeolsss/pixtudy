import { useGetCategories } from "@/hooks/query/useSupabase";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { options } from "../constants/constants";

interface Props {
  name: string;
  color: string;
}

export default function CategoryForm({ name, color }: Props) {
  const { space_id } = useParams();
  const spaceId = space_id as string;
  const categories = useGetCategories(spaceId);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  // TODO 내일 할일
  return (
    <form>
      <select defaultValue={color} {...register("color")}>
        {options?.map((option, idx) => {
          return (
            <StOption $color={option} key={idx} value={option.color}>
              {option.name}
            </StOption>
          );
        })}
      </select>
      <input type="text" defaultValue={name} {...register("name")} />
    </form>
  );
}

const StOption = styled.option<{ category: string }>``;
