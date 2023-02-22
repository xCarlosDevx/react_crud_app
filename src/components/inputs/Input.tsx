import { IInputButton, IInputText } from "../../interfaces/interfaces";
export const InputText = ({ label, value }: IInputText) => {
  return (
    <>
      <input
        type="text"
        placeholder={label}
        value={value?.state}
        onChange={(e) => value?.set(e.target.value)}
      />
    </>
  );
};
export const InputButton = ({ label, fn }: IInputButton) => {
  return (
    <>
      <input type="button" value={label} onClick={fn} />
    </>
  );
};
