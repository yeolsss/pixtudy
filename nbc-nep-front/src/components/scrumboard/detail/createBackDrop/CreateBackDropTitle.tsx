import { StCreateBackDropTitle } from "../../styles/backdrop.styles";

interface Props {
  title: string;
}

export default function CreateBackDropTitle({ title }: Props) {
  return <StCreateBackDropTitle>{title}</StCreateBackDropTitle>;
}
