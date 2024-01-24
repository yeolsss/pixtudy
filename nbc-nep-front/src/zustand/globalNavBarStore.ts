import { create } from "zustand";

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

const useGlobalNavBar = create<GlobalNavBarState>()((set) => ({
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

export default useGlobalNavBar;
