import Link from "next/link";
import { PropsWithChildren } from "react";
import { StFormWrapper } from "./styles/authForm.styles";

export default function AuthFormContainer({ children }: PropsWithChildren) {
  return (
    <StFormWrapper>
      <Link href="/">pixtudy</Link>

      <div>{children}</div>
    </StFormWrapper>
  );
}
