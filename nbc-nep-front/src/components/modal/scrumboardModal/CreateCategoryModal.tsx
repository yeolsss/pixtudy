import { fadeInOut } from '@/styles/animations'
import { motion } from 'framer-motion'
import CreateCategoryModalMainContainer from './CreateCategoryModalMainContainer'

export default function CreateCategoryModal() {
  return (
    <motion.div key="modal" {...fadeInOut()}>
      <CreateCategoryModalMainContainer />;
    </motion.div>
  )
}
