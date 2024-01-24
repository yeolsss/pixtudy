import CloseIcon from "@/assets/icons/Close.svg";
import IconButton from "@/components/metaverse/globalNavBar/globalNavBarIconWrapper/iconButton/IconButton";
import { useAppDispatch } from "@/hooks/useReduxTK";
import { setCloseChat } from "@/redux/modules/chatTypeSlice";
import { setCloseDm } from "@/redux/modules/dmSlice";
import useGlobalNavBar from "@/zustand/globalNavBarStore";
import styled from "styled-components";

export default function CloseButton() {
  const dispatch = useAppDispatch();
  const { resetAllSections } = useGlobalNavBar();
  const handleOnClickClose = () => {
    resetAllSections();
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
