import {
  handleValidateEmail,
  handleValidateNickname,
  handleValidatePassword,
  handleValidatePasswordMatch,
} from "@/utils/authValidate";

import {
  authHero1,
  authHero2,
  authHero4,
  authHero5,
  authHero6,
  authHero7,
} from "@/assets/auth";

export const imageArray = [
  authHero1,
  authHero2,
  authHero4,
  authHero5,
  authHero6,
  authHero7,
];

export const tipsArray = [
  "당신만의 공간을 창조하세요! 맵 선택과 캐릭터 커스터마이징을 통해 개성을 표현하고, 나만의 스페이스를 만들 수 있습니다.",
  "초대 코드를 통해 친구들을 나의 스페이스로 초대하거나, 다른 스페이스에 쉽게 참여할 수 있습니다. 몇 번의 클릭으로 모든 연결이 이루어집니다!",
  "스페이스 내에서는 다양한 소통이 가능합니다. 공개적인 채팅부터 프라이빗한 DM까지, 원하는 방식으로 대화를 나눌 수 있습니다.",
  "화면공유 기능으로 협업을 더욱 효율적으로 만들어보세요. 최대 4개의 화면을 동시에 공유하며, 커스텀 레이아웃을 통해 드래그와 줌으로 화면을 완벽하게 제어할 수 있습니다.",
  "다자간 화상 회의 기능을 통해 얼굴을 마주보며 소통하세요. 생생한 음성과 함께, 마치 같은 공간에 있는 듯한 경험을 제공합니다.",
  "비밀번호를 잊어버리셨나요? 걱정하지 마세요. 로그인 페이지에서 비밀번호 찾기 기능을 사용하면, 이메일로 초기화 링크를 바로 받을 수 있습니다.",
  "스페이스별 스크럼보드로 프로젝트와 스터디 일정을 체계적으로 관리할 수 있습니다. 브레인스토밍 보드를 통해 아이디어를 모으고, 그 아이디어를 바로 스크럼보드로 옮겨 실행에 옮기세요!",
];

export const generateRandomIndex = (num: number) => {
  return Math.floor(Math.random() * num);
};

export type AuthFormType = "signUp" | "signIn" | "changePassword";

export interface FormValues {
  signIn_id?: string;
  signIn_pw?: string;
  signUp_id?: string;
  signUp_pw?: string;
  signUp_nickname?: string;
  signUp_check_pw?: string;
  forget_password_email?: string;
}

export type ForgetPasswordMessageType = "success" | "fail";

export const getInputs = (formType: AuthFormType) => {
  if (formType === "signIn") {
    return [
      {
        id: "signIn_id",
        placeholder: "이메일을 입력해주세요.",
        type: "email",
        validate: handleValidateEmail,
      },
      {
        id: "signIn_pw",
        placeholder: "비밀번호를 입력해주세요.",
        type: "password",
        validate: handleValidatePassword,
      },
    ];
  }
  if (formType === "signUp") {
    return [
      {
        id: "signUp_id",
        placeholder: "이메일을 입력해주세요",
        type: "email",
        validate: handleValidateEmail,
      },
      {
        id: "signUp_pw",
        placeholder: "비밀번호를 입력해주세요",
        type: "password",
        validate: handleValidatePassword,
      },
      {
        id: "signUp_check_pw",
        placeholder: "비밀번호를 다시 입력해주세요",
        type: "password",
        validate: handleValidatePasswordMatch,
      },
      {
        id: "signUp_nickname",
        placeholder: "닉네임을 입력해주세요",
        type: "text",
        validate: handleValidateNickname,
      },
    ];
  }
  if (formType === "changePassword") {
    return [
      {
        id: "findPw_pw",
        placeholder: "새로운 비밀번호를 입력하세요.",
        type: "password",
        validate: handleValidatePassword,
      },
      {
        id: "findPw_check_pw",
        placeholder: "비밀번호를 다시 입력해주세요.",
        type: "password",
        validate: handleValidatePasswordMatch,
      },
    ];
  }
};
