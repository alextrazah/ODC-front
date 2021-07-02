import React, { Component, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";
const Login = () => {
  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  const history = useHistory();

  const go = async () => {
    try {
      const userPosts = await axios.get(
        "http://localhost:3000/users/test?username=" +
          email +
          "&password=" +
          password
      );

      console.log(userPosts.data[0].Role);
      if (userPosts.data[0].Role === "Admin") {
        localStorage.setItem("id", userPosts.data[0].id);
        localStorage.setItem("username", userPosts.data[0].Firstname);
        localStorage.setItem("lastname", userPosts.data[0].Lastname);
        localStorage.setItem("mail", userPosts.data[0].Email);
        localStorage.setItem("pass", userPosts.data[0].Password);
        localStorage.setItem("role", userPosts.data[0].Role);
        console.log("admin");
        history.push("/dash");
      }
      if (userPosts.data[0].Role === "DRE") {
        localStorage.setItem("id", userPosts.data[0].id);
        localStorage.setItem("username", userPosts.data[0].Firstname);
        localStorage.setItem("lastname", userPosts.data[0].Lastname);
        localStorage.setItem("mail", userPosts.data[0].Email);
        localStorage.setItem("pass", userPosts.data[0].Password);
        localStorage.setItem("role", userPosts.data[0].Role);
        console.log("DRE");
        history.push("/usedash");
      } else if (userPosts.data[0].Role === "DSI") {
        localStorage.setItem("id", userPosts.data[0].id);

        localStorage.setItem("username", userPosts.data[0].Firstname);
        localStorage.setItem("lastname", userPosts.data[0].Lastname);
        localStorage.setItem("mail", userPosts.data[0].Email);
        localStorage.setItem("pass", userPosts.data[0].Password);
        localStorage.setItem("role", userPosts.data[0].Role);
        history.push("/usedash");
        console.log("DSI");
      } else if (userPosts.data[0].Role === "DRS") {
        localStorage.setItem("id", userPosts.data[0].id);

        localStorage.setItem("username", userPosts.data[0].Firstname);
        localStorage.setItem("lastname", userPosts.data[0].Lastname);
        localStorage.setItem("mail", userPosts.data[0].Email);
        localStorage.setItem("pass", userPosts.data[0].Password);
        localStorage.setItem("role", userPosts.data[0].Role);
        console.log("DRS");
        history.push("/usedash");
      } else alert("wrong pass/email");
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <div>
      <h3>Log in</h3>

      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter email"
          onChange={(event) => setemail(event.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          onChange={(event) => setpassword(event.target.value)}
          className="form-control"
          placeholder="Enter password"
        />
      </div>

      <div className="form-group">
        <div className="custom-control custom-checkbox">
          <input
            type="checkbox"
            className="custom-control-input"
            id="customCheck1"
          />
          <label className="custom-control-label" htmlFor="customCheck1">
            Remember me
          </label>
        </div>
      </div>

      <button
        onClick={() => {
          go();
        }}
        className="btn btn-dark btn-lg btn-block"
      >
        Sign in
      </button>
      <p className="forgot-password text-right">
        Forgot <a href="#">password?</a>
      </p>
    </div>
  );
};
export default Login;
