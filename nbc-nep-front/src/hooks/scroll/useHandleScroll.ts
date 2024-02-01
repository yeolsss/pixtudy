import { throttle } from "lodash";
import { RefObject, useEffect } from "react";
import useScroll from "./useScroll";

const SCROLL_THRESHOLDS = [3260, 4260, 5260, 6260];

export default function useHandleScroll(refs: RefObject<HTMLDivElement>[]) {
  const { setSection, setScrollIndex } = useScroll();

  const handleScroll = throttle(() => {
    if (window.scrollY < SCROLL_THRESHOLDS[0]) {
      setScrollIndex(-1);
      return;
    }
    SCROLL_THRESHOLDS.forEach((v, i) => {
      if (window.scrollY > v) setScrollIndex(i);
    });
  }, 300);

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
