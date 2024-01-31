import { RefObject, useEffect } from "react";
import useScroll from "./useScroll";

export default function useHandleScroll(refs: RefObject<HTMLDivElement>[]) {
  const { section, setSection, setIsInSection } = useScroll();

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

  const handleScroll = () => {
    if (section === "intro") {
      console.log("intro");
    }
    if (section === "feature") {
      console.log("feature");
    }
  };
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            console.log("entry: ", entry.target);
            const index = refs.findIndex((ref) => ref.current === entry.target);
            if (index !== -1) {
              const section = mapSection(index);
              console.log("entry section: ", section);
              setSection(section);
            }
          }
        });
      },
      { threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1] }
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
