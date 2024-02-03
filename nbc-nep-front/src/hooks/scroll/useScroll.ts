import useScrollStore from "@/zustand/scrollStore";

export default function useScroll() {
  const section = useScrollStore.use.section();
  const isInSection = useScrollStore.use.isInSection();
  const scrollIndex = useScrollStore.use.scrollIndex();
  const setSection = useScrollStore.use.setSection();
  const setIsInSection = useScrollStore.use.setIsInSection();
  const setScrollIndex = useScrollStore.use.setScrollIndex();

  return {
    section,
    isInSection,
    scrollIndex,
    setSection,
    setIsInSection,
    setScrollIndex,
  };
}
