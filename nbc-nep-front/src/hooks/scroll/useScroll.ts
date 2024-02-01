import scrollStore from "@/zustand/scrollStore";

export default function useScroll() {
  const section = scrollStore((state) => state.section);
  const isInSection = scrollStore((state) => state.isInSection);
  const scrollIndex = scrollStore((state) => state.scrollIndex);
  const setSection = scrollStore((state) => state.setSection);
  const setIsInSection = scrollStore((state) => state.setIsInSection);
  const setScrollIndex = scrollStore((state) => state.setScrollIndex);

  return {
    section,
    isInSection,
    scrollIndex,
    setSection,
    setIsInSection,
    setScrollIndex,
  };
}
