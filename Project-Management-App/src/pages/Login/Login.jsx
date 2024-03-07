import React, { useContext, useState } from "react";
import "./Login.css";
import LoginImage from "../../assets/login.png";
import { Link, useNavigate } from "react-router-dom";
import CustomTextField from "../../Components/CustomTextField/CustomTextField";
import CustomButton from "../../Components/CustomButton/CustomButton";
import userService from "../../api/services/userService";
import { Filecontext } from "../../Filecontext";

function Login() {

  const navigate = useNavigate();
  const { setUserEmail } = useContext(Filecontext)

  const [loginCredentials, setLoginCredentials] = useState({
    email: "",
    password: "",
  });

  const onLogin = () => {
    const apiCall = userService.login(loginCredentials);
    apiCall.then((response) => {
      if (response) {
        if (response.status == "200") {
          setUserEmail(response.data.user)
          // console.log(response.data)
          navigate('/current-projects')
        }
      }
    });
  };

  return (
    <div className="container">
      <div className="horizontal-section">
        <img className="background-img" src={LoginImage} alt="Login" />
      </div>
      <div className="horizontal-section">
        <div className="loginform">
          <h1>Login</h1>
          <CustomTextField
            type={"text"}
            placeholder={"Email"}
            onTextChange={(text) =>
              setLoginCredentials({ ...loginCredentials, email: text })
            }
          />
          <CustomTextField
            type={"password"}
            placeholder={"Password"}
            onTextChange={(text) =>
              setLoginCredentials({ ...loginCredentials, password: text })
            }
          />
          <CustomButton text={"Submit"} onClick={onLogin} />
          <p>
            Don't you have an account?{" "}
            <Link className="link" to="/signup">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
