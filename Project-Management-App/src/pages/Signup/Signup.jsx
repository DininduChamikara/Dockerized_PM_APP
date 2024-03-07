import React, { useState } from "react";
import SignUpImage from "../../assets/signup.jpg";
import CustomTextField from "../../Components/CustomTextField/CustomTextField";
import CustomButton from "../../Components/CustomButton/CustomButton";
import { Link, useNavigate } from "react-router-dom";
import userService from "../../api/services/userService";

function Signup() {
  const navigate = useNavigate();

  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });

  const onRegister = () => {
    const apiCall = userService.register(userCredentials);
    apiCall.then((response) => {
      if (response) {
        if (response.status == "200") {
          navigate("/");
        }
      }
    });
  };

  return (
    <div className="container">
      <div className="horizontal-section">
        <img className="background-img" src={SignUpImage} alt="Login" />
      </div>
      <div className="horizontal-section">
        <div className="loginform">
          <h1>Sign Up</h1>
          <CustomTextField
            type={"text"}
            placeholder={"Email"}
            onTextChange={(text) =>
              setUserCredentials({ ...userCredentials, email: text })
            }
          />
          <CustomTextField
            type={"password"}
            placeholder={"Password"}
            onTextChange={(text) =>
              setUserCredentials({ ...userCredentials, password: text })
            }
          />
          <CustomButton text={"Register"} onClick={onRegister} />
          <p>
            Already have an account?{" "}
            <Link className="link" to="/">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
