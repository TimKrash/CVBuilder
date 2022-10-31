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

    const employmentID = event.target.dataset.id;

    addTask(employmentID, newTask);
    setTaskCount(taskCount + 1);
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
              return entries[key].map((task) => {
                const isFirstTask = task.id === 1;
                const isLastTask = task.id === entries.Tasks.length;
                return (
                  <InformationEntry
                    key={`Task_${task.id}`}
                    placeholder="Task"
                    value={task.text}
                    parentID={id}
                    addTask={addNewTask}
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
                addTask={null}
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
