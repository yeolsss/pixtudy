import Link from "next/link";
import React from "react";
import styled from "styled-components";
import { useState } from "react";

export default function SignInOptions() {
  const [isCheck, setIsCheck] = useState<boolean>(false);

  const handleIsCheck = () => {
    setIsCheck((prev) => !prev);
  };

  return (
    <StSignInOptions>
      <section>
        <input
          type="checkbox"
          id="save-login-info"
          checked={isCheck}
          onChange={handleIsCheck}
        />
        <label htmlFor="save-login-info">로그인 정보 저장하기</label>
      </section>
      <Link href={"#"}>비밀번호 찾기</Link>
    </StSignInOptions>
  );
}

const StSignInOptions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin: ${(props) => props.theme.spacing["32"]} 0
    ${(props) => props.theme.spacing["16"]} 0;

  & > section {
    display: flex;
    margin: unset;
    align-items: center;
    & label {
      font-size: ${(props) => props.theme.unit["12"]}px;
    }
  }
  & a {
    font-size: ${(props) => props.theme.unit["14"]}px;
    color: #d93f21;
  }
`;
