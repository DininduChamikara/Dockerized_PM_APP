import React, { useState, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";
import CustomTable from "../../Components/CustomTable/CustomTable";
import CustomButton from "../../Components/CustomButton/CustomButton";
import { useLocation, useNavigate } from "react-router-dom";
import projectService from "../../api/services/projectService";
import io from "socket.io-client";

const COLUMN_NAMES = ["Worker Email"];

const initialColumns = {
  todo: {
    title: "Todo",
    id: "todo",
    list: [],
  },
  doing: {
    title: "Inprogress",
    id: "doing",
    list: [],
  },
  done: {
    title: "Done",
    id: "done",
    list: [],
  },
};

// const socket = io.connect("http://localhost:4000");
const socket = io.connect(process.env.REACT_APP_SOCKET_URL);

const ProjectView = () => {
  const navigate = useNavigate();

  let location = useLocation();

  // Parse the search string to get parameters
  const searchParams = new URLSearchParams(location.search);

  // Get specific parameter values
  const _id = searchParams.get("id");

  const [columns, setColumns] = useState(initialColumns);

  const [draggingCounter, setDraggingCounter] = useState(0);

  const [projectBody, setProjectBody] = useState({
    _id: _id,
    creater: "",
    title: "",
    workers: [],
    tasks: {
      todo: [],
      inprogress: [],
      done: [],
    },
  });

  useEffect(() => {
    const apiCall = projectService.getById(_id);
    apiCall.then((response) => {
      if (response.status == "200") {
        if (response.data) {
          const projectsResponse = response.data;
          setProjectBody((prevProjectBody) => ({
            ...prevProjectBody,
            creater: projectsResponse.creater,
            title: projectsResponse.title,
            workers: projectsResponse.workers,
            tasks: projectsResponse.tasks,
          }));
          setColumns({
            todo: {
              title: "Todo",
              id: "todo",
              list: projectsResponse.tasks.todo,
            },
            doing: {
              title: "Inprogress",
              id: "doing",
              list: projectsResponse.tasks.inprogress,
            },
            done: {
              title: "Done",
              id: "done",
              list: projectsResponse.tasks.done,
            },
          });
        }
      }
    });
  }, []);

  useEffect(() => {
    setProjectBody((prevProjectBody) => ({
      ...prevProjectBody,
      tasks: {
        todo: columns.todo.list,
        inprogress: columns.doing.list,
        done: columns.done.list,
      },
    }));
    // }, [columns]);
  }, [draggingCounter]);

  useEffect(() => {
    joinProject();
  }, [projectBody._id]);

  useEffect(() => {
    if (projectBody.creater != "") {
      sendProject();
    }
  }, [projectBody]);

  const joinProject = () => {
    if (projectBody._id) {
      socket.emit("join_project", projectBody._id);
    }
  };

  const sendProject = async () => {
    await socket.emit("send_project", projectBody);
  };

  useEffect(() => {
    socket.on("receive_project", (data) => {
      if (
        data.tasks.todo != columns.todo.list ||
        data.tasks.inprogress != columns.inprogress.list ||
        data.tasks.done != columns.done.list
      ) {
        setColumns({
          todo: {
            title: "Todo",
            id: "todo",
            list: data.tasks.todo,
          },
          doing: {
            title: "Inprogress",
            id: "doing",
            list: data.tasks.inprogress,
          },
          done: {
            title: "Done",
            id: "done",
            list: data.tasks.done,
          },
        });
      }
    });
  }, [socket]);

  const onDragEnd = ({ source, destination }) => {
    // Make sure we have a valid destination
    if (destination === undefined || destination === null) return null;

    // Make sure we're actually moving the item
    if (
      source.droppableId === destination.droppableId &&
      destination.index === source.index
    )
      return null;

    // Set start and end variables
    const start = columns[source.droppableId];
    const end = columns[destination.droppableId];

    // If start is the same as end, we're in the same column
    if (start === end) {
      // Move the item within the list
      // Start by making a new list without the dragged item
      const newList = start.list.filter((_, idx) => idx !== source.index);

      // Then insert the item at the right location
      newList.splice(destination.index, 0, start.list[source.index]);

      // Then create a new copy of the column object
      const newCol = {
        title: start.title,
        id: start.id,
        list: newList,
      };

      // Update the state
      setColumns((state) => ({ ...state, [newCol.id]: newCol }));
      setDraggingCounter(draggingCounter + 1);
      return null;
    } else {
      // If start is different from end, we need to update multiple columns
      // Filter the start list like before
      const newStartList = start.list.filter((_, idx) => idx !== source.index);

      // Create a new start column
      const newStartCol = {
        title: start.title,
        id: start.id,
        list: newStartList,
      };

      // Make a new end list array
      const newEndList = end.list;

      // Insert the item into the end list
      newEndList.splice(destination.index, 0, start.list[source.index]);

      // Create a new end column
      const newEndCol = {
        title: end.title,
        id: end.id,
        list: newEndList,
      };

      // Update the state
      setColumns((state) => ({
        ...state,
        [newStartCol.id]: newStartCol,
        [newEndCol.id]: newEndCol,
      }));
      setDraggingCounter(draggingCounter + 1);
      return null;
    }
  };
  return (
    <div className="container">
      <div className="horizontal-section">
        <div className="loginform">
          <h1>Project Overview</h1>
          <div>Project Title: {projectBody?.title}</div>
          <br></br>
          <div>Project Creator: {projectBody?.creater}</div>
          <br></br>
          <div>Project Workers:</div>
          <CustomTable
            columnNames={COLUMN_NAMES}
            data={projectBody?.workers.map((item) => [item])}
            emptyMessage={"You don't have any workers"}
            enableActions={false}
          />
          <CustomButton
            text={"Back"}
            onClick={() => navigate("/current-projects")}
          />
        </div>
      </div>
      <div className="horizontal-section">
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="dnd-container">
            {Object.values(columns).map((col) => (
              <Column col={col} key={col.id} />
            ))}
          </div>
        </DragDropContext>
      </div>
    </div>
  );
};

export default ProjectView;
