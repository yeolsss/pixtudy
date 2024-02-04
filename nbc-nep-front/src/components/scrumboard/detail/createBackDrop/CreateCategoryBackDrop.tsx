import { updateCategoryItem } from '@/api/supabase/scrumBoard'
import { BACK_DROP_TYPE_CREATE } from '@/components/scrumboard/constants/constants'
import useScrumBoard from '@/hooks/scrumBoard/useScrumBoard'
import { Kanban_categories } from '@/types/supabase.tables.types'
import useScrumBoardItemBackDropStore from '@/zustand/createScrumBoardItemStore'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import styled from 'styled-components'

interface Props {
  isOpen: boolean
}
export default function CreateCategoryBackDrop({ isOpen }: Props) {
  const { categories } = useScrumBoard()

  const selectedCategory = useScrumBoardItemBackDropStore.use.category()
  const setCategory = useScrumBoardItemBackDropStore.use.setCategory()
  const setIsOpenCategoryBackDrop =
    useScrumBoardItemBackDropStore.use.setIsOpenCategoryBackDrop()
  const kanbanItem = useScrumBoardItemBackDropStore.use.kanbanItem()
  const backDropType = useScrumBoardItemBackDropStore.use.backDropType()

  const updateCategoryMutate = useMutation({
    mutationFn: updateCategoryItem
  })

  const handleOnClickSelectCategory = (category: Kanban_categories) => {
    if (backDropType !== BACK_DROP_TYPE_CREATE) {
      updateCategoryMutate.mutate(
        {
          id: kanbanItem?.id!,
          updateCategoryId: category.id
        },
        {
          onSuccess: async () => {
            toast.success('카테고리가 변경되었습니다.')
          }
        }
      )
    }

    setCategory(category)
    setIsOpenCategoryBackDrop(false)
  }
  return (
    <StCreateCategoryBackDropWrapper $isOpen={isOpen}>
      {categories.map((category) => {
        if (category.id !== selectedCategory.id)
          return (
            <StCreateCategoryBackDrop
              key={category.id}
              onClick={() => handleOnClickSelectCategory(category)}
            >
              {category.name}
            </StCreateCategoryBackDrop>
          )
      })}
    </StCreateCategoryBackDropWrapper>
  )
}

const StCreateCategoryBackDropWrapper = styled.div<{
  $isOpen: boolean
}>`
  display: ${(props) => (props.$isOpen ? 'flex' : 'none')};
  position: absolute;
  bottom: 0;
  transform: translateY(100%);
  left: 0;
  width: ${(props) => props.theme.unit[128]};
  flex-direction: column;
  border-radius: ${(props) => props.theme.border.radius[8]};
  background-color: ${(props) => props.theme.color.bg.primary};
  box-shadow: ${(props) => props.theme.elevation.Light.shadow8};
  z-index: 100;
`

const StCreateCategoryBackDrop = styled.div`
  width: 100%;
  height: ${(props) => props.theme.spacing[32]};
  padding: ${(props) => props.theme.spacing[8]};
  background-color: ${(props) => props.theme.color.bg.secondary};
  display: flex;
  align-items: center;
  cursor: pointer;
  //prettier-ignore
  padding: ${(props) => props.theme.spacing[24]} ${(props) =>
    props.theme.spacing[12]};
  &:hover {
    background-color: ${(props) => props.theme.color.bg.primary};
    /* box-shadow: ${(props) => props.theme.elevation.Light.shadow16}; */
  }
  color: ${(props) => props.theme.color.text.secondary};
  font-family: var(--point-font);
  font-size: ${(props) => props.theme.unit[12]};
  font-style: normal;
  font-weight: 700;
  line-height: 100%; /* 11px */
  letter-spacing: -0.11px;
  &:nth-child(1) {
    border-radius: ${(props) =>
      `${props.theme.border.radius['8']} ${props.theme.border.radius['8']} 0 0`};
  }
  &:nth-last-child(1) {
    border-radius: ${(props) =>
      `0 0 ${props.theme.border.radius['8']} ${props.theme.border.radius['8']}`};
  }
`
