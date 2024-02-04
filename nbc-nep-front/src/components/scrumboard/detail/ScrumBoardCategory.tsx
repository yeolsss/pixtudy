import { AnimatePresence, motion } from 'framer-motion'
import { WheelEvent } from 'react'
import styled from 'styled-components'

import NoContents from '@/components/common/NoContents'
import { StCTAButton } from '@/components/common/button/button.styles'
import { BACK_DROP_TYPE_CREATE } from '@/components/scrumboard/constants/constants'
import { useGetCategoryItems } from '@/hooks/query/useSupabase'
import useDropItem from '@/hooks/scrumBoard/useDropItem'
import { fadeInOut } from '@/styles/animations'
import { KanbanCategories } from '@/types/supabase.tables.types'
import useScrumBoardItemBackDropStore from '@/zustand/createScrumBoardItemStore'

import CategoryHeader from './CategoryHeader'
import ScrumBoardItem from './ScrumBoardItem'

interface Props {
  category: KanbanCategories
}

export default function ScrumBoardCategory({ category }: Props) {
  const { id: categoryId, name, color } = category
  const setIsOpen = useScrumBoardItemBackDropStore.use.setIsOpen()
  const handleAddItem = () => {
    setIsOpen(category, null, BACK_DROP_TYPE_CREATE)
  }
  const { drop, isOver } = useDropItem(category.id)

  const items = useGetCategoryItems(categoryId)

  const handleWheel = (e: WheelEvent<HTMLUListElement>) => {
    const element = e.currentTarget
    if (element.scrollHeight > element.clientHeight) {
      e.stopPropagation()
    }
  }

  const StCategoryWrapper = styled(motion.div)<{ $isOver: boolean }>`
    // 임의로 설정한 너비
    min-width: 384px;
    height: 100%;
    box-sizing: content-box;
    background-color: ${(props) => props.theme.color.bg.secondary};
    padding: ${(props) => props.theme.spacing[16]};
    padding-top: 0;
    ${(props) =>
      props.$isOver
        ? `border: 2px solid ${props.theme.color.border.interactive.primary}`
        : `border : 2px solid ${props.theme.color.border.secondary}`};
    transition: border 0.2s ease-in-out;
    border-radius: ${(props) => props.theme.border.radius[12]};
  `

  const StItemsContainer = styled.ul`
    // 임의로 설정한 높이
    height: calc(92vh - 320px);
    display: flex;
    flex-direction: column;
    gap: ${(props) => props.theme.spacing[12]};
    background-color: #f5f5f5;
    border-radius: ${(props) => props.theme.border.radius[8]};
    overflow: scroll;

    &::-webkit-scrollbar {
      display: none;
    }
  `

  const StAddItemBtn = styled(StCTAButton)`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: ${(props) => props.theme.spacing[12]};
    gap: ${(props) => props.theme.spacing[8]};
    font-size: ${(props) => props.theme.heading.desktop.sm.fontSize};
    & > span {
      display: block;
      width: ${(props) => props.theme.unit[14]};
      height: ${(props) => props.theme.unit[14]};
      margin-top: -${(props) => props.theme.unit[4]};
      background: url('/assets/additem.svg') no-repeat center center;
      background-size: contain;
    }
  `

  return (
    <StCategoryWrapper {...fadeInOut()} $isOver={isOver}>
      <CategoryHeader
        name={name}
        color={color}
        id={categoryId}
        itemCount={items ? items?.length : 0}
      />
      {items?.length ? (
        <StItemsContainer ref={drop} onWheel={handleWheel}>
          <AnimatePresence>
            {items?.map((item, index) => {
              return (
                <motion.div key={index} {...fadeInOut({ y: 5 })}>
                  <ScrumBoardItem key={index} item={item} category={category} />
                </motion.div>
              )
            })}
          </AnimatePresence>
        </StItemsContainer>
      ) : (
        <div ref={drop}>
          <NoContents text="스크럼보드에 아이템을 추가해 보세요!" />
        </div>
      )}
      <StAddItemBtn onClick={handleAddItem}>
        <span />
        Add Item
      </StAddItemBtn>
    </StCategoryWrapper>
  )
}
