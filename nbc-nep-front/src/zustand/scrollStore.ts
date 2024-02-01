import { create } from "zustand";

type Section = "banner" | "intro" | "feature";

interface ScrollState {
  section: Section;
  isInSection: boolean;
  scrollIndex: number;
  setSection: (section: Section) => void;
  setIsInSection: (isInSection: boolean) => void;
  setScrollIndex: (index: number) => void;
}

const initialScrollState: ScrollState = {
  section: "banner",
  isInSection: false,
  scrollIndex: -1,
  setSection: () => {},
  setIsInSection: () => {},
  setScrollIndex: () => {},
};

const scrollStore = create<ScrollState>((set) => ({
  ...initialScrollState,
  setSection: (section) => set(() => ({ section })),
  setIsInSection: (isInSection) => set(() => ({ isInSection })),
  setScrollIndex: (index) => set(() => ({ scrollIndex: index })),
}));

export default scrollStore;
