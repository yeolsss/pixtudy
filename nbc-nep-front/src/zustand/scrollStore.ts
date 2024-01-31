import { create } from "zustand";

type Section = "banner" | "intro" | "feature";

interface ScrollState {
  section: Section;
  isInSection: boolean;
  featureScrollIndex: number;
  setSection: (section: Section) => void;
  setIsInSection: (isInSection: boolean) => void;
  setFeatureScrollIndex: (index: number) => void;
}

const initialScrollState: ScrollState = {
  section: "banner",
  isInSection: false,
  featureScrollIndex: -1,
  setSection: () => {},
  setIsInSection: () => {},
  setFeatureScrollIndex: () => {},
};

const scrollStore = create<ScrollState>((set) => ({
  ...initialScrollState,
  setSection: (section) => set(() => ({ section })),
  setIsInSection: (isInSection) => set(() => ({ isInSection })),
  setFeatureScrollIndex: (index) => set(() => ({ featureScrollIndex: index })),
}));

export default scrollStore;
