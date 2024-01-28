import CloseIcon from "@/assets/icons/Times.svg";
import Image from "next/image";
import styled from "styled-components";

interface Props {
  title: string;
  handler: () => void;
}
export default function MetaverseChatHeader({ title, handler }: Props) {
  return (
    <StMetaverseDmHeader>
      <h1>{title}</h1>
      <button onClick={handler}>
        <Image src={CloseIcon} alt="close" width={12} height={12} />
      </button>
    </StMetaverseDmHeader>
  );
}

const StMetaverseDmHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  > h1 {
    font-size: ${(props) => props.theme.unit["20"]}px;
    font-family: var(--point-font);
    font-weight: bold;
    color: ${({ theme }) => theme.color.text.interactive.inverse};
    white-space: nowrap;
    margin-bottom: ${(props) => props.theme.spacing["20"]};
  }
  > button {
    width: 12px !important;
    height: 12px !important;
    background-color: transparent;
    border: none;
    padding: unset;
  }
`;
