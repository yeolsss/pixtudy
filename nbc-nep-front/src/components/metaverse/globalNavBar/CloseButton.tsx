import styled from "styled-components";
import IconButton from "@/components/metaverse/globalNavBar/globalNavBarIconWrapper/iconButton/IconButton";
import CloseIcon from "@/assets/icons/Close.svg";
import { useAppDispatch } from "@/hooks/useReduxTK";
import { setCloseDm } from "@/redux/modules/dmSlice";
import { setCloseChat } from "@/redux/modules/chatTypeSlice";
import { setIsCloseSomeSection } from "@/redux/modules/globalNavBarSlice";

export default function CloseButton() {
  const dispatch = useAppDispatch();
  const handleOnClickClose = () => {
    dispatch(setIsCloseSomeSection());
    dispatch(setCloseDm());
    dispatch(setCloseChat());
  };

  return (
    <StCloseButton>
      <IconButton
        buttonImage={CloseIcon}
        description={"닫기 버튼"}
        type={"close"}
        handleOnClick={handleOnClickClose}
      />
    </StCloseButton>
  );
}

const StCloseButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid ${({ theme }) => theme.color.border.primary};
  padding-top: ${({ theme }) => theme.spacing["24"]};
`;
