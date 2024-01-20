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
        <StSaveLoginInfoToggleCheckBox
          htmlFor="save-login-info"
          $isCheck={isCheck}
        >
          <div>
            <div />
          </div>
          <span>로그인 정보 저장하기</span>
        </StSaveLoginInfoToggleCheckBox>
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
  & input {
    display: none;
  }
`;

const StSaveLoginInfoToggleCheckBox = styled.label<{ $isCheck: boolean }>`
  display: flex;
  align-items: center;
  cursor: pointer;
  & > div {
    position: relative;
    margin-right: ${(props) => props.theme.spacing["8"]};
    width: ${(props) => props.theme.unit["40"]}px;
    height: ${(props) => props.theme.unit["20"]}px;
    border-radius: ${(props) => props.theme.border.radius["36"]};
    background: ${(props) =>
      props.$isCheck ? props.theme.color.success["400"] : "#ececec"};
    border: 0.5px solid #c9c9c9;
    & > div {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: ${(props) => (props.$isCheck ? "unset" : props.theme.spacing["2"])};
      right: ${(props) =>
        props.$isCheck ? props.theme.spacing["2"] : "unset"};
      width: ${(props) => props.theme.unit["16"]}px;
      height: ${(props) => props.theme.unit["16"]}px;
      border-radius: ${(props) => props.theme.border.radius.circle};
      background: var(--color-base-white);
    }
  }
`;
