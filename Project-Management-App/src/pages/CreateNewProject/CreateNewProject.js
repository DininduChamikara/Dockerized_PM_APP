import React, { useContext, useState } from "react";
import CustomButton from "../../Components/CustomButton/CustomButton";
import CustomTable from "../../Components/CustomTable/CustomTable";
import CustomTextField from "../../Components/CustomTextField/CustomTextField";
import AddNewItem from "../../Components/modals/AddNewItem";
import CreateProjectImg from "../../assets/create_project.png";
import projectService from "../../api/services/projectService";
import { Filecontext } from "../../Filecontext";
import { useNavigate } from "react-router-dom";

const COLUMN_NAMES = ["Worker's Email"];
const COLUMN_NAMES2 = ["Task"];

const CreateNewProject = () => {

  const navigate = useNavigate();

  const { userEmail } = useContext(Filecontext)

  const [addWorkerModalIsOpen, setAddWorkerModalIsOpen] = useState(false);
  const [addTaskModalIsOpen, setAddTaskModalIsOpen] = useState(false);

  const [addedWorkers, setAddedWorkers] = useState([[userEmail]]);
  const [addedTasks, setAddedTasks] = useState([]);

  const [title, setTitle] = useState("");

  function openAddWorkerModal() {
    setAddWorkerModalIsOpen(true);
  }

  function openAddNewTaskModal() {
    setAddTaskModalIsOpen(true);
  }

  const addNewWorker = (email) => {
    setAddedWorkers((prevWorkersEmails) => [...prevWorkersEmails, [email]]);
  };

  const addNewTask = (task) => {
    setAddedTasks((prevTasks) => [...prevTasks, [task]]);
  };

  const handleOnCreateProjet = () => {
    const projectBody = {
      creater: userEmail,
      title: title,
      workers: addedWorkers.map(([item]) => item),
      tasks: {
        todo: addedTasks.map(([item]) => item),
        inprogress: [],
        done: [],
      },
    };

    const apiCall = projectService.create(projectBody);
    apiCall.then((response) => {
      if (response) {
        if (response.status == "200") {
          navigate('/current-projects')
        }
      }
    });
  };

  return (
    <div className="container">
      <div className="horizontal-section">
        <img className="background-img" src={CreateProjectImg} alt="Login" />
      </div>
      <div className="horizontal-section">
        <div className="loginform">
          <h1>Create New Project</h1>
          <CustomTextField
            type={"text"}
            placeholder={"Project Title"}
            onTextChange={(text) => setTitle(text)}
          />
          <div className="container">
            <div className="horizontal-section">
              <div>
                <CustomButton
                  text={"Add new worker"}
                  onClick={openAddWorkerModal}
                />
                <CustomTable
                  columnNames={COLUMN_NAMES}
                  data={addedWorkers}
                  emptyMessage={"You didn't add any worker"}
                  enableActions={false}
                />
              </div>
            </div>
            <div className="horizontal-section">
              <div>
                <CustomButton
                  text={"Add new task"}
                  onClick={openAddNewTaskModal}
                />
                <CustomTable
                  columnNames={COLUMN_NAMES2}
                  data={addedTasks}
                  emptyMessage={"You didn't add any task"}
                  enableActions={false}
                />
              </div>
            </div>
          </div>
          <br></br>
          <br></br>
          <CustomButton
            text={"Create the project"}
            onClick={handleOnCreateProjet}
          />
        </div>
      </div>
      <AddNewItem
        modalIsOpen={addWorkerModalIsOpen}
        setIsOpen={setAddWorkerModalIsOpen}
        addNewWorker={addNewWorker}
        inputType={"email"}
        btnText={"Add Worker"}
        placeholderText={"Enter worker's email..."}
      />
      <AddNewItem
        modalIsOpen={addTaskModalIsOpen}
        setIsOpen={setAddTaskModalIsOpen}
        addNewWorker={addNewTask}
        inputType={"text"}
        btnText={"Add Task"}
        placeholderText={"Enter new task..."}
      />
    </div>
  );
};

export default CreateNewProject;
