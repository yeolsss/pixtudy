import useScrumBoardMemberSearchStore from '@/zustand/scrumBoardMemberStore'
import Image from 'next/image'
import styled from 'styled-components'
import { closeIcon } from '@/assets/boards'

interface Props {
  tagType: 'assignees' | 'labels'
}
export default function SelectAssigneesList({ tagType }: Props) {
  const assignees = useScrumBoardMemberSearchStore.use.assignees()
  const deleteAssignees = useScrumBoardMemberSearchStore.use.deleteAssignees()

  const handleDeleteAssignees = (id: string) => {
    deleteAssignees(id)
  }
  return (
    <StSelectAssigneesListWrapper $tagType={tagType === 'assignees'}>
      {assignees.map((assignee, index) => (
        <StSelectAssigneesCard key={index}>
          <span>{assignee.space_display_name}</span>
          {tagType === 'assignees' && (
            <StDeleteButton
              onClick={() => handleDeleteAssignees(assignee.user_id!)}
            >
              <Image src={closeIcon} alt={'삭제'} width={12} height={12} />
            </StDeleteButton>
          )}
        </StSelectAssigneesCard>
      ))}
    </StSelectAssigneesListWrapper>
  )
}

const StSelectAssigneesListWrapper = styled.div<{ $tagType: boolean }>`
  width: 100%;
  border: 1px solid;
  border-radius: ${(props) => props.theme.border.radius[8]};
  border: ${({ $tagType }) => ($tagType ? '1px' : '0')} solid
    ${(props) => props.theme.color.border.secondary};
  padding: ${(props) => props.theme.spacing[8]};
  display: flex;
  gap: ${(props) => props.theme.spacing[8]};
  flex-wrap: wrap;
`

const StSelectAssigneesCard = styled.div`
  display: flex;
  //prettier-ignore
  padding: ${(props) => props.theme.spacing[4]} ${(props) =>
    props.theme.spacing[8]};
  justify-content: center;
  align-items: center;
  gap: ${(props) => props.theme.spacing[4]};
  border-radius: ${(props) => props.theme.border.radius['circle']};
  background: rgba(239, 246, 255, 0.8);

  > span {
    color: ${(props) => props.theme.color.blue['600']};
    text-overflow: ellipsis;
    font-family: var(--sub-font);
    font-size: ${(props) => props.theme.unit[14]};
    font-style: normal;
    font-weight: 400;
    line-height: 100%;
    letter-spacing: 0.28px;
    text-transform: uppercase;
  }
`

const StDeleteButton = styled.button`
  border: none;
  width: 12px;
  background-color: unset;
  height: 12px;
  padding: unset;
  &:hover {
    background-color: unset;
  }
`
