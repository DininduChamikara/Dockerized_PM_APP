import { Droppable } from "react-beautiful-dnd";
import Item from "./Item";
import "./ProjectView.css";

const Column = ({ col: { list, id, title } }) => {
  return (
    <Droppable droppableId={id}>
      {(provided) => (
        <div className="column">
          <h2 className="column-header">{title}</h2>
          <div
            className="column-list"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {list.map((text, index) => (
              <Item key={text} text={text} index={index} />
            ))}
            {provided.placeholder}
          </div>
        </div>
      )}
    </Droppable>
  );
};

export default Column;
