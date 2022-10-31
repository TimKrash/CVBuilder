import React from "react";
import "./InformationEntry.scss";

function InformationEntry(props) {
  const { addTask, isFirstTask, isLastTask, placeholder, value, parentID } =
    props;

  function renderTaskElement() {
    if (placeholder !== "Task") {
      return (
        <input type="text" placeholder={placeholder} defaultValue={value} />
      );
    }

    if (isFirstTask && isLastTask) {
      return (
        <div>
          <input type="text" placeholder={placeholder} defaultValue={value} />
          <button
            type="button"
            data-id={parentID}
            className="task-add"
            onClick={addTask}
          >
            Add Task
          </button>
        </div>
      );
    }
    if (isLastTask) {
      return (
        <div>
          <input type="text" placeholder={placeholder} defaultValue={value} />
          <button
            type="button"
            data-id={parentID}
            className="task-add"
            onClick={addTask}
          >
            Add Task
          </button>
          <button type="button" data-id={parentID} className="task-delete">
            Remove Task
          </button>
        </div>
      );
    }
    return (
      <div>
        <input type="text" placeholder={placeholder} defaultValue={value} />
        <button type="button" data-id={parentID} className="task-delete">
          Remove Task
        </button>
      </div>
    );
  }

  return renderTaskElement();
}

export default InformationEntry;
