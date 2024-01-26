import scrumboardStore from "@/zustand/scrumboardStore";

export default function useScrumboard() {
  const categories = scrumboardStore((state) => state.categories);
  const setCategories = scrumboardStore((state) => state.setCategories);

  return { categories, setCategories };
}
