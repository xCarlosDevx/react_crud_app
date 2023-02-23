import "../assets/stylos/App.css";
import { useCrud } from "../hooks/useCrud";
import { InputButton, InputText } from "./inputs/Input";
import { Card } from "./containers/Card";
function App() {
  const context = useCrud();
  return (
    <div className="App">
      <div className="cardFlex">
        <div className="itemFlex">
          {context.taskState.tasks.map((item, index) => (
            <Card key={index} data={item} index={index}></Card>
          ))}
        </div>
        <div className="inputs__Container">
          <div className="textContainer">
            <h3>Fill inputs</h3>
            <InputText
              value={{
                state: context.nameState.taskName,
                set: context.nameState.setName,
              }}
              label={"Name"}
            ></InputText>
            <InputText
              value={{
                state: context.descriptionState.taskDescription,
                set: context.descriptionState.setDescription,
              }}
              label={"Description"}
            ></InputText>
          </div>
          <div className="buttonContainer">
            <div className="button__one">
              <InputButton
                label="Save"
                fn={() =>
                  context.addTask({
                    id:
                      context.taskState.tasks.length == 0
                        ? 1
                        : context.taskState.tasks[
                            context.taskState.tasks.length - 1
                          ].id + 1,
                    nameTask: context.nameState.taskName,
                    descriptionTask: context.descriptionState.taskDescription,
                    state: false,
                  })
                }
              />
            </div>
            <div className="button__two">
              <InputButton
                label="Clear"
                fn={() => {
                  context.nameState.setName("");
                  context.descriptionState.setDescription("");
                }}
              />
            </div>
            <div className="button__three">
              <InputButton
                label="Send To Data Base"
                fn={() => {
                  context.sendLS();
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
