import React from "react";
import { IoMdRemoveCircle, IoIosAddCircle } from "react-icons/io";
import "./InformationEntry.scss";

function InformationEntry(props) {
  const {
    addTask,
    removeTask,
    isFirstTask,
    isLastTask,
    placeholder,
    value,
    parentID,
    taskID,
    handleChange,
  } = props;

  function renderTaskElement() {
    if (placeholder !== "Task") {
      return (
        <input
          onChange={handleChange}
          type="text"
          placeholder={placeholder}
          data-parent={parentID}
          defaultValue={value}
        />
      );
    }

    if (isFirstTask && isLastTask) {
      return (
        <div className="task-entry">
          <input
            type="text"
            onChange={handleChange}
            data-parent={parentID}
            data-task={taskID}
            placeholder={placeholder}
            defaultValue={value}
          />
          <button
            type="button"
            data-parent={parentID}
            data-id={taskID}
            className="task-add"
            onClick={addTask}
          >
            <IoIosAddCircle />
          </button>
        </div>
      );
    }
    if (isLastTask) {
      return (
        <div className="task-entry">
          <input
            type="text"
            placeholder={placeholder}
            onChange={handleChange}
            data-parent={parentID}
            data-task={taskID}
            defaultValue={value}
          />
          <button
            type="button"
            data-parent={parentID}
            data-id={taskID}
            className="task-add"
            onClick={addTask}
          >
            <IoIosAddCircle />
          </button>
          <button
            type="button"
            onClick={removeTask}
            data-parent={parentID}
            data-id={taskID}
            className="task-delete"
          >
            <IoMdRemoveCircle />
          </button>
        </div>
      );
    }
    return (
      <div className="task-entry">
        <input
          type="text"
          placeholder={placeholder}
          data-parent={parentID}
          data-task={taskID}
          defaultValue={value}
          onChange={handleChange}
        />
        <button
          type="button"
          data-id={taskID}
          data-parent={parentID}
          onClick={removeTask}
          className="task-delete"
        >
          <IoMdRemoveCircle />
        </button>
      </div>
    );
  }

  return renderTaskElement();
}

export default InformationEntry;
