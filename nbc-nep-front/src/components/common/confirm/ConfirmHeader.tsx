interface Props {
  title?: string;
}

export default function ConfirmHeader({ title = "확인" }: Props) {
  return <div>{title}</div>;
}

ConfirmHeader.defaultProps = {
  title: "확인",
};
