import React from "react";
import { taskType } from "../helpers/constants";

export default ({ currentTaskType, handlerTaskType }) => {
  return (
    <ul className="action-list">
      {taskType.map(ty => (
        <li
          key={ty}
          className={currentTaskType === ty ? "active" : null}
          onClick={handlerTaskType}
        >
          {ty}
        </li>
      ))}
    </ul>
  );
};
