import { StCreateBackDropTitle } from "@/components/scrumboard/styles/backdrop.styles";

interface Props {
  title: string;
}

export default function CreateBackDropTitle({ title }: Props) {
  return <StCreateBackDropTitle>{title}</StCreateBackDropTitle>;
}
