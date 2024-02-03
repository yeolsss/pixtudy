import { throttle } from "lodash";
import { RefObject, useEffect, useState } from "react";
import useScroll from "./useScroll";

const SCROLL_GAP = 1000;
const SCROLL_ANIMATION_COUNT = 4;

export default function useHandleScroll(refs: RefObject<HTMLDivElement>[]) {
  const { setSection, setScrollIndex } = useScroll();
  const [scrollThresholds, setScrollThresholds] = useState<number[]>(
    Array(SCROLL_ANIMATION_COUNT).fill(Infinity)
  );

  useEffect(() => {
    const calculateScrollThresholds = () => {
      const newThresholds = refs.at(-1)!.current?.offsetTop || 0;
      setScrollThresholds(
        Array.from({ length: SCROLL_ANIMATION_COUNT }).map(
          (_, i) => newThresholds + SCROLL_GAP * i
        )
      );
    };
    calculateScrollThresholds();
    window.addEventListener("resize", calculateScrollThresholds);

    return () => {
      window.removeEventListener("resize", calculateScrollThresholds);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = refs.findIndex((ref) => ref.current === entry.target);
            if (index !== -1) {
              const section = mapSection(index);
              setSection(section);
            }
          }
        });
      },
      { threshold: [0.3, 0.5, 0.6] }
    );

    refs.forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      refs.forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, []);

  useEffect(() => {
    const handleScroll = throttle(() => {
      if (window.scrollY < scrollThresholds[0]) {
        setScrollIndex(-1);
        return;
      }
      scrollThresholds.forEach((v, i) => {
        if (window.scrollY > v) setScrollIndex(i);
      });
    }, 300);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
}

const mapSection = (index: number) => {
  switch (index) {
    case 0:
      return "banner";
    case 1:
      return "intro";
    case 2:
      return "feature";
    default:
      return "banner";
  }
};
