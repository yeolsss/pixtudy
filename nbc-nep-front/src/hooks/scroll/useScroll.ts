import scrollStore from "@/zustand/scrollStore";

export default function useScroll() {
  const section = scrollStore.use.section();
  const isInSection = scrollStore.use.isInSection();
  const scrollIndex = scrollStore.use.scrollIndex();
  const setSection = scrollStore.use.setSection();
  const setIsInSection = scrollStore.use.setIsInSection();
  const setScrollIndex = scrollStore.use.setScrollIndex();

  return {
    section,
    isInSection,
    scrollIndex,
    setSection,
    setIsInSection,
    setScrollIndex,
  };
}
