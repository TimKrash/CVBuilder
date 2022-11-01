import "./CategoryBlock.scss";
import { TiDelete } from "react-icons/ti";
import React, { useCallback, useState } from "react";
import InformationEntry from "./InformationEntry";

function CategoryBlock(props) {
  const {
    name,
    entries,
    isLastEntry,
    addTask,
    removeTask,
    addNewEntry,
    deleteEntry,
    noEntries,
  } = props;
  const { id } = entries || {};

  const taskLength = "Tasks" in entries ? entries.Tasks.length : 0;
  const [taskCount, setTaskCount] = useState(taskLength);

  const addNewTask = useCallback((event) => {
    const newTask = {
      id: taskCount + 1,
      text: "",
    };

    let { target } = event;
    while (target.tagName !== "BUTTON") {
      target = target.parentElement;
    }

    // todo cluttered a bit
    const employmentID = target.dataset.parent;

    addTask(employmentID, newTask);
    setTaskCount(taskCount + 1);
  });

  const removeNewTask = useCallback((event) => {
    let { target } = event;
    while (target.tagName !== "BUTTON") {
      target = target.parentElement;
    }

    const employmentID = target.dataset.parent;
    const taskID = target.dataset.id;

    removeTask(employmentID, taskID);
  });

  return (
    <div className="category-block">
      <h1>{name}</h1>
      <form className="category-block-list" id={`${name}-form`}>
        {noEntries === true && !isLastEntry && (
          <button className="add" type="button" onClick={addNewEntry}>
            Add
          </button>
        )}
        {Object.keys(entries)
          .filter((key) => {
            if (key === "id") {
              return false;
            }
            return true;
          })
          .map((key) => {
            if (key === "Tasks") {
              return entries[key].map((task, idx) => {
                const isFirstTask = idx === 0;
                const isLastTask = idx === entries.Tasks.length - 1;
                return (
                  <InformationEntry
                    key={`Task_${task.id}`}
                    placeholder="Task"
                    value={task.text}
                    parentID={id}
                    taskID={task.id}
                    addTask={addNewTask}
                    removeTask={removeNewTask}
                    isLastTask={isLastTask}
                    isFirstTask={isFirstTask}
                  />
                );
              });
            }
            return (
              <InformationEntry
                key={key}
                placeholder={key}
                value={entries[key]}
                parentID={null}
                taskID={null}
                addTask={addNewTask}
              />
            );
          })}
        {isLastEntry !== null &&
          isLastEntry !== undefined &&
          noEntries === false &&
          (isLastEntry ? (
            <div className="buttons">
              <button className="add" type="button" onClick={addNewEntry}>
                Add
              </button>
              <button
                type="button"
                className="delete"
                data-id={id}
                onClick={deleteEntry}
              >
                <TiDelete />
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="delete"
              data-id={id}
              onClick={deleteEntry}
            >
              <TiDelete />
            </button>
          ))}
      </form>
    </div>
  );
}

export default CategoryBlock;
