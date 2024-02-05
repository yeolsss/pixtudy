import useChat from "@/hooks/chat/useChat";
import useFocusOutInput from "@/hooks/phaser/useFocusOutInput";
import styled from "styled-components";

export default function MetaverseChatForm() {
  const {
    handleOnSubmitChat,
    handleOnChangeChat,
    chatInput,
    handleFocus,
    handleBlur,
  } = useChat();
  const inputRef = useFocusOutInput();

  return (
    <>
      <form onSubmit={handleOnSubmitChat}>
        <StChatInput
          type="text"
          value={chatInput}
          ref={inputRef}
          onChange={handleOnChangeChat}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder="메시지를 입력하세요"
        />
      </form>
    </>
  );
}
const StChatInput = styled.input`
  width: 100%;
  height: 30px;
  outline: none;
  padding: 0 10px;
  background-color: #1f2542;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  line-height: 24px;
  letter-spacing: -0.32px;
`;
