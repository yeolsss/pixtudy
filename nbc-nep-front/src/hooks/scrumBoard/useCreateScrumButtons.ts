interface ReturnType {
  handleOnClickCreate: () => void;
  handleOnClickCancel: () => void;
  handleOnClickUpdate: () => void;
  handleOnClickDelete: () => void;
}
export default function useCreateScrumButtons() {
  const handleOnClickCreate = () => {};
  const handleOnClickCancel = () => {};
  const handleOnClickUpdate = () => {};
  const handleOnClickDelete = () => {};

  return {
    handleOnClickCreate,
    handleOnClickCancel,
    handleOnClickUpdate,
    handleOnClickDelete,
  };
}
