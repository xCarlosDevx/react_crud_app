import { InputButton, InputText } from "../inputs/Input";
import { useCrud } from "../../hooks/useCrud";
export const Card = ({ data, index }: any) => {
  const context = useCrud();
  return (
    <div className="taskCard">
      <div id={`modal_${index}`} className="modal">
        <div className="modal__content">
          <div className="input_close flex">
            <h4>Edit Task {data.id}</h4>
            <InputButton
              label="Close"
              fn={() => {
                const modal = document.getElementById(`modal_${index}`);
                if (modal) {
                  modal.style.display = "none";
                }
              }}
            />
          </div>
          <div>
            <p>
              Nombre :
              <InputText
                value={{
                  state: context.nameStateEdit.taskName,
                  set: context.nameStateEdit.setName,
                }}
                label={"Name"}
              ></InputText>
            </p>
            <p>
              Descripcion :
              <InputText
                value={{
                  state: context.descriptionStateEdit.taskDescription,
                  set: context.descriptionStateEdit.setDescription,
                }}
                label={"Description"}
              ></InputText>
            </p>
          </div>
          <div className="input_save flex">
            <span></span>
            <InputButton
              label="Save"
              fn={() => {
                context.editTask({
                  id: data.id,
                  nameTask: context.nameStateEdit.taskName,
                  descriptionTask: context.descriptionStateEdit.taskDescription,
                  state: data.state,
                });
                const modal = document.getElementById(`modal_${index}`);
                if (modal) {
                  modal.style.display = "none";
                }
              }}
            />
          </div>
        </div>
      </div>
      <div className="flex">
        <h3>Tarea No. {index + 1}</h3>
        <div className="edit">
          <InputButton
            label="Edit"
            fn={() => {
              const modal = document.getElementById(`modal_${index}`);
              if (modal) {
                context.taskState.tasks.forEach((item, index) => {
                  let modalFor = document.getElementById(`modal_${index}`);
                  modalFor ? (modalFor.style.display = "none") : undefined;
                });
                modal.style.display = "block";
                context.nameStateEdit.setName(data.nameTask);
                context.descriptionStateEdit.setDescription(
                  data.descriptionTask
                );
              }
            }}
          />
        </div>
        <div className="remove">
          <InputButton
            label="Remove"
            fn={() => {
              context.removeTask(data.id);
            }}
          />
        </div>
      </div>
      <div className="task__content">
        <p>Nombre : {data.nameTask}</p>
        <p>Descripcion : {data.descriptionTask}</p>
        {!data.state ? (
          <InputButton
            label="Complete"
            fn={() => {
              context.completeTask(data.id);
            }}
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
