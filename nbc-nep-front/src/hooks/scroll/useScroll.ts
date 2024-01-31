import scrollStore from "@/zustand/scrollStore";

export default function useScroll() {
  const section = scrollStore((state) => state.section);
  const isInSection = scrollStore((state) => state.isInSection);
  const featureScrollIndex = scrollStore((state) => state.featureScrollIndex);
  const setSection = scrollStore((state) => state.setSection);
  const setIsInSection = scrollStore((state) => state.setIsInSection);
  const setFeatureScrollIndex = scrollStore(
    (state) => state.setFeatureScrollIndex
  );

  return {
    section,
    isInSection,
    featureScrollIndex,
    setSection,
    setIsInSection,
    setFeatureScrollIndex,
  };
}
