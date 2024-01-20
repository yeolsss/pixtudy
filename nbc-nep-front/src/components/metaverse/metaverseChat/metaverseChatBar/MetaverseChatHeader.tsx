import React from "react";
import styled from "styled-components";
import CloseIcon from "@/assets/icons/Times.svg";
import Image from "next/image";

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
  padding: 10px 0;
  > h1 {
    font-size: ${({ theme }) => theme.body.lg.regular.fontSize};
    font-family: ${({ theme }) => theme.body.lg.regular.fontFamily};
    color: ${({ theme }) => theme.color.text.interactive.inverse};
  }
  > button {
    width: 12px !important;
    height: 12px !important;
    background-color: transparent;
    border: none;
    padding: unset;
  }
`;
