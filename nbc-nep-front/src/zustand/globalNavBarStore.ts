import { create } from "zustand";
import createSelectors from "@/zustand/config/createSelector";

interface SectionsVisibility {
  isChatSectionOn: boolean;
  isSettingsSectionOn: boolean;
  isPlayerListOn: boolean;
}

const defaultSectionsState: SectionsVisibility = {
  isChatSectionOn: false,
  isSettingsSectionOn: false,
  isPlayerListOn: false,
};

interface GlobalNavBarState extends SectionsVisibility {
  setSectionVisibility: (newSectionsState: SectionsVisibility) => void;
  resetAllSections: () => void;
}

const globalNavBarStore = create<GlobalNavBarState>()((set) => ({
  isChatSectionOn: false,
  isPlayerListOn: false,
  isSettingsSectionOn: false,
  setSectionVisibility: (newSectionsState: SectionsVisibility) =>
    set(() => ({ ...newSectionsState })),
  resetAllSections: () =>
    set(() => {
      return {
        isChatSectionOn: false,
        isPlayerListOn: false,
        isSettingsSectionOn: false,
      };
    }),
}));

export function changeSectionVisibility(
  key: keyof SectionsVisibility,
  value: boolean
) {
  return {
    ...defaultSectionsState,
    [key]: value,
  };
}

const useGlobalNavBarStore = createSelectors(globalNavBarStore);
export default useGlobalNavBarStore;
