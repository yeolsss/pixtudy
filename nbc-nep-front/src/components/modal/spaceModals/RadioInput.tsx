import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

function RadioInput() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const options = [
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
    { label: "Option 3", value: "option3" },
    // ... 추가 옵션
  ];
  type Inputs = {
    value: string;
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {options.map((option, index) => (
        <label key={index}>
          {option.label}
          <input
            type="radio"
            value={option.value}
            {...register("radioGroup", { required: "This field is required" })}
          />
        </label>
      ))}

      {errors.radioGroup && <p>{errors.radioGroup.message as string}</p>}

      <input type="submit" />
    </form>
  );
}

export default RadioInput;
