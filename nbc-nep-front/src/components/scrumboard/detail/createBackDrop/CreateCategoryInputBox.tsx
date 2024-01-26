import down from "@/assets/boards/input-down2.svg";
import Image from "next/image";
import styled from "styled-components";

export default function CreateCategoryInputBox() {
  return (
    <StCategoryWrapper>
      <h1>카테고리 명</h1>
      <div>
        <Image src={down} alt={"down button"} width={24} height={24} />
      </div>
    </StCategoryWrapper>
  );
}

const StCategoryWrapper = styled.div`
  display: flex;
  align-items: center;
  > h1 {
    font-family: var(--point-font);
    font-weight: 700;
    line-height: 150%;
    letter-spacing: -0.15px;
    font-size: ${(props) => props.theme.unit[16]}px;
    padding: ${(props) => props.theme.unit[4]}px
      ${(props) => props.theme.unit[4]}px ${(props) => props.theme.unit[4]}px 0;
  }
  > div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${(props) => props.theme.unit["24"]}px;
    height: ${(props) => props.theme.unit["24"]}px;
  }
`;
