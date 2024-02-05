import { StLoadingSpinner, StModalBackground } from "./loading.styles";

export default function LoadingProgress() {
  return (
    <StModalBackground>
      <StLoadingSpinner />
    </StModalBackground>
  );
}
