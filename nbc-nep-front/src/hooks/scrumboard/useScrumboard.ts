import useScrumBoardStore from "@/zustand/scrumBoardStore";

export default function useScrumBoard() {
  const categories = useScrumBoardStore((state) => state.categories);
  const setCategories = useScrumBoardStore((state) => state.setCategories);

  return { categories, setCategories };
}
