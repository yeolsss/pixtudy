import { useParams } from 'next/navigation'
import { ChangeEvent, useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import styled from 'styled-components'

import { StFormCTAButton } from '@/components/common/button/button.styles'
import DefaultSpanText from '@/components/common/text/DefaultSpanText'
import { StErrorMessage } from '@/components/spaces/JoinSpaceForm'
import useModal from '@/hooks/modal/useModal'
import { useCreateCategory, useGetCategories } from '@/hooks/query/useSupabase'

import { options } from '../constants/constants'

export default function CreateCategoryForm() {
  const params = useParams()
  const spaceId = params.space_id as string
  const categories = useGetCategories(spaceId)
  const categoryNames = categories?.map((category) => category.name)
  const { create } = useCreateCategory(spaceId)
  const [selectedColor, setSelectedColor] = useState<string>('')
  const { closeModal } = useModal()

  const {
    control,
    handleSubmit,
    register,
    watch,
    formState: { errors, isValid }
  } = useForm<FieldValues>({ mode: 'onChange' })

  const validateCategoryName = (name: string) => {
    return categoryNames?.some((category) => category === name)
      ? '이미 존재하는 카테고리입니다.'
      : true
  }

  const handleCategorySelect = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedColor(e.target.value)
  }

  const handleCreateCategory = (data: FieldValues) => {
    const newCategory = {
      spaceId,
      name: data.name,
      color: data.color
    }
    create(newCategory)
    closeModal()
  }

  return (
    <StCreateCategoryForm onSubmit={handleSubmit(handleCreateCategory)}>
      <div>
        <h3>이름</h3>
        <input
          type="text"
          placeholder="카테고리 이름"
          {...register('name', {
            required: '카테고리 이름을 입력해주세요.',
            validate: validateCategoryName
          })}
        />
        {errors.name && (
          <StErrorMessage>{errors.name.message as string}</StErrorMessage>
        )}
      </div>
      <div>
        <h3>카테고리 색상</h3>
        <div>
          {options.map((option, index) => {
            return (
              <StCategoryItemWrapper
                key={index}
                $isSelected={selectedColor === option}
              >
                <StCategoryColor
                  key={option}
                  $color={option}
                  $isSelected={selectedColor === option}
                >
                  <label htmlFor={option}>
                    <input
                      type="radio"
                      id={option}
                      value={option}
                      {...register('color', {
                        required: '카테고리 색상을 선택해주세요.',
                        onChange: handleCategorySelect
                      })}
                    />
                  </label>
                </StCategoryColor>
              </StCategoryItemWrapper>
            )
          })}
        </div>
        {errors.color && (
          <DefaultSpanText>{errors.name?.message as string}</DefaultSpanText>
        )}
      </div>
      <StFormCTAButton type="submit" disabled={!isValid}>
        확인
      </StFormCTAButton>
    </StCreateCategoryForm>
  )
}

const StCreateCategoryForm = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing[16]};
  & > div {
    display: flex;
    width: 100%;
    flex-direction: column;
    gap: ${(props) => props.theme.spacing[8]};
  }
  & > div > div {
    display: flex;
    gap: ${(props) => props.theme.spacing[2]};
  }
  & h3 {
    font-size: ${(props) => props.theme.body.lg.medium.fontSize};
    font-family: var(--sub-font);
    font-weight: ${(props) => props.theme.heading.desktop.sm.fontWeight};
  }
`

const StCategoryItemWrapper = styled.div<{ $isSelected: boolean }>`
  opacity: ${(props) => (props.$isSelected ? 1 : 0.2)};
  transition: opacity 0.2s all;

  border-radius: ${(props) => props.theme.border.radius.circle};
  input {
    display: none;
  }
`

const StCategoryColor = styled.div<{ $color: string; $isSelected: boolean }>`
  padding: ${(props) => props.theme.spacing[6]};
  border-radius: ${(props) => props.theme.border.radius[8]};
  background-color: ${(props) =>
    props.$isSelected
      ? props.theme.color.blue[100]
      : props.theme.color.bg.secondary};
  &:hover {
    background-color: ${(props) => props.theme.color.blue[300]};
  }
  & > label {
    display: block;
    width: ${(props) => props.theme.unit[16]};
    height: ${(props) => props.theme.unit[16]};
    border-radius: ${(props) => props.theme.border.radius.circle};
    padding: 12px;
    background-color: ${(props) => props.$color};
    background-image: ${(props) =>
      props.$isSelected ? `url('/assets/selected.svg')` : 'none'};
    background-size: 12px;
    background-repeat: no-repeat;
    background-position: center 60%;
  }
`

const StSubmitBtn = styled(StFormCTAButton)`
  &:disabled {
    background-color: ${(props) =>
      props.theme.color.bg.interactive['selected-press']};
    cursor: auto;
  }
`
