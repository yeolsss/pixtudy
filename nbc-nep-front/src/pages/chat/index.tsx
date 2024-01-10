import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

export default function Chat() {
  const { handleSubmit, register, reset } = useForm();

  const sendHandler: SubmitHandler<FieldValues> = (values) => {
    console.log(values["send-input"]);
    reset();
  };
  return (
    <div>
      <h1>채팅 테스트 페이지입니다</h1>
      <p>가정 : 메타버스 환경</p>

      <div>여기는 채팅이 보여지는 부분</div>
      <form onSubmit={handleSubmit(sendHandler)}>
        <input
          id="send-input"
          type="text"
          placeholder="메시지를 입력하세요"
          {...register("send-input", {
            required: true,
          })}
        />
        <button type="submit">입력</button>
      </form>
    </div>
  );
}
