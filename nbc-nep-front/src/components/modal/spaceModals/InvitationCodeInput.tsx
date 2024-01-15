import { useForm } from "react-hook-form";

const options = [{}];

export default function InvitationCodeInput() {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  return (
    <div>
      <label>
        {" "}
        Option 1<input type="text" value={key} id="" />
      </label>
    </div>
  );
}
