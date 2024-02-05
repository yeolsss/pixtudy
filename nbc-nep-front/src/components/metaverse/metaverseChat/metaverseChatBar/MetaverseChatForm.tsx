import useChat from "@/hooks/chat/useChat";
import useFocusOutInput from "@/hooks/phaser/useFocusOutInput";
import { StChatInput } from "@/components/metaverse/styles/metaverse.styles";

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
  );
}
