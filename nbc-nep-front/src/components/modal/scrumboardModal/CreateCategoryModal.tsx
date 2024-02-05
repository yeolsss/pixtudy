import { fadeInOut } from "@/styles/animations";
import { motion } from "framer-motion";
import CreateCategoryModalMainContainer from "./CreateCategoryModalMainContainer";

export default function CreateCategoryModal() {
  const animationProps = fadeInOut();

  return (
    <motion.div
      key="modal"
      animate={animationProps.animate}
      initial={animationProps.initial}
    >
      <CreateCategoryModalMainContainer />;
    </motion.div>
  );
}
