import DefaultSpanText from "@/components/common/text/DefaultSpanText";
import { PropsWithChildren } from "react";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

interface Props {
  title: string;
  maxLength: number;
  curLength: number;
  error?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
}

export default function ConfigSpaceFormItem({
  title,
  curLength,
  maxLength,
  children,
  error,
}: PropsWithChildren<Props>) {
  return (
    <div>
      <span>{title}</span>
      {children}
      <span>
        {curLength}/{maxLength}
      </span>
      {error && <DefaultSpanText>{error as string}</DefaultSpanText>}
    </div>
  );
}
