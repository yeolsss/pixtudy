import ModalHeader from "@/components/common/ModalHeader";
import CreateSpaceForm from "@/components/spaces/CreateSpaceForm";
import ProfileForm from "@/components/spaces/ProfileForm";
import { FORM_SPACE } from "@/components/spaces/constatns/constants";
import { Procedure, SpaceInfo } from "@/components/spaces/types/space.types";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxTK";
import { toggleCreateSpaceModal } from "@/redux/modules/modalSlice";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  StModalContainer,
  StModalContents,
} from "../joinSpaceModal/JoinSpaceModalMainContainer";
/*
 * TODO : CreateSpaceModalMainContainer
 * 수파베이스에 스페이스를 생성하는 컴포넌트를 담는 컨테이너
 * -> 이 때 필요한 데이터는 스페이스 이름, 스페이스 설명, 스페이스 태그, 유저 정보
 * -> 스페이스 이름, 스페이스 설명, 스페이스 태그는 input으로 받는다.
 * -> 스페이스 태그는 최대 3개까지만 가능하고, MVP에서는 태그는 사용하지 않는다.
 * -> 유저 정보는 AppSelector에서 가져오면 된다.
 * -> 유저 displayName이랑 id 가 둘 다 필요하네.
 * -> 아바타까지? 는 모르겠다
 *
 * TODO : 스페이스 프리셋 기능
 * scenesMain 의 constructor에 preset을 넣어서 스페이스를 생성하면 어떨까?
 */

export default function CreateSpaceModalMainContainer() {
  const { id, display_name } = useAppSelector((state) => state.authSlice.user);
  const [spaceInfo, setSpaceInfo] = useState<SpaceInfo | {}>({});
  const [procedure, setProcedure] = useState<Procedure>(FORM_SPACE);

  const dispatch = useAppDispatch();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ mode: "onSubmit" });

  return (
    <StModalContainer>
      <ModalHeader
        text="스페이스 만들기"
        handler={() => dispatch(toggleCreateSpaceModal())}
      />
      <StModalContents>
        {procedure === FORM_SPACE ? (
          <CreateSpaceForm
            setProcedure={setProcedure}
            setSpaceInfo={setSpaceInfo}
            handleSubmit={handleSubmit}
            register={register}
            errors={errors}
          />
        ) : (
          <ProfileForm
            setProcedure={setProcedure}
            spaceInfo={spaceInfo}
            setSpaceInfo={setSpaceInfo}
            defaultDisplayName={display_name!}
            handleSubmit={handleSubmit}
            register={register}
            mode="createSpace"
            errors={errors}
          />
        )}
      </StModalContents>
    </StModalContainer>
  );
}
