import React, { useContext, useEffect, useState } from "react";
import CustomButton from "../../Components/CustomButton/CustomButton";
import CustomTable from "../../Components/CustomTable/CustomTable";
import CurrentProjectImg from "../../assets/currentProject.png";
import projectService from "../../api/services/projectService";
import { useNavigate } from "react-router-dom/dist";
import { Filecontext } from "../../Filecontext";

const COLUMN_NAMES = ["Project ID", "Title"];

function CurrentProjects() {
  const navigate = useNavigate();

  const { userEmail } = useContext(Filecontext)

  const [onGoingProjects, setOnGoingProjects] = useState();

  useEffect(() => {
    const apiCall = projectService.viewByEmail(userEmail);
    apiCall.then((response) => {
      if (response.status == "200") {
        if (response.data?.length > 0) {
          const projectsResponse = response.data;
          const projetsList = projectsResponse.map((item) => [
            item._id,
            item.title,
          ]);
          setOnGoingProjects(projetsList);
        }
      }
    });
  }, [userEmail]);

  return (
    <div className="container">
      <div className="horizontal-section">
        <img className="background-img" src={CurrentProjectImg} alt="Login" />
      </div>
      <div className="horizontal-section">
        <div className="loginform">
          <h1>Current Projects</h1>
          <CustomButton
            text={"Create a new project"}
            onClick={() => navigate("/create-new-project")}
          />
          <CustomTable
            columnNames={COLUMN_NAMES}
            data={onGoingProjects}
            emptyMessage={"You don't have any ongoing projects"}
          />
        </div>
      </div>
    </div>
  );
}

export default CurrentProjects;
