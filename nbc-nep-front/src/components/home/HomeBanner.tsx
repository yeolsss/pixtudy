import Image from "next/image";
import { forwardRef } from "react";
import {
  StHeroBanner,
  StHeroBannerDescription,
  StHeroBannerTitle,
  StHeroBannerWrapper,
  StLink,
} from "./styles/homeBanner.styles";

interface Props {
  isLoggedIn: boolean;
}

const HomeBanner = forwardRef<HTMLDivElement, Props>(function HomeHeroBanner(
  { isLoggedIn }: Props,
  ref
) {
  return (
    <StHeroBanner ref={ref}>
      <StHeroBannerWrapper>
        <StHeroBannerTitle>
          모여서 <br /> 같이 <br /> 공부하자!
        </StHeroBannerTitle>
        <StHeroBannerDescription>
          원하는 대로 여러 화면을 쉽게 선택하여 배치하고, 보고 싶은 대로
          레이아웃을 변경해보세요.
        </StHeroBannerDescription>
        <StLink href={isLoggedIn ? "/dashboard" : "/signin"}>
          인기 랜선스터디 모아보기 {">"}
        </StLink>
      </StHeroBannerWrapper>
      <Image
        src="/assets/introduction/landing.png"
        width={658}
        height={563}
        alt="come and study together!"
      />
    </StHeroBanner>
  );
});

export default HomeBanner;
