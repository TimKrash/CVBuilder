import "./CategoryBlock.scss";
import React from "react";
import InformationEntry from "./InformationEntry";

function CategoryBlock(props) {
  const { name, entries, isLastEntry, addNewEntry, deleteEntry, noEntries } =
    props;
  const { id } = entries || {};
  console.log(props);

  return (
    <div className="category-block">
      <h1>{name}</h1>
      <form className="category-block-list" id={`${name}-form`}>
        {noEntries === true && !isLastEntry && (
          <button type="button" onClick={addNewEntry}>
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
          .map((key) => (
            <InformationEntry
              key={`${Date.now()}_${`${name}-${key}`}`}
              placeholder={key}
              value={entries[key]}
            />
          ))}
        {isLastEntry !== null &&
          isLastEntry !== undefined &&
          noEntries === false &&
          (isLastEntry ? (
            <div className="buttons">
              <button type="button" onClick={addNewEntry}>
                Add
              </button>
              <button type="button" data-id={id} onClick={deleteEntry}>
                Delete
              </button>
            </div>
          ) : (
            <button type="button" data-id={id} onClick={deleteEntry}>
              Delete
            </button>
          ))}
      </form>
    </div>
  );
}

export default CategoryBlock;
